<template>
  <div class="container">
    <div v-if="resultText && isResult" class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-mx-0 tw-max-w-full">
      {{ resultText }}
    </div>
    <div class="flex items-center search-container mb-10">
      <div class="tw-mb-5 search">
        <h4 class="text-xl mb-2 font-bold dark:text-white text-align:center">{{ $t('Search by keyword') }}</h4>
        <input v-model="searchString" :placeholder="$t('Enter keyword')" class="tw-w-full search-input" type="text" />
      </div>
    </div>
    <div class="filter-container">
      <!-- Checkbox/Radio Container -->
      <div class="checkbox-container">
        <template v-for="(filterField, index) in filterFields">
          <div v-if="['checkbox', 'radio'].includes(filterField.type)"
            :key="'checkbox-' + index" :class="{ 'tw-col-span-3': filterField.type === 'multiselect' }">
            <h4 class="tw-mb-3 filter-title">{{ filterField.title }}</h4>
            <ul class="tw-list-none tw-p-0 mb-7">
              <li v-for="(value, key) in filterField.values" :key="key" class="tw-flex tw-items-center">
                <input v-model="filterValues[filterField.field]" :value="key" type="checkbox" @change="search()">
                <span class="tw-ml-5">{{ value }}</span>
              </li>
            </ul>
          </div>
        </template>
      </div>

      <!-- Dropdown Container -->
      <div class="dropdown-container">
        <template v-for="(filterField, index) in filterFields">
          <div v-if="filterField.type === 'dropdown'" :key="'dropdown-' + index">
            <h4 class="tw-mb-3 filter-title">{{ filterField.title }}</h4>
            <select id="dropdown-filters" class="mb-7 bg-gray-50 border border-black-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="asfsaf" @change="search()">
              <option disabled selected>Choose a {{filterField.title}}</option>
              <option v-for="(value, key) in filterField.values" :key="key" :value="key"
                class="dropdown-option">
                {{ value }}
              </option>
            </select>
          </div>
        </template>
      </div>
    </div>
    <h1 class="text-4xl font-extrabold dark:text-white mb-8">Suggested Courses</h1>
    <div class="">
      <div v-if="loading" class="loader">{{ $t('Loading...') }}</div>
      <span v-if="meilisearchFail">
        {{
      $t('There is a problem with search engine. Try using default wordpress search at top of the page...')
    }}
      </span>
      <hits v-else :display-fields="displayFields" :hits="hits"></hits>
    </div>
    <div class="tw-flex tw-justify-between tw-mt-5">
      <select v-model="limit" class="tw-w-20-important">
        <option :value="3">3</option>
        <option :value="6">6</option>
        <option :value="12">12</option>
        <option :value="24">24</option>
        <option :value="48">48</option>
        <option :value="96">96</option>
      </select>
      <pagination :limit="limit" :nb-hits="nbHits" :offset="offset" @update-offset="updateOffset($event)"></pagination>
    </div>
  </div>
</template>

<script>

import VueSlider from 'vue-slider-component'; // NEW
import 'vue-slider-component/theme/antd.css'; // NEW
import DatePicker from "./components/DatePicker.vue"
import Pagination from "./components/Pagination.vue"
import Hits from "./components/Hits.vue";
import "./components/App.css";

import debounce from "lodash/debounce"
import {MeiliSearch} from 'meilisearch'
import FormDataApi from "../FormDataApi";


export default {
  data() {
    return {
      loading: false,
      searchClient: null,
      meilisearchUrl: null,
      meilisearchKey: null,
      resultText: null,
      isResult: false,
      meilisearchIndexKey: null,
      searchString: null,
      fees: null,
      displayFields: [],
      filterFields: [],
      filterValues: {},
      limit: 12,
      offset: 0,
      nbHits: 0,
      hits: [],
      meilisearchFail: false,
    };
  },
  components: {
    Hits,
    VueSlider,
    DatePicker,
    Pagination,
  },
  watch: {
    searchString() {
      this.querySearch();
    },
    limit() {
      this.search();
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    querySearch: debounce(function () {
      this.search();
    }, 500),
    loadData() {
      let formData = new FormData();
      formData.append("action", "get_meilisearch_key");
      let setSearchClient = FormDataApi.post(ajaxurl, formData).then(response => {
        this.meilisearchUrl = response.data.url;
        this.meilisearchKey = response.data.key;
        this.meilisearchIndexKey = response.data.index_key;
        this.resultText = response.data.result_text;

        this.searchClient = new MeiliSearch({
          host: this.meilisearchUrl,
          apiKey: this.meilisearchKey
        })
      })
      formData = new FormData();
      formData.append("action", "get_display_fields");
	  FormDataApi.post(ajaxurl, formData).then(response => {
        this.displayFields = response.data;
      })
      formData = new FormData();
      formData.append("action", "get_xml_fields");
      let xmlFieldsPromise = FormDataApi.post(ajaxurl, formData).then(response => {
        for (let field of response.data) {
          if (!field.filter) {
            continue;
          }
          if (field.filter === 'disabled') {
            continue;
          }
          let filter = {
            type: field.filter,
            field: field.slug,
            title: field.title,
            search_key: field.search_key,
          }

          if (field.filter === 'slider') {
            filter.max = field.max;
            filter.min = field.min;

            if (filter.max === filter.min) {
              continue;
            }
            this.$set(this.filterValues, field.slug, [field.min, field.max])

          }
          if (['checkbox', 'dropdown', 'multiselect'].includes(field.filter)) {
            filter.values = field.values;
            this.$set(this.filterValues, field.slug, [])
          }
          this.filterFields.push(filter)
        }
      })


      Promise.all([xmlFieldsPromise, setSearchClient]).then(() => {
        this.search();
      });
    },
    search() {
      if (!this.searchClient) {
        return;
      }
      this.loading = true;
      let filters = this.getFilters();
      let searchParams = {};
      if (filters.length) {
        searchParams.filter = filters.join(' AND ');
      }
      searchParams.limit = Number(this.limit);
      searchParams.offset = this.offset;

      try {
        const apiUrl = `${this.meilisearchUrl}/indexes/${this.meilisearchIndexKey}/search`;
        const apiKey = this.meilisearchKey;

        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            q: this.searchString,
            ...searchParams,
          }),
        };

        fetch(apiUrl, requestOptions)
          .then(response => response.json())
          .then(data => {
            this.hits = data.hits;
            this.nbHits = data.nbHits;
          })
          .finally(() => {
            this.loading = false;
          });
      } catch (e) {
        this.meilisearchFail = true;
      }
    },


    setDimensionsFilter(filters) {
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      this.isResult = false;

      if (params.dimensions) {
        this.isResult = true;
        let facet = " (";
        let index = 1;
        for (const dimension of params.dimensions.split(',')) {

          if (index !== 1) {
            facet += " OR ";
          }
          facet += "loc_subset_items = " + dimension;
          index++;
        }

        facet += ") ";
        filters.push(facet);
      }
      return filters
    },
    getFilters() {
      let filters = [];
      filters = this.setDimensionsFilter(filters)

      for (let filterField of this.filterFields) {
        if (!this.filterValues[filterField.field]) {
          continue;
        }
        const value = this.filterValues[filterField.field];
        const slug = filterField.field;
        if (filterField.type === 'slider') {
          if (value[0] == filterField.min && value[1] == filterField.max) {
            continue;
          }
          filters.push(" ((" + slug + " >= " + value[0] + " AND " + slug + " <= " + value[1] + ") OR " + slug + " = '') ")
        }
        if (filterField.type === 'date') {
          if (!value[0] && value[1] == filterField.max) {
            continue;
          }
          filters.push(" ((" + slug + " >= " + value[0] + " AND " + slug + " <= " + value[1] + ") OR " + slug + " = '') ")
        }
        if (['checkbox'].includes(filterField.type)) {
          if (!value.length) {
            continue;
          }
          let facet = " (";

          let index = 1;
          for (const valueItem of value) {

            if (index !== 1) {
              facet += " OR ";
            }
            facet += slug + " = " + "'" + valueItem + "'";

            index++;
          }
          facet += ") ";
          filters.push(facet);
        }
        if (['multiselect'].includes(filterField.type)) {
          if (!value.length) {
            continue;
          }
          let facet = " (";

          let index = 1;
          for (const valueItem of value) {

            if (index !== 1) {
              facet += " OR ";
            }
            facet += filterField.search_key + " = " + "'" + valueItem.id + "'";

            index++;
          }
          facet += ") ";
          filters.push(facet);
        }
        if (['dropdown'].includes(filterField.type)) {
          if (!value.length) {
            continue;
          }
          let facet = " (";
          facet += slug + " = " + "'" + value + "'";

          facet += ") ";
          filters.push(facet);
        }
      }
      return filters;
    },
    getFacets() {
      let facets = [];
      for (let filterField of this.filterFields) {
        if (!this.filterValues[filterField.field]) {
          continue;
        }
        const values = this.filterValues[filterField.field];
        const slug = filterField.field;
        if (filterField.type === 'checkbox') {
          let facetItems = [];
          for (let value of values) {
            if (value) {
              facetItems.push(slug + ":" + value)
            }
          }
          if (facetItems.length) {

            facets.push(facetItems)
          }
        }
      }
      return facets;
    },
    filterDate(dates, slug) {
      if (!dates) {
        this.filterValues[slug] = null;
        this.search();
        return;
      }

      this.filterValues[slug] = [dates.start.getTime() / 1000, dates.end.getTime() / 1000]

      this.search();
    },
    updateOffset(offset) {
      this.offset = offset;
      this.search();
    }
  },
};

</script>

<style>

@import 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css';

.entry-content> :not(.alignwide):not(.alignfull):not(.alignleft):not(.alignright):not(.wp-block-separator):not(.woocommerce) {
  max-width: 1280px !important;
}

.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}

.loader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}

@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>

<template>
  <div class="container">
    <div class="tw-mx-5">


      <div class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-mx-0 tw-max-w-full">

		  <div class="tw-mb-5 tw-w-full">
			  <h4 class="tw-mb-3">{{ $t('Search') }}</h4>
			  <input v-model="searchString" :placeholder="$t('Enter text')" type="text" class="tw-w-full"/>
		  </div>
	  </div>
      <div class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-mx-0 tw-max-w-full">

        <div v-for="(filterField, index) in filterFields" class="tw-mb-5 tw-mr-0 sm:tw-mr-5" :key="index">
          <h4 class="tw-mb-3">{{ filterField.title }}</h4>
          <date-picker v-if="filterField.type === 'date'" @input="filterDate($event, filterField.field)"></date-picker>

          <vue-slider
              v-else-if="filterField.type === 'slider'"
              :min="filterField.min"
              :max="filterField.max"
              :lazy="true"
              v-model="filterValues[filterField.field]"
              @change="search()"

          ></vue-slider>
          <select
              v-else-if="filterField.type === 'dropdown'"
			  class="tw-max-w-full"
              v-model="filterValues[filterField.field]"
              @change="search()"
          >
			  <option :value="key" v-for="(value, key) in filterField.values" :key="key">
				  {{ value }}
			  </option>
		  </select>

          <ul v-else class="tw-list-none tw-p-0">

            <li class="tw-flex tw-items-center" v-for="(value, key) in filterField.values" :key="key">
              <input type="checkbox"
                     v-model="filterValues[filterField.field]" @change="search()" :value="key">
              <span class="tw-ml-5">{{ value }}</span>
            </li>
          </ul>


        </div>
      </div>
      <div class="">
        <div v-if="loading" class="loader">{{ $t('Loading...') }}</div>
        <span v-if="meilisearchFail">
                {{
            $t('There is a problem with search engine. Try using default wordpress search at top of the page...')
          }}
              </span>
        <hits v-else :hits="hits"></hits>
      </div>
      <div class="tw-flex tw-justify-between tw-mt-5">
		  <select class="tw-w-20-important" v-model="limit">
			  <option :value="3">3</option>
			  <option :value="6">6</option>
			  <option :value="12">12</option>
			  <option :value="24">24</option>
			  <option :value="48">48</option>
			  <option :value="96">96</option>
		  </select>
        <pagination :limit="limit" :offset="offset" :nb-hits="nbHits"
                    @update-offset="updateOffset($event)"></pagination>
      </div>


    </div>


  </div>
</template>

<script>
import Api from "../Api";

import VueSlider from 'vue-slider-component'; // NEW
import 'vue-slider-component/theme/antd.css'; // NEW
import DatePicker from "./components/DatePicker.vue"
import Pagination from "./components/Pagination.vue"
import Hits from "./components/Hits.vue";

import debounce from "lodash/debounce"
import {MeiliSearch} from 'meilisearch'


export default {
  data() {
    return {
      loading: false,
      searchClient: null,
      meilisearchUrl: null,
      meilisearchKey: null,
		meilisearchIndexKey: null,
      searchString: null,
      fees: null,
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
    Pagination
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
      let setSearchClient = Api.post(ajaxurl, formData).then(response => {
        this.meilisearchUrl = response.data.url;
        this.meilisearchKey = response.data.key;
        this.meilisearchIndexKey = response.data.index_key;

        this.searchClient = new MeiliSearch({
          host: this.meilisearchUrl,
          apiKey: this.meilisearchKey
        })
      })
      formData = new FormData();
      formData.append("action", "get_xml_fields");
      let xmlFieldsPromise = Api.post(ajaxurl, formData).then(response => {
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
            title: field.title
          }

          if (field.filter === 'slider') {
            filter.max = field.max;
            filter.min = field.min;

            if (filter.max === filter.min) {
              continue;
            }
            this.$set(this.filterValues, field.slug, [field.min, field.max])

          }
          if (['checkbox', 'dropdown'].includes(field.filter)) {
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
      // let facets = this.getFacets();
      let searchParams = {}
      if (filters.length) {
        searchParams.filter = filters.join(' AND ')
      }
      // if (facets.length) {
      //   searchParams.filterableAttributes = facets
      // }
      searchParams.limit = this.limit
      searchParams.offset = this.offset
      try {

        this.searchClient.index(this.meilisearchIndexKey).search(this.searchString, searchParams).then(response => {

        this.hits = response.hits;
        this.nbHits = response.nbHits;
		})

      } catch (e) {
        this.meilisearchFail = true;
      }

      this.loading = false;
    },

    getFilters() {
      let filters = [];
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
					facet +=  " OR ";
				}
				facet += slug + " = " + "'" + valueItem + "'";

				index++;
			}
			facet += ") ";
			filters.push(facet);
        }
        if (['dropdown'].includes(filterField.type)) {
          if (!value) {
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

.entry-content > :not(.alignwide):not(.alignfull):not(.alignleft):not(.alignright):not(.wp-block-separator):not(.woocommerce) {
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

.tw-w-20-important {
	width: 5rem !important;
}

</style>

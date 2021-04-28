<template>
  <div class="container">
    <div class="grid grid-cols-4 gap-10">

      <div class="col-span-1">
      </div>
      <div class="col-span-3 flex justify-between">
        <div>
          <select v-model="limit">
            <option :value="3">3</option>
            <option :value="6">6</option>
            <option :value="12">12</option>
            <option :value="24">24</option>
            <option :value="48">48</option>
            <option :value="96">96</option>
          </select>
        </div>
        <input v-model="searchString" placeholder="Search..." type="text"></input>
      </div>
      <div class="col-span-1">

        <div v-for="(filterField, index) in filterFields" class=" mb-5" :key="index">
          <h4 class="mb-3">{{ filterField.title }}</h4>
          <date-picker v-if="filterField.type === 'date'" @input="filterDate($event, filterField.field)"></date-picker>

          <vue-slider
              v-else-if="filterField.type === 'slider'"
              :min="filterField.min"
              :max="filterField.max"
              :lazy="true"
              v-model="filterValues[filterField.field]"
              @change="search()"

          ></vue-slider>

          <ul v-else class="list-none p-0">

            <li class="flex items-center" v-for="value in filterField.values" :key="value">
              <input type="checkbox"
                     v-model="filterValues[filterField.field]" @change="search()" :value="value">
              <span class="ml-5">{{ value }}</span>
            </li>
          </ul>

        </div>
      </div>
      <div class="col-span-3">
        <div v-if="loading" class="loader">Loading...</div>
        <hits v-else :hits="hits"></hits>
      </div>
      <div class="col-span-4">
        <pagination :limit="limit" :offset="offset" :nb-hits="nbHits"
                    @update-offset="updateOffset($event)"></pagination>
      </div>
    </div>


  </div>
</template>

<script>
import Api from "../../Common/js/Api.js";

import VueSlider from 'vue-slider-component'; // NEW
import 'vue-slider-component/theme/antd.css'; // NEW
import DatePicker from "./components/DatePicker"
import Pagination from "./components/Pagination"

import {MeiliSearch} from 'meilisearch'
import Hits from "./components/Hits";
import debounce from "lodash/debounce"


export default {
  data() {
    return {
      loading: false,
      searchClient: null,
      meilisearchUrl: null,
      meilisearchKey: null,
      searchString: null,
      fees: null,
      filterFields: [],
      filterValues: {},
      limit: 12,
      offset: 0,
      nbHits: 0,
      hits: []
    };
  },
  components: {
    Hits,
    VueSlider,
    DatePicker,
    Pagination
  },
  watch: {
    async searchString() {
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
    querySearch: debounce(async function () {
      await this.search();
    }, 500),
    loadData() {
      let formData = new FormData();
      formData.append("action", "get_meilisearch_key");
      Api.post(ajaxurl, formData).then(response => {
        this.meilisearchUrl = response.data.url;
        this.meilisearchKey = response.data.key;

        this.searchClient = new MeiliSearch({
          host: this.meilisearchUrl,
          apiKey: this.meilisearchKey
        })
      })
      formData = new FormData();
      formData.append("action", "get_xml_fields");
      Api.post(ajaxurl, formData).then(response => {
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
            this.$set(this.filterValues, field.slug, [field.min, field.max])

          }
          if (field.filter === 'checkbox') {
            filter.values = field.values;
            this.$set(this.filterValues, field.slug, [])
          }
          this.filterFields.push(filter)
        }
        this.search();
      })
    },
    async search() {
      this.loading = true;
      let filters = this.getFilters();
      let facets = this.getFacets();
      let searchParams = {}
      if (filters.length) {
        searchParams.filters = filters.join(' AND ')
      }
      if (facets.length) {
        searchParams.facetFilters = facets
      }
      searchParams.limit = this.limit
      searchParams.offset = this.offset
      let search = await this.searchClient.index('loc_catalogue_item').search(this.searchString, searchParams)
      this.hits = search.hits;

      this.nbHits = search.nbHits;

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


</style>

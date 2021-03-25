<template>
  <div class="container">
    <ais-instant-search
        :search-client="searchClient"
        index-name="loc_catalogue_item"
    >
      <div class="search-panel__filters">
        <ais-clear-refinements>
          <span slot="resetLabel">Clear all filters</span>
        </ais-clear-refinements>

        <div v-for="(filterField, index) in filterFields" :key="index">
          <h3>{{ filterField.title }}</h3>
          <date-picker v-if="filterField.type === 'date'" @input="filterRecords()"></date-picker>

          <ais-range-input v-else-if="filterField.type === 'numeric'" :attribute="filterField.field">
            <div slot-scope="{ currentRefinement, range, refine }">
              <vue-slider
                  :min="range.min"
                  :max="range.max"
                  :lazy="true"
                  :value="toValue(currentRefinement, range)"
                  @change="refine({ min: $event[0], max: $event[1] })"
              />
            </div>
          </ais-range-input>
          <ais-refinement-list v-else :attribute="filterField.field"></ais-refinement-list>
        </div>
      </div>

      <div class="search-panel__results">
        <ais-search-box submit-title="Submit the query"></ais-search-box>
        <ais-hits>
          <template slot="item" slot-scope="{ item }">
            <div>
              <div class="hit-name">
                <a :href="item.guid">
                  <ais-highlight :hit="item" attribute="post_title"></ais-highlight>
                </a>
              </div>
              <!--                <img :src="item.image" align="left" :alt="item.image"/>-->
              <div class="hit-description">
                <ais-snippet :hit="item" attribute="post_content"></ais-snippet>
              </div>
              <div class="hit-info">type: {{ item.type }}</div>
              <div class="hit-info">start date: {{ item.start_date }}</div>
            </div>
          </template>
        </ais-hits>

        <ais-configure
            :attributesToSnippet="['description:50']"
            snippetEllipsisText="…"
        ></ais-configure>
        <ais-pagination></ais-pagination>
      </div>
    </ais-instant-search>
  </div>
</template>

<script>
import "instantsearch.css/themes/algolia-min.css";
import {instantMeiliSearch} from "@meilisearch/instant-meilisearch";
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css'
import DatePicker from "./components/DatePicker"

export default {
  data() {
    return {
      searchClient: instantMeiliSearch(
          "http://127.0.0.1:7700",
          "dc3fedaf922de8937fdea01f0a7d59557f1fd31832cb8440ce94231cfdde7f25"
      ),
      filterFields: [
        {
          type: 'checkbox',
          field: 'type',
          title: 'Type'
        },
        {
          type: 'checkbox',
          field: 'language',
          title: 'Language'
        },
        {
          type: 'date',
          field: 'start_date',
          title: 'Start date'
        },
        {
          type: 'date',
          field: 'end_date',
          title: 'End date'
        },
        {
          type: 'numeric',
          field: 'fees',
          title: 'Fees'
        },
        {
          type: 'numeric',
          field: 'duration',
          title: 'Duration'
        },
      ]
    };
  },
  components: {
    VueSlider,
    DatePicker
  },
  methods: {
    toValue(value, range) {
      return [
        value.min !== null ? value.min : range.min,
        value.max !== null ? value.max : range.max,
      ];
    },
  },
};
</script>

<style>

.entry-content > :not(.alignwide):not(.alignfull):not(.alignleft):not(.alignright):not(.wp-block-separator):not(.woocommerce) {
  max-width: 1280px !important;
}

.ais-Hits-item {
  margin-bottom: 1em;
  width: calc(50% - 1rem);
}

.ais-Hits-item img {
  margin-right: 1em;
  width: 100%;
  height: 100%;
  margin-bottom: 0.5em;
}

.ais-Highlight-highlighted {
  background: cyan;
  font-style: normal;
}

.disclaimer {
  margin-left: 1em;
}

.hit-name {
  margin-bottom: 0.5em;
}

.hit-info {
  font-size: 90%;
}

.header {
  display: flex;
  align-items: center;
  min-height: 50px;
  padding: 0.5rem 1rem;
  background-image: linear-gradient(to right, #4dba87, #2f9088);
  color: #fff;
  margin-bottom: 1rem;
}

.header-title {
  font-size: 1.2rem;
  font-weight: normal;
}

.hit-description {
  font-size: 90%;
  margin-bottom: 0.5em;
  color: grey;
}

.header-title::after {
  content: " ▸ ";
  padding: 0 0.5rem;
}

.header-subtitle {
  font-size: 1.2rem;
}

.container {
  padding: 1rem;
}

.ais-InstantSearch {
  margin: 0;
}

.search-panel__filters {
  float: left;
  width: 250px;
}

.search-panel__results {
  margin-left: 260px;
}

.ais-SearchBox {
  margin-bottom: 2rem;
}

.ais-Pagination {
  margin: 2rem auto;
  text-align: center;
}
</style>

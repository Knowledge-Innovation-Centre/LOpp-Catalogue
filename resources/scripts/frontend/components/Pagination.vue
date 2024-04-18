<template>
  <div class="tw-px-4 tw-py-3 tw-flex tw-items-center tw-justify-between tw-border-t sm:tw-px-6">
    <div class="tw-flex-1 tw-flex tw-justify-between sm:tw-hidden">
      <a class="tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-border tw-border-solid tw-text-sm tw-font-medium"
         href="#">
        {{ $t('Previous') }}
      </a>
      <a class="tw-ml-3 tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-border tw-border-solid tw-text-sm tw-font-medium"
         href="#">
        {{ $t('Next') }}
      </a>
    </div>
    <div class="tw-hidden sm:tw-flex-1 sm:tw-flex sm:tw-items-center sm:tw-justify-between">
      <div>
        <p class="tw-text-sm tw-mr-5">
          {{ $t('Showing') }}
          <span class="tw-font-medium">{{ offset + 1 }}</span>
          {{ $t('to') }}
          <span class="tw-font-medium">{{ to }}</span>
          {{ $t('of') }}
          <span class="tw-font-medium">{{ nbHits }}</span>
          {{ $t('results') }}

        </p>
      </div>
      <div>
        <nav aria-label="Pagination" class="tw-relative z-0 tw-inline-flex tw-shadow-sm tw--space-x-px">
          <button v-if="nbHits > (limit * 3)"
                  :disabled="showingFirstPage"
                  class="tw-relative tw-inline-flex tw-items-center tw-px-2 tw-py-2 tw-border tw-border-solid tw-text-sm tw-font-medium"
                  @click="updateOffset(currentPage-1)">
            <span class="tw-sr-only">Previous</span>
            <!-- Heroicon name: solid/chevron-left -->
            <svg aria-hidden="true" class="tw-h-5 tw-w-5" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    fill-rule="evenodd"/>
            </svg>
          </button>

          <button
              v-if="hasSecondPreviousPage"
              class="tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-border tw-border-solid tw-text-sm tw-font-medium"
              @click="updateOffset(currentPage-2)">
            {{ currentPage - 2 }}
          </button>
          <button
              v-if="hasPreviousPage"
              class="tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-border tw-border-solid tw-text-sm tw-font-medium"
              @click="updateOffset(currentPage-1)">
            {{ currentPage - 1 }}
          </button>
          <button
              class="current-page-button tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-border tw-border-solid tw-text-sm tw-font-medium">
            {{ currentPage }}
          </button>
          <button
              v-if="hasNextPage"
              class="tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-border tw-border-solid tw-text-sm tw-font-medium"
              @click="updateOffset(currentPage+1)">
            {{ currentPage + 1 }}
          </button>
          <button
              v-if="hasSecondNextPage"
              class="tw-relative tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-border tw-border-solid tw-text-sm tw-font-medium"
              @click="updateOffset(currentPage+2)">
            {{ currentPage + 2 }}
          </button>
          <button v-if="nbHits > (limit * 3)"
                  :disabled="showingLastPage"
                  class="tw-relative tw-inline-flex tw-items-center tw-px-2 tw-py-2 tw-border tw-border-solid tw-text-sm tw-font-medium"
                  @click="updateOffset(currentPage+1)">
            <span class="tw-sr-only">Next</span>
            <!-- Heroicon name: solid/chevron-right -->
            <svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    fill-rule="evenodd"/>
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Pagination",
  components: {},
  props: {
    limit: {
      type: Number,
      required: true
    },
    offset: {
      type: Number,
      required: true
    },
    nbHits: {
      type: Number,
      required: true
    },
  },
  computed: {
    to() {
      if (this.showingLastPage) {
        return this.nbHits
      }
      return this.limit + this.offset;
    },
    showingLastPage() {
      return this.nbHits < this.limit + this.offset;
    },
    showingFirstPage() {
      return this.offset === 0
    },
    currentPage() {
      let currentPage = Math.ceil(this.offset / this.limit) + 1;
      if (currentPage === 0) {
        return 1;
      }
      return currentPage
    },
    hasSecondPreviousPage() {
      return this.currentPage > 2 && this.showingLastPage;
    },
    hasPreviousPage() {
      return this.currentPage > 1;
    },
    hasNextPage() {
      return this.nbHits > this.limit * this.currentPage;
    },
    hasSecondNextPage() {
      return this.currentPage === 1 && this.nbHits > this.limit * (this.currentPage + 1);
    }
  },
  methods: {
    updateOffset(page) {
      let offset = ((page - 1) * this.limit);
      this.$emit('update-offset', offset)
    }
  }
}
</script>

<style scoped>

</style>

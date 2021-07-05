<template>
  <div class="px-4 py-3 flex items-center justify-between border-t border-gray-800 sm:px-6">
    <div class="flex-1 flex justify-between sm:hidden">
      <a href="#"
         class="relative inline-flex items-center px-4 py-2 border border-gray-800 text-sm font-medium text-gray-800 hover">
        {{ $t('Previous') }}
      </a>
      <a href="#"
         class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-800 text-sm font-medium text-gray-800 hover">
        {{ $t('Next') }}
      </a>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-800">
          {{ $t('Showing') }}
          <span class="font-medium">{{ offset + 1 }}</span>
          {{ $t('to') }}
          <span class="font-medium">{{ to }}</span>
          {{ $t('of') }}
          <span class="font-medium">{{ nbHits }}</span>
          {{ $t('results') }}
          {{ currentPage }}
        </p>
      </div>
      <div>
        <nav class="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
          <button :disabled="showingFirstPage"
                  v-if="nbHits > (limit * 3)"
                  @click="updateOffset(currentPage-1)"
                  class="relative inline-flex items-center px-2 py-2 border border-gray-800 text-sm font-medium hover:bg-gray-50">
            <span class="sr-only">Previous</span>
            <!-- Heroicon name: solid/chevron-left -->
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                 aria-hidden="true">
              <path fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"/>
            </svg>
          </button>

          <button
              v-if="hasSecondPreviousPage"
              @click="updateOffset(currentPage-2)"
              class="relative inline-flex items-center px-4 py-2 border border-gray-800 text-sm font-medium text-gray-800 hover:bg-gray-500">
            {{ currentPage - 2 }}
          </button>
          <button
              v-if="hasPreviousPage"
              @click="updateOffset(currentPage-1)"
              class="relative inline-flex items-center px-4 py-2 border border-gray-800 text-sm font-medium text-gray-800 hover:bg-gray-500">
            {{ currentPage - 1 }}
          </button>
          <button
              class="relative inline-flex items-center px-4 py-2 border border-gray-800 text-sm font-medium text-gray-800 bg-gray-500">
            {{ currentPage }}
          </button>
          <button
              v-if="hasNextPage"
              @click="updateOffset(currentPage+1)"
              class="relative inline-flex items-center px-4 py-2 border border-gray-800 text-sm font-medium text-gray-800 hover:bg-gray-500">
            {{ currentPage + 1 }}
          </button>
          <button
              v-if="hasSecondNextPage"
              @click="updateOffset(currentPage+2)"
              class="relative inline-flex items-center px-4 py-2 border border-gray-800 text-sm font-medium text-gray-800 hover:bg-gray-500">
            {{ currentPage + 2 }}
          </button>
          <button :disabled="showingLastPage"
                  v-if="nbHits > (limit * 3)"
                  @click="updateOffset(currentPage+1)"
                  class="relative inline-flex items-center px-2 py-2 border border-gray-800 text-sm font-medium hover:bg-gray-50">
            <span class="sr-only">Next</span>
            <!-- Heroicon name: solid/chevron-right -->
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                 aria-hidden="true">
              <path fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"/>
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

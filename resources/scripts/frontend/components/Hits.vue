<template>
  <div class="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 tw-gap-3">
    <hit v-for="hit in hits" :display-fields="displayFields" :key="hit.id" :hit="hit"></hit>
    <span v-if="!hits.length">{{ $t('No items found') }}</span>
  </div>
</template>

<script>
import Hit from "./Hit.vue"

export default {
  name: "Hits",
  components: {
    Hit
  },
  props: {
    hits: {
      type: Array,
      required: true
    },
	  displayFields: {
      type: Array,
      required: false,
		  default: () => {
			  return []
		  }
    }
  }
}
</script>

<style scoped>

</style>

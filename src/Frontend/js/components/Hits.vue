<template>
  <div class="grid grid-cols-3 gap-3">
    <hit v-for="hit in hits" :key="hit.id" :hit="hit"></hit>
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
    }
  }
}
</script>

<style scoped>

</style>

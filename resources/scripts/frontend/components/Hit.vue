<template>
  <div class="tw-border tw-border-solid tw-border-gray-800 tw-p-5">
    <a :href="hit.guid">{{ hit.post_title }}</a>
  </div>
</template>

<script>
export default {
  name: "Hit",
  props: {
    hit: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>

</style>

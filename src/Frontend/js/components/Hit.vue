<template>
  <div class="border border-gray-800 p-5">
    {{ hit.post_title }}
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
  }
}
</script>

<style scoped>

</style>

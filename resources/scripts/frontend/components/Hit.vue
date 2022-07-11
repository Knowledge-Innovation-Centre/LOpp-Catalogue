<template>
  <div class="tw-border tw-border-solid tw-border-gray-800 tw-p-5">
    <a :href="hit.guid">{{ hit.post_title }}</a>
	  <ul v-if="visibleFields.length">
		  <li v-for="value of visibleFields" :key="value" v-html="value"></li>
	  </ul>
  </div>
</template>

<script>
export default {
  name: "Hit",
  props: {
    hit: {
      type: Object,
      required: true
    },
	  displayFields: {
		  type: Array,
		  required: false,
		  default: () => {
			  return []
		  }
	  }
  },
	computed: {
	  visibleFields() {
		  const values = []
		  for (const property in this.hit) {
			  if (this.displayFields.includes(property)) {
				  values.push(this.hit[property])
			  }
		  }
		  return values;
	  }
	}
}
</script>

<style scoped>

</style>

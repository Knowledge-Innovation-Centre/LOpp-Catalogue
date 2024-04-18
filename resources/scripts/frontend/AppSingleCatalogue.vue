<template>
  <div class="container">

  </div>
</template>

<script>


import FormDataApi from "../FormDataApi.js";

export default {
	props: {
		post_id: {
			type: [Number, String],
			required: true
		}
	},
	data() {
		return {
			data: [],
			post: {},
			fieldSettings: [],
		}
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData() {
			let formData = new FormData();
			formData.append("action", "get_catalogue_values");
			formData.append("post_id", this.post_id);
			FormDataApi.post(ajaxurl, formData).then(response => {
				this.data = response.data;
			})
			formData = new FormData();
			formData.append("action", "get_field_settings");
			FormDataApi.post(ajaxurl, formData).then(response => {
				this.fieldSettings = response.data;
			})
			formData = new FormData();
			formData.append("action", "get_catalogue_post");
			formData.append("post_id", this.post_id);
			FormDataApi.post(ajaxurl, formData).then(response => {
				this.post = response.data;
			})
		}
	}
};

</script>


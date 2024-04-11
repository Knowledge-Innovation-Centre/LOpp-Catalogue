<template>

	<div
		class="flex flex-col relative max-w-sm bg-white border border-gray- shadow dark:bg-gray-800 dark:border-gray-700 mb-3 card-hov card-container">
		<div>
			<img :src="hit.image_url || altimg" :alt="altimg" class="w-full h-auto mb-1 max-h-10 ">
			<div class="absolute top-0 right-0 bg-gray-800 text-white p-2 text-s rounded-bl-lg topic">
				<span>{{ hit.education_subject }}</span>
			</div>
		</div>
		<div class="flex flex-col justify-between grow card-info ">

			<h4 class="text-xl font-extrabold dark:text-white mb-2 cursor-pointer px-3 mt-3" @click="navigate">
						{{
				hit.post_title }}</h4>

			<div class="p-5 flex flex-col justify-between grow card-data ">
				<div>



					<div class="flex items-center min-h-12 mb-1">
						<svg class="mr-2 w-6 h-6 text-gray-800 dark:text-white mr-2 w-10 flex-shrink-0"
							aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
							viewBox="0 0 24 24">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z" />
						</svg>
						<a :href="hit.guid" class="text-gray-600 text-base">{{ hit.provided_by }}</a>
					</div>

					<div class="flex items-start mb-1 ">
						<svg class="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
						</svg>

						<a :href="hit.guid" class="text-gray-600 text-base">{{ hit.language }}</a>
					</div>

					<div class="flex items-start mb-2">
						<svg class="w-6 h-6 text-gray-800 dark:text-white mr-2 flex-shrink-0" aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
						</svg>
						<a :href="hit.guid" class="text-gray-600 text-base">{{ hit.workload_in_hours }}</a>
					</div>
				</div>
				<div>
					<h5 class="p-2 text-s rounded-bl-lg">
						<span>Application status: Open</span>
					</h5>
				</div>
			</div>
		</div>
		<ul v-if="visibleFields.length" class="mt-3">
			<li v-for="value of visibleFields" :key="value" class="text-gray-600">{{ value }}</li>
		</ul>
	</div>
</template>

<script>
import altimg from './../../../images/altimg.png';

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
			default: () => []
		}
	},
	computed: {
		visibleFields() {
			const values = [];
			for (const property in this.hit) {
				if (this.displayFields.includes(property) && this.hit[property]) {
					values.push(this.hit[property]);
				}
			}
			return values;
		}
	},
	data() {
		return {
			altimg: altimg
		};
	},
	methods: {
		navigate() {
			if (this.hit.guid) {
				window.location.href = this.hit.guid;
			}
		}
	}
};
</script>

<style scoped></style>

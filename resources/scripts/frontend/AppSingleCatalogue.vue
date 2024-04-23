<template>
	<div class="container">
		<div class="post-section">

			<div class="structure">
				<div class="structure-item">
					<h4>ECTS</h4>
					<p>{{ ects }}</p>
				</div>
				<div class="structure-item">
					<h4>Price</h4>
					<p>{{ price }}</p>
				</div>
				<div class="structure-item">
					<h4>Status</h4>
					<p>{{ status }}</p>
				</div>
				<div class="structure-item">
					<a :href="applyURL" class="apply-button">Apply here</a>
				</div>
			</div>

			<div ref="postContent" class="post-content" v-html="post.post_content"></div>
		</div>
		<div class="data-section">
			<div class="filter-section">
				<div :class="{ 'clicked': buttonsClicked }" class="fields-buttons">
					<button v-for="(value, key, index) in data" :key="key" :class="{ 'data-btn-active': activeIndex === index }"
						class="data-button" @click="displayData(key, index)">
						{{ transformKey(key) }}
					</button>
				</div>
			</div>

			<div class="selected-field">
				<h3>{{ transformKey(selectedFilter) }}</h3>
				<ul>
					<li v-for="(value, key) in selectedField" :key="key">
						<template v-if="selectedFilter === 'additional'"><strong >
							{{ getTitleForAdditional(key) }}:</strong> {{ value }}
						</template>
						<template v-else><strong >{{ this.fieldSettings[selectedFilter][key].label }}:</strong> {{ value }}</template>
					</li>
				</ul>
			</div>

		</div>
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
			selectedField: {},
			selectedFilter: "general",
			ects: "",
			price: "",
			status: "",
			applyURL: "",
			buttonsClicked: false,
			activeIndex: 0
		};
	},
	mounted() {
		this.getData();
		this.applyStylingToPostContent();
		const firstButton = document.querySelector('.fields-buttons .data-button');

		// Add the data-btn-active class to the first button
		if (firstButton) {
			firstButton.classList.add('data-btn-active');
		}
	},
	updated() {
		this.applyStylingToPostContent();
	},
	methods: {
		getData() {
			let formData = new FormData();
			formData.append("action", "get_catalogue_values");
			formData.append("post_id", this.post_id);
			FormDataApi.post(ajaxurl, formData).then(response => {
				this.ects = response.data.information_about_the_lopp.ects_credit_points || "N/A";
				this.price = response.data.price_details || "N/A";
				this.status = response.data.information_about_the_lopp.ects_credit_points || "N/A";
				this.applyURL = response.data.general.homepage || "N/A";
				this.data = response.data;
			});

			formData = new FormData();
			formData.append("action", "get_field_settings");
			FormDataApi.post(ajaxurl, formData).then(response => {
				this.fieldSettings = response.data;
				this.selectedField = JSON.parse(JSON.stringify(this.data["general"]));
			});

			formData = new FormData();
			formData.append("action", "get_catalogue_post");
			formData.append("post_id", this.post_id);
			FormDataApi.post(ajaxurl, formData).then(response => {
				this.post = response.data;
			});
		},
		displayData(dataKey, index) {
			this.selectedField = JSON.parse(JSON.stringify(this.data[dataKey]));
			this.selectedFilter = dataKey;
			this.activeIndex = index;
		},
		applyStylingToPostContent() {
			const postContent = this.$refs.postContent;
			if (postContent) {
				const listItems = postContent.querySelectorAll('li');
				listItems.forEach(function (item) {
					item.classList.add("post-content-item");
				});

				const ulElements = postContent.querySelectorAll('ul');
				ulElements.forEach(function (ul) {
					ul.classList.add("info-list");
					const lastLi = ul.querySelector('li:last-child');
					if (lastLi) {
						lastLi.style.paddingBottom = '20px';
					}
				});
			}
		},
		transformKey(key) {
			return key.replace(/_/g, ' ').replace(/\b\w/g, function (char) {
				return char.toUpperCase();
			});
		},
		getTitleForAdditional(key) {
			return this.fieldSettings.additional.find(additionalItem => additionalItem.slug === key).title;
		}
	}
};
</script>

<style>
.container {
	padding: 30px;
	display: flex;
	flex-direction: column;
	/* Add position relative to the container */
}

.filter-section {
	width: 30%;
	padding: 20px;
	display: flex;
	flex-direction: column;
}

.data-section {
	flex: 1;
	display: flex;
	gap: 30px;
	margin-top: 30px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
}

.post-section {
	border-radius: 10px;
	padding: 20px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
}

.structure {
	display: flex;
	gap: 20px;
	margin-bottom: 20px;
}

.structure-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 20px;
}

.structure-item h4 {
	font-size: 18px;
	margin-bottom: 5px;
}

.structure-item p {
	font-size: 16px;
}

.apply-button {
	padding: 10px 20px;
	background-color: #007bff;
	color: #fff;
	text-decoration: none;
	border-radius: 5px;
	transition: background-color 0.3s ease;
}

.apply-button:hover {
	background-color: #0056b3;
}

.post-content {
	margin-bottom: 20px;
}

.info {
	padding: 20px;
	margin-bottom: 30px;
	background-color: #f9f9f9;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.info h3 {
	font-size: 24px;
	margin-bottom: 20px;
	color: #333;
}

.info p {
	font-size: 16px;
	margin-bottom: 10px;
}

.info ul {
	list-style: disc;
	padding-left: 20px;
}

.info-para {
	font-size: 16px;
	line-height: 1.5;
	color: #555;
	margin-top: 20px;
}

.selected-field {
	padding: 10px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	/* border: 3px solid #5401FE; */
	width: -webkit-fill-available;
}

.selected-field h3 {
	margin-bottom: 10px;
	align-self: flex-start;
}

.selected-field ul {
	list-style: none;
	padding: 0;
}

.selected-field ul li {
	margin-bottom: 5px;
}

.info ul li {
	list-style: none;
}

.info-list {
	padding-top: 10px;
}

.info-list li {
	list-style: none;
	display: flex;
	align-items: center;
	font-style: italic;
	text-transform: capitalize;
}

.info-list li::before {
	content: "\2192";
	color: #007bff;
	font-size: 1.2rem;
	margin-right: 10px;
}

.info-list li span {
	font-size: 16px;
	color: #333;
	font-style: italic;
	text-transform: capitalize;
}

.fields-buttons {
	display: flex;
	flex-direction: column;
}

.fields-buttons.clicked {
	position: absolute;
	bottom: 0;
	left: 0;
	display: flex;
	flex-direction: column;
}

.data-button {
	padding: 12px 20px;
	color: white;
	border: none;
	border-bottom: 1px solid black;
	cursor: pointer;
	transition: background-color 0.3s ease;
	outline: none;
	width: 100%;
	text-align: center;
	border-radius: 0px;
}

.data-button:hover {
	background-color: #5401FE;
}

.data-button:focus-within {
	border: none !important;
}

.data-button:focus {
	background-color: #5401FE;
	border: none !important;
	outline: none !important;
}

.data-btn-active {
	background-color: white !important;
	border: #5401FE !important;
	color: #5401FE;
}

@media screen and (max-width: 768px) {
	.container {
		padding: 20px;
	}

	.data-section {
		flex-direction: column;
	}

	.data-button {
		padding: 8px;
	}

	.filter-section {
		width: auto;
	}

	.structure {
		flex-wrap: wrap;
		justify-content: center;
	}

	.structure-item {
		width: 100%;
		padding: 10px;
		box-sizing: border-box;
	}

	.apply-button-container {
		width: 100%;
		text-align: center;
	}

	.apply-button {
		width: 100%;
	}

	.post-section {
		margin-top: 20px;
	}

	.selected-field {
		text-align: center;
	}

	.selected-field > ul > li{
		list-style: none;
	}

}
</style>

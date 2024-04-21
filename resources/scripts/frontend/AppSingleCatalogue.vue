<template>
	<div class="container">
		<div class="filter-section">
			<div class="fields-buttons" :class="{ 'clicked': buttonsClicked }">
				<button v-for="(value, key) in data" :key="key" @click="displayData(key)" class="data-button">
					{{ transformKey(key) }}
				</button>
			</div>
		</div>

		<div class="data-section">
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

			<div class="post-content" ref="postContent" v-html="post.post_content"></div>

			<div class="selected-field">
				<h3>{{ transformKey(selectedFilter) }}</h3>
				<ul>
					<li v-for="(value, key) in selectedField" :key="key">
						<strong>{{ transformKey(key) }}:</strong> {{ value }}
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
			selectedFilter: "Selected Field",
			ects: "",
			price: "",
			status: "",
			applyURL: "",
			buttonsClicked: false
		};
	},
	mounted() {
		this.getData();
		this.applyStylingToPostContent();
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
		displayData(dataKey) {
			this.selectedField = JSON.parse(JSON.stringify(this.data[dataKey]));
			this.selectedFilter = dataKey;

			setTimeout(() => {
				window.scrollTo({
					top: document.body.scrollHeight,
					behavior: 'smooth'
				});
			}, 100);
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
		}
	}
};
</script>

<style>
.container {
	padding: 30px;
	display: flex;
}

.filter-section {
	width: 30%;
	padding: 20px;
}

.data-section {
	flex: 1;
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
}

.selected-field h3 {
	margin-bottom: 10px;
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
	position: sticky;
	top: 20%;
	display: flex;
	flex-direction: column;
}

.fields-buttons.clicked {
    position: sticky;
    top: 100%;
    display: flex;
    flex-direction: column;
}

.data-button {
	padding: 12px 20px;
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	transition: background-color 0.3s ease;
	outline: none;
	margin-bottom: 10px;
	width: 100%;
	text-align: center;
}

.data-button:hover {
	background-color: #0056b3;
}

.data-button:focus-within {
	border: none !important;
}

.data-button:focus {
	background-color: #0056b3;
	border: none !important;
	outline: none !important;
}
</style>

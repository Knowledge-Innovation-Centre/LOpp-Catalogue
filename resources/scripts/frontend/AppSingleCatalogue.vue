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
				<div class="fields-btns" :class="{ 'clicked': burgerMenuOpen }">
					<button v-for="(value, key, index) in data" :key="key"
						:class="{ 'data-btn-active': activeIndex === index }" class="data-button"
						@click="displayData(key, index)">
						{{ transformKey(key) }}
					</button>
				</div>
			</div>
			<div class="filter-section-mobile">
				<!-- Burger menu button -->
				<div class="burger-menu" @click="toggleBurgerMenu">
					<div class="burger-line"></div>
					<div class="burger-line"></div>
					<div class="burger-line"></div>
				</div>
				<h3 id="title-selected" class="mobile-selected">{{ transformKey(selectedFilter) }}</h3>
				<!-- List of buttons -->
				<div class="fields-buttons fields-buttons-hide" :class="{ 'clicked': burgerMenuOpen }">
					<button v-for="(value, key, index) in data" :key="key"
						:class="{ 'data-btn-active': activeIndex === index }" class="data-button"
						@click="displayData(key, index)">
						{{ transformKey(key) }}
					</button>
				</div>
			</div>
			<div class="selected-field">

				<ul>
					<li v-for="(value, key) in selectedField" :key="key">
						<template v-if="this.fieldSettings[selectedFilter][key].is_url === true">
							<strong><a style="text-decoration: none;" :href="value" target="_blank">{{ this.fieldSettings[selectedFilter][key].label }}</a> </strong>
						</template>
						<template v-else-if="selectedFilter === 'additional'">
							<strong>{{ getTitleForAdditional(key) }}:</strong> {{ value }}
						</template>
						<template v-else>
							<strong>{{ this.fieldSettings[selectedFilter][key].label }}: </strong>
							<span v-html="value"></span>
						</template>
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
			activeIndex: 0,
			buttonsClicked: false,
			burgerMenuOpen: false
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
				this.price = response.data.information_about_the_lopp.price_details || "N/A";
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
			const buttonsContainer = document.querySelector('.fields-buttons');
			buttonsContainer.classList.add('menu-hidden');
			const field = document.getElementById('title-selected');
			field.style.display = 'flex';
			const burger = document.querySelector('.burger-menu');
			burger.classList.remove('burger-menu-hidden');
			const menu = document.querySelector(".filter-section-mobile");
			menu.classList.remove('filter-section-mobile-center');
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
		},
		toggleBurgerMenu() {
			this.burgerMenuOpen = !this.burgerMenuOpen;
			const buttonsContainer = document.querySelector('.fields-buttons');
			buttonsContainer.style.display = 'flex';
			const field = document.getElementById('title-selected');
			field.style.display = 'none';
			const burger = document.querySelector('.burger-menu');
			burger.classList.add('burger-menu-hidden');
			const menu = document.querySelector(".filter-section-mobile");
			menu.classList.add('filter-section-mobile-center');
			console.log(this.burgerMenuOpen)
		}
	}
};
</script>

<style>
.container {
	padding: 30px;
	display: flex;
	flex-direction: column;
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
	text-decoration: none !important;
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
	display: none;
	flex-direction: column;
	transition: all 0.3s ease;
}

.fields-buttons.clicked {
	display: flex;
	flex-direction: column;
	transition: all 0.3s ease;
}

.data-button {
	padding: 12px 20px;
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
	border-bottom: 1px solid black;
}

.data-button:focus {
	background-color: #5401FE;
	border: none !important;
	outline: none !important;
	border-bottom: 1px solid black;
}

.data-btn-active {
	border: #5401FE !important;
	color: #fff;
	background: #5401FE;
	border-bottom: 1px solid black;
}





.burger-menu {
	display: none;
	flex-direction: column;
	justify-content: space-between;
	width: 30px;
	height: 20px;
	cursor: pointer;
	transition: transform 0.3s ease;
	margin-top: 17px;
}

.burger-line {
	width: 100%;
	height: 4px;
	background-color: #333;
	transition: all 0.3s ease;
}

/* Rotate burger lines to create X icon */
.clicked .burger-line:nth-child(1) {
	transform: rotate(-45deg) translate(-3px, 6px);
}

.clicked .burger-line:nth-child(2) {
	opacity: 0;
}

.clicked .burger-line:nth-child(3) {
	transform: rotate(45deg) translate(-3px, -6px);
}

.filter-section-mobile {
	display: none;
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
		flex-direction: row;
		gap: 10px;
		padding-bottom: 0px !important;
	}

	.structure {
		flex-wrap: wrap;
		gap: 0px;
		justify-content: center;
	}

	.structure-item {
		width: 100%;
		box-sizing: border-box;
		flex-direction: row;
		justify-content: center;
	}

	.structure-item>p {
		margin-block-end: 0px;
		font-size: 18px;
		padding-left: 10px;
	}


	.apply-button {
		width: 60%;
		text-align: center;

	}

	.post-section {
		margin-top: 20px;
	}

	.selected-field>ul>li {
		list-style: none;
	}

	.fields-buttons-hide {
		display: none;
	}

	.burger-menu {
		display: flex;
	}

	.mobile-selected {
		display: block;
		text-align: center;
	}

	.menu-hidden {
		display: none !important;
	}

	.selected-field {
		padding-left: 40px;
	}

	.filter-section-mobile {
		display: flex;
		justify-content: flex-start;
		padding-left: 20px;
		gap: 20px;
	}

	.filter-section-mobile-center {
		justify-content: space-evenly !important;
		padding: 20px;
	}

	.filter-section {
		display: none;
	}

	.burger-menu-hidden {
		display: none;
	}

}
</style>

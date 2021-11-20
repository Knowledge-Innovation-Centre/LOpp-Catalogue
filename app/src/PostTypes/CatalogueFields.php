<?php

namespace LearningOpportunitiesCatalogue\PostTypes;


// Abort if this file is called directly.
use LearningOpportunitiesCatalogue\CarbonFields\CarbonFieldsServiceProvider;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( CatalogueFields::class ) ) {
	/**
	 * The functionality shared between the admin and public-facing areas of the plugin.
	 *
	 * Useful for things that affect both back-end and front-end.
	 */
	class CatalogueFields {
		use CarbonFieldsHelper;

		public static function get_general_fields() {
			$prefix = 'specifiedBy.learningSpecification.';
			return [

				[
					'type'     => 'rich_text',
					'slug'     => 'provided_by',
					'xml_slug' => 'providedBy',
					'title'    => __( 'Provided By' ),
					'hint' => __('The organisation providing or directing the learning opportunity. In the case of, e.g. joint qualifications, there may be several organisations directing the learning opportunity.')
				],
				[
					'type'     => 'select',
					'slug'     => 'type_of_provider',
					'xml_slug' => 'typeOfProvider',
					'title'    => __( 'Type of provider' ),
					'options'  => self::get_options( 'provider_types', 'name', 'name' ),
					'hint' => __('What type of organization is providing the learning opportunity.'),
				],
				[
					'type'     => 'text',
					'slug'     => 'provided_at',
					'xml_slug' => 'providedAt',
					'title'    => __( 'Provided at' ),
					'hint' => __('The location where the learning opportunity will take place. For our case it is a virtual space (online).'),
				],
				[
					'type'     => 'select',
					'slug'     => 'learning_opportunity_type',
					'xml_slug' => $prefix . 'learningOpportunityType',
					'title'    => __( 'Learning opportunity type' ),
					'options'  => self::get_options( 'learning_opportunity_types', 'name', 'name' ),
					'hint' => __('The type of learning opportunity.'),
				],
				[
					'type'     => 'select',
					'slug'     => 'language',
					'xml_slug' => $prefix . 'language',
					'title'    => __( 'Language' ),
					'options'  => self::get_options( 'languages', 'xml_code', 'name' ),
					'hint' => __('The instruction and/or assessment language(s) used.'),
				],
				[
					'type'     => 'select',
					'slug'     => 'eqf_level',
					'xml_slug' => $prefix . 'qualification.EQFLevel',
					'title'    => __( 'EQF level' ),
					'options'  => self::get_options( 'eqf_level', 'name', 'name' ),
					'hint' => __('The qualification level as specified by the European Qualification Framework.'),
				],
				[
					'type'     => 'text',
					'slug'     => 'nqf_evel',
					'xml_slug' => $prefix . 'qualification.NQFLevel',
					'title'    => __( 'NQF level' ),
					'hint' => __('The qualification level as specified by a National Qualification Framework.'),
				],
				[
					'type'  => 'text',
					'slug'  => 'homepage',
					'title' => __( 'Home page' ),
					'hint' => __('The homepage (a public web document) of the learning opportunity.'),
				],
			];
		}

		public static function get_information_about_the_lopp_fields() {

			$prefix = 'specifiedBy.learningSpecification.';
			return [
				[
					'type'     => 'select',
					'slug'     => 'mode',
					'xml_slug' => $prefix . 'mode',
					'title'    => __( 'Mode' ),
					'options'  => self::get_options( 'modes', 'name', 'name' ),
					'hint' => __('The mode of learning and or assessment.'),
				],
				[
					'type'     => 'text',
					'slug'     => 'ects_credit_points',
					'xml_slug' => $prefix . 'ECTSCreditPoints',
					'title'    => __( 'ECTS credit points' ),
					'subType'  => 'number',
					'hint' => __('The credit points assigned to the learning specification, following the ECTS credit system.'),
				],
				[
					'type'     => 'date',
					'slug'     => 'start_at_date',
					'xml_slug' => 'startAtDate',
					'title'    => __( 'Start date' ),
					'hint' => __('The startdate from which a person may follow the learning opportunity'),
				],
				[
					'type'     => 'date',
					'slug'     => 'ended_at_date',
					'xml_slug' => 'endedAtDate',
					'title'    => __( 'End date' ),
					'hint' => __('The final date a person may start to follow the learning opportunity.'),
				],
				[
					'type'  => 'text',
					'slug'  => 'duration',
					'title' => __( 'Duration' ),
					'field_type' => 'number',
					'hint' => __('The nominal duration for which the learning opportunity will continue to run. Note, this may be after the end-date, since admissions may be closed but the learning opportunity may still be ongoing. (In Months)'),
				],
				[
					'type'     => 'rich_text',
					'slug'     => 'learning_schedule',
					'xml_slug' => 'learningSchedule',
					'title'    => __( 'Learning schedule' ),
					'hint' => __(''),
				],
				[
					'type'     => 'rich_text',
					'slug'     => 'schedule_information',
					'xml_slug' => 'scheduleInformation',
					'title'    => __( 'Schedule information' ),
					'hint' => __(''),
				],
				[
					'type'  => 'text',
					'slug'  => 'workload_in_hours',
					'title' => __( 'Workload in hours' ),
					'hint' => __('The expected workload indicated in the estimated number of hours the learner is expected to spend engaged in the activity. This would include the notional number of hours in class, in group work, in practicals, as well as hours engaged in self-motivated study.'),
				],
				[
					'type'  => 'select',
					'slug'  => 'admission_procedure',
					'xml_slug' => 'admissionProcedure',
					'title' => __( 'Admission procedure' ),
					'options'  => self::get_options( 'admission_procedure', 'name', 'name' ),
					'hint' => __('Specific information on how to apply for the course'),
				],
				[
					'type'     => 'rich_text',
					'slug'     => 'entry_requirements_note',
					'xml_slug' => $prefix . 'entryRequirementsNote',
					'title'    => __( 'Entry requirements note' ),
					'hint' => __('Specific entry requirements or prerequisites of individuals for which this specification is designed to start this learning opportunity.'),
				],
				[
					'type'     => 'text',
					'slug'     => 'price_details',
					'xml_slug' => 'priceDetails',
					'title'    => __( 'Price details' ),
					'hint' => __('Information about the pricing of the course, including fees and scholarships/subsidies available'),
				],
				[
					'type'     => 'rich_text',
					'slug'     => 'activities',
					'title'    => __( 'Activities' ),
					'hint' => __('A text description of the learning activity specification. (Learning Activity Specification)'),
				],
				[
					'type'  => 'text',
					'slug'  => 'assessments',
					'title' => __( 'Assessments' ),
					'hint' => __('Description of the assessment specification.'),
				],
				[
					'type'  => 'select',
					'slug'  => 'type_of_credential',
					'title' => __( 'Type of credential' ),
					'options'  => self::get_options( 'type_of_credential', 'name', 'name' ),
					'hint' => __('Select the type of credential is awarded when finishing this learning opportunity.'),
				],
				[
					'type'     => 'text',
					'slug'     => 'unique_id',
					'xml_slug' => 'learningOpportunity_Identifier',
					'title'    => __( "Unique ID" ),
					'hint' => __(''),
				],
			];
		}

		public static function get_learning_specification_fields() {
			$prefix = 'specifiedBy.learningSpecification.';

			return [
				[
					'type'     => 'text',
					'slug'     => 'learning_specification_id',
					'xml_slug' => $prefix . 'learningSpecificationID',
					'title'    => __( 'Learning specification ID' ),
					'hint' => __(''),
				],
				[
					'type'     => 'text',
					'slug'     => 'identifier',
					'xml_slug' => $prefix . 'identifier',
					'title'    => __( 'Identifier' ),
					'hint' => __(''),
				],
				[
					'type'     => 'select',
					'slug'     => 'iscedf_code',
					'xml_slug' => $prefix . 'ISCEDFCode',
					'title'    => __( 'ISCEDF Code' ),
					'options'  => self::get_options( 'iscedf_code', 'name', 'name' ),
					'hint' => __(''),
				],
				[
					'type'     => 'text',
					'slug'     => 'education_subject',
					'xml_slug' => $prefix . 'educationSubject',
					'title'    => __( 'Education subject' ),
					'hint' => __('The field of education for which the accreditation is valid. ISCED codes'),
				],
				[
					'type'     => 'select',
					'slug'     => 'learning_settings',
					'xml_slug' => $prefix . 'learningSettings',
					'title'    => __( 'Learning settings' ),
					'options'  => self::get_options( 'learning_settings', 'name', 'name' ),
					'hint' => __('The type of learning setting (formal, non-formal)'),
				],
				[
					'type'     => 'text',
					'slug'     => 'target_group',
					'xml_slug' => $prefix . 'targetGroup',
					'title'    => __( 'Target group' ),
					'hint' => __('A specific target group or category for which this specification is designed.'),
				],
				[
					'type'  => 'separator',
					'slug'  => 'learning_outcomes_separator',
					'title' => __( 'Learning outcomes' ),
					'hint' => __(''),
				],
				[
					'type'      => 'association',
					'slug'      => 'learning_outcome',
					'xml_slug'  => $prefix . 'learningOutcome.id',
					'title'     => __( 'Learning outcomes' ),
					'post_type' => LearningOutcome::POST_TYPE,
					'class'     => LearningOutcome::class,
					'fields'    => LearningOutcomeFields::class,
					'prefix'    => $prefix . 'learningOutcome',
					'hint' => __('Expected learning outcomes: he expected learning outcomes this learning activity specification can lead or contribute to.'),
				],

				[
					'type'  => 'separator',
					'slug'  => 'assessment_specification_separator',
					'title' => __( 'Assessment specification' ),
					'hint' => __(''),
				],
				[
					'type'     => 'select',
					'slug'     => 'assessment_type',
					'xml_slug' => $prefix . 'assessmentType',
					'title'    => __( 'Assessment type' ),
					'options'  => self::get_options( 'assessment_type', 'name', 'name' ),
					'hint' => __(''),
				],
				[
					'type'     => 'text',
					'slug'     => 'assessor_type',
					'xml_slug' => $prefix . 'assessorType',
					'title'    => __( 'Assessor type' ),
					'hint' => __(''),
				],
				[
					'type'     => 'text',
					'slug'     => 'assessment_format',
					'xml_slug' => $prefix . 'assessmentFormat',
					'title'    => __( 'Assessment format' ),
					'hint' => __(''),
				],
				[
					'type'     => 'text',
					'slug'     => 'assessment_language',
					'xml_slug' => $prefix . 'assessmentLanguage',
					'title'    => __( 'Assessment language' ),
					'hint' => __(''),
				],
				[
					'type'     => 'text',
					'slug'     => 'grading_schema',
					'xml_slug' => $prefix . 'gradingSchema',
					'title'    => __( 'Grading schema' ),
					'hint' => __(''),
				],
				[
					'type'     => 'text',
					'slug'     => 'awarding_opportunity',
					'xml_slug' => $prefix . 'awardingOpportunity',
					'title'    => __( 'Awarding opportunity' ),
					'hint' => __(''),
				],
				[
					'type'  => 'separator',
					'slug'  => 'qualification_separator',
					'title' => __( 'Qualification' ),
					'hint' => __(''),
				],
			];
		}

		public static function get_contact_fields() {
			$prefix = 'agent.contactInfo.';

			return [
				[
					'type'     => 'rich_text',
					'slug'     => 'note',
					'xml_slug' => $prefix . 'note',
					'title'    => __( 'Note' ),
					'hint' => __('Description about the context for contacting the provider '),
				],
				[
					'type'     => 'text',
					'slug'     => 'contact_form',
					'xml_slug' => $prefix . 'contactForm',
					'title'    => __( 'Contact form' ),
					'hint' => __('E-Mail Address/Contact form'),
				],
			];
		}


		public static function get_part() {
			$prefix = 'hasPart.';

			return [
				[
					'type'      => 'association',
					'slug'      => 'part_learning_specifications',
					'xml_slug'  => $prefix . 'learningSpecification.learningSpecificationID',
					'title'     => __( 'Related learning specification' ),
					'post_type' => Catalogue::POST_TYPE,
					'class'     => Catalogue::class,
					'fields'    => CatalogueFields::class,
					'multiple'  => true,
					'prefix'    => $prefix . 'learningSpecification',
				],
			];
		}


		public static function get_filter_fields() {
			global $wpdb;

			$fields = CatalogueFields::get_general_fields();
			$fields = array_merge( $fields, CatalogueFields::get_information_about_the_lopp_fields() );
			$fields = array_merge( $fields, CatalogueFields::get_learning_specification_fields() );
			$fields = array_merge( $fields, CatalogueFields::get_contact_fields() );

			$query   = "SELECT option_name, option_value FROM " . $wpdb->prefix . "options where option_name LIKE '%_filter'";
			$options = $wpdb->get_results( $query, OBJECT_K );


			$filter_fields = [];

			foreach ( $fields as $field ) {
				$slug = '_' . $field['slug'] . '_' . Catalogue::POST_TYPE . '_filter';
				if ( ! isset( $options[ $slug ] ) ) {
					continue;
				}
				if ( $options[ $slug ]->option_value == 'disable' ) {
					continue;
				}
				$field['filter_type'] = $options[ $slug ]->option_value;

				$filter_fields[] = $field;
			}


			$loc_option_catalogue_fields = carbon_get_theme_option( 'loc_option_catalogue_fields' );

			foreach ( $loc_option_catalogue_fields as $loc_option_catalogue_field ) {

				if ( ! $loc_option_catalogue_field['filter'] ) {
					continue;
				}
				if ( $loc_option_catalogue_field['filter'] == 'disabled' ) {
					continue;
				}
				$filter_fields[] = $loc_option_catalogue_field;
			}

			return $filter_fields;

		}

		public static function get_searchable_fields() {
			global $wpdb;

			$fields = CatalogueFields::get_general_fields();
			$fields = array_merge( $fields, CatalogueFields::get_information_about_the_lopp_fields() );
			$fields = array_merge( $fields, CatalogueFields::get_learning_specification_fields() );
			$fields = array_merge( $fields, CatalogueFields::get_contact_fields() );

			$query   = "SELECT option_name, option_value FROM " . $wpdb->prefix . "options where option_name LIKE '%_searchable'";
			$options = $wpdb->get_results( $query, OBJECT_K );

			$searchable_fields = [];

			foreach ( $fields as $field ) {
				$slug = '_' . $field['slug'] . '_searchable';
				if ( ! isset( $options[ $slug ] ) ) {
					continue;
				}
				if ( $options[ $slug ]->option_value == 0 || $options[ $slug ]->option_value == '0' ) {
					continue;
				}
				$field['searchable'] = $options[ $slug ]->option_value;
				$searchable_fields[] = $field;
			}

			$loc_option_catalogue_fields = carbon_get_theme_option( 'loc_option_catalogue_fields' );

			foreach ( $loc_option_catalogue_fields as $loc_option_catalogue_field ) {

				if ( ! $loc_option_catalogue_field['searchable'] ) {
					continue;
				}
				if ( $loc_option_catalogue_field['searchable'] == 0 || $loc_option_catalogue_field['searchable'] == '0' ) {
					continue;
				}
				$searchable_fields[] = $loc_option_catalogue_field;
			}

			usort( $searchable_fields, function ( $item1, $item2 ) {
				return (float) $item1['searchable'] <=> (float) $item2['searchable'];
			} );

			return $searchable_fields;

		}

		public static function get_options( $option_key, $key, $name ) {

			$options = CarbonFieldsServiceProvider::crb_get_i18n_theme_option( $option_key );

			$array = [];
			foreach ( $options as $option ) {
				$array[ $option[ $key ] ] = $option[ $name ];
			}

			return $array;
		}
	}
}

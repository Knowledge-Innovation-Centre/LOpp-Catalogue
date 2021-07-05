<template>
  <div class="container">
    <notifications></notifications>
    <h1 class="my-2 text-2xl">{{ $t('Import catalog items and learning maturity models') }}</h1>
    <div class="grid grid-cols-2 gap-5">

      <div>
        <button class="bg-blue-600 p-3 text-white" @click="runUploader">
          {{ $t('Select Catalog XML') }}
        </button>

        <div class="mt-5" v-for="attachment in attachments">
          {{ $t('Selected files:') }} {{ attachment.name }}
        </div>

        <div>
          <button class="bg-blue-600 p-3 text-white mt-5" @click="runImporterCatalog">
            {{ $t('Import Catalog') }}

          </button>
        </div>
      </div>
      <div>
        <button class="bg-blue-600 p-3 text-white" @click="runUploader1">
          {{ $t('Select learning maturity model XML') }}
        </button>

        <div class="mt-5" v-for="attachmentLearningMaturity in attachmentsLearningMaturity">
          {{ $t('Selected files:') }} {{ attachmentLearningMaturity.name }}
        </div>

        <div>
          <button class="bg-blue-600 p-3 text-white mt-5" @click="runImporterMaturity">
            {{ $t('Import learning maturity model') }}

          </button>
        </div>
      </div>
    </div>

    <div class="mt-5">{{ $t('Progress:') }} {{ progress }}%</div>


  </div>
</template>

<script>
import Api from "../../../Common/js/Api";
import Vue from 'vue'

let frame
export default {
  data() {
    return {
      attachments: [],
      attachmentsLearningMaturity: [],
      importing: false,
      imported: 0,
    };
  },
  computed: {
    progress() {
      if (this.attachments.length) {
        return Math.round(this.imported / this.attachments.length * 100)
      }
      if (this.attachmentsLearningMaturity.length) {
        return Math.round(this.imported / this.attachmentsLearningMaturity.length * 100)
      }
      return 0;
    }
  },
  watch: {},
  created() {

  },
  methods: {
    runUploader(event) {
      event.preventDefault()

      let $this = this;
      let frame = this.openFrame()

      // When an image is selected in the media frame...
      frame.on('select', function () {
        $this.attachments = frame.state().get('selection').models.map(model => model.attributes)

        Vue.notify({
          title: this.$t('Files selected'),
          type: 'success'
        })
      });
    },
    runUploader1(event) {
      event.preventDefault()

      let $this = this;
      let frame = this.openFrame()

      // When an image is selected in the media frame...
      frame.on('select', function () {
        $this.attachmentsLearningMaturity = frame.state().get('selection').models.map(model => model.attributes)

        Vue.notify({
          title: this.$t('Files selected'),
          type: 'success'
        })
      });
    },
    openFrame() {

      // If the media frame already exists, reopen it.
      if (frame) {
        frame.open()
        return
      }

      // Create a new media frame
      frame = wp.media({
        title: this.$t('Select or Upload XML'),
        button: {
          text: this.$t('Use this XMLs'),
        },
        multiple: true,
      })

      // Finally, open the modal on click
      frame.open()

      return frame
    },
    runImporterCatalog(event) {
      event.preventDefault()

      this.runImport(this.attachments, "loc_catalog_import_xml");
    },
    runImporterMaturity(event) {
      event.preventDefault()

      this.runImport(this.attachmentsLearningMaturity, "loc_maturity_model_import_xml");
    },
    async runImport(attachments, type) {
      this.importing = true;
      this.imported = 0;
      for (const attachment of attachments) {
        const formData = new FormData();
        formData.append("action", type);
        formData.append("loc_xml_id", attachment.id);
        let response = await Api.post(ajaxurl, formData, {
          processData: false,
          contentType: false
        })

        this.imported++;
      }

      Vue.notify({
        title: this.$t('Files imported'),
        type: 'success'
      })
      this.importing = false;

    },
  }
}
</script>

<style>

.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}

.loader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}

@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}


</style>

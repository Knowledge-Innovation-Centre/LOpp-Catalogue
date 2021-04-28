<template>
  <div class="container">
    ddfdf
    <div>
      <button class="bg-blue-600 p-3 text-white" @click="runUploader">
        Select Catalog XML
      </button>

      <div class="mt-5">Selected file: {{ attachment ? attachment.name : 'No file' }}</div>

      <div>
        <button class="bg-blue-600 p-3 text-white mt-5" @click="runImporterCatalog">
          Import Catalog
        </button>
      </div>
      <div class="mt-5">Progress: {{ progress }}%</div>
    </div>


  </div>
</template>

<script>

import Api from "../../../Common/js/Api";

let frame
export default {
  data() {
    return {
      progress: 0,
      attachment: null
    };
  },
  components: {},
  watch: {},
  created() {

  },
  methods: {
    runUploader(event) {
      event.preventDefault()

      let $this = this;

      // If the media frame already exists, reopen it.
      if (frame) {
        frame.open()
        return
      }

      // Create a new media frame
      frame = wp.media({
        title: 'Select or Upload XML',
        button: {
          text: 'Use this XML',
        },
        multiple: false,
      })

      // Finally, open the modal on click
      frame.open()


      // When an image is selected in the media frame...
      frame.on('select', function (media) {

        // Get media attachment details from the frame state
        let attachmentFile = frame.state().get('selection').first().toJSON();
        console.log(attachmentFile);
        $this.attachment = attachmentFile

        // fetch(window.url + '&loc_xml_id=' + attachment.ID )
        //     .then(
        //         (result) => {
        //             console.log(result);
        //         })
      });
    },
    runImporterCatalog(event) {
      event.preventDefault()

      this.runImport();


    },
    runImport() {

      const formData = new FormData();
      formData.append("action", "loc_catalog_import_xml");
      formData.append("loc_xml_id", this.attachment.id);
      Api.post(ajaxurl, formData, {
        processData: false,
        contentType: false
      })
          .then(response => {
            if (response.data.status === 'in_progress') {
              this.progress = response.data.progress
              runImport();
            }
            if (response.data.status === 'finished') {
              this.attachment = null
              this.progress = response.data.progress
              // addNotification(
              //     _x('Catalogue imported.', 'notification'),
              //     'success',
              // );
            }


          })
          .catch(response => {
            // addNotification(
            //     _x('An unknown error occurred.', 'notification'),
            //     'danger',
            // );
          });
    }
  },
}
;
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

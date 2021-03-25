<template>
  <v-date-picker @input="dateChanged($event)" :popover="{visibility: 'click'}" :masks="{input: 'DD.MM.YYYY'}"
                 v-model="date"
                 is-range>
    <template v-slot="{ inputValue, inputEvents }">
      <input
          :value="inputValue.start"
          v-on="inputEvents.start"
          placeholder="Select date"
      />
      <input
          :value="inputValue.end"
          v-on="inputEvents.end"
          placeholder="Select date"
      />
    </template>
  </v-date-picker>
</template>

<script>
import VueSlider from "vue-slider-component";
import {DatePicker} from 'v-calendar';

export default {
  name: "DatePicker",
  data() {
    return {
      date: {
        start: null,
        end: null
      },
      masks: {
        input: 'DD.MM.YYYY'
      }
    }
  },
  components: {
    VueSlider,
    VDatePicker: DatePicker,
  },

  methods: {
    dateChanged(date) {
      this.emit()
      console.log(date);
    }
  }
}
</script>

<style scoped>
input {
  display: inline-block;
  width: 49%;
}
</style>

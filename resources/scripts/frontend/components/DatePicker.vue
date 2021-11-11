<template>
  <v-date-picker @input="dateChanged($event)" :popover="{visibility: 'click'}" :masks="{input: 'DD.MM.YYYY'}"
                 v-model="date"
                 is-range>
    <template v-slot="{ inputValue, inputEvents }">
      <div class="tw-flex tw-flex-row">

        <input
            :value="inputValue.start"
            v-on="inputEvents.start"
            placeholder="From"
            type="text"
        />
        <input
            :value="inputValue.end"
            v-on="inputEvents.end"
            placeholder="To"
            type="text"
        />
      </div>
    </template>
  </v-date-picker>
</template>

<script>
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
    VDatePicker: DatePicker,
  },

  methods: {
    dateChanged(date) {
      this.$emit('input', date)
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

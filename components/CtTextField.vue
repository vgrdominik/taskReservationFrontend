<template>
  <v-text-field v-if="ctType==='outlined'" :dense="! withoutDense" outlined v-on="$listeners" v-bind="$attrs">
    <slot />
  </v-text-field>
  <v-text-field v-else v-on="$listeners" v-bind="$attrs">
    <slot />
  </v-text-field>
</template>

<script type="application/javascript">
export default {
  name: "CtTextField",

  props: {
    'ctType': {
      type: String,
      default: 'outlined',
      validator: function (value) {
        // The value must match one of these strings
        return ['outlined', 'empty'].indexOf(value) !== -1
      }
    },
    'withoutDense': {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
  <v-card v-if="type === 'default'" :shaped="! withoutShaped" v-on="$listeners" v-bind="$attrs">
    <v-toolbar flat color="primary">
      <slot name="leftTitleContent" />

      <v-spacer />
      <slot name="centerTitleContent">
        <v-toolbar-title style="color: white;" v-html="title" />
      </slot>
      <v-spacer />

      <slot name="rightTitleContent" />
    </v-toolbar>
    <slot v-if="fluid" />
    <v-container v-else>
      <slot />
    </v-container>
  </v-card>
  <v-card v-else v-on="$listeners" v-bind="$attrs">
    <slot />
  </v-card>
</template>

<script type="application/javascript">
export default {
  name: "CtCard",

  props: {
    'type': {
      type: String,
      default: 'default',
      validator: function (value) {
        // The value must match one of these strings
        return ['default', 'empty'].indexOf(value) !== -1
      }
    },
    'title': {
      type: String,
      default: '',
    },
    'withoutShaped': {
      type: Boolean,
      default: false,
    },
    'fluid': {
      type: Boolean,
      default: false,
    },
  },
}
</script>

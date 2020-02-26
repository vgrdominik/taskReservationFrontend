<template>
  <CtCard title="Notificaciones" width="500" class="mx-auto">
    <v-row dense>
      <v-col cols="12" class="mt-5" v-for="event in events" :key="event.id" v-html="event.description" />
    </v-row>
  </CtCard>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  middleware: 'authenticated',

  data() {
    return {
      events: [],
    }
  },

  computed: {
    serverMessage () {
      return this.$store.state.serverMessage.serverMessage
    },
  },

  mounted() {
    this.fetch()
  },

  methods: {
    fetch() {
      this.$axios.get('/api/event')
        .then((response) => (response.data) ? this.events = response.data : '')
        .catch((error) => (error.response.data.message) ? this.setServerMessage(error.response.data.message) : this.setServerMessage('Error.'))
    },

    ...mapActions({
      setServerMessage: 'serverMessage/setServerMessage',
    }),
  }
}
</script>

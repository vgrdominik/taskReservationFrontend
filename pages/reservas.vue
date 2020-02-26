<template>
  <CtCard title="Reservas" width="500" class="mx-auto">
    <v-row dense>
      <v-col cols="12" class="mt-5">
        <CtBtn @click="window.localtion = 'https://ciclotic.com'" block>
          cicloTIC
        </CtBtn>
      </v-col>
    </v-row>
  </CtCard>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  middleware: 'authenticated',

  computed: {
    serverMessage () {
      return this.$store.state.serverMessage.serverMessage
    },
    token () {
      return this.$store.state.user.token
    },
  },

  mounted() {
    this.fetch()
  },

  methods: {
    fetch() {

    },

    ...mapMutations({
      updateServerMessage: 'serverMessage/updateServerMessage',
    }),
  }
}
</script>

<template>
    <CtCard title="Login" width="300" class="mx-auto">
      <v-row dense>
        <v-col cols="12" class="mt-5">
          <CtTextField append-icon="mdi-email" label="Email" v-model="signInData.email"/>
        </v-col>
        <v-col cols="12">
          <CtTextField type="password" append-icon="mdi-lock" label="Password" v-model="signInData.password"/>
        </v-col>
        <v-col cols="12" v-if="serverMessage" v-html="serverMessage" class="error--text" />
        <v-col cols="12">
          <CtBtn @click="login()" type="primary" block>
            Entrar
          </CtBtn>
        </v-col>
        <v-col cols="12" class="mt-5">
          <v-row>
            <v-spacer />
            <nuxt-link to="/recordar-password">
              ¿Has olvidado el password?
            </nuxt-link>
            <v-spacer />
          </v-row>
        </v-col>
        <v-col cols="12" class="my-5">
          <CtBtn to="/registro" type="accent" block>
            Registro
          </CtBtn>
        </v-col>
      </v-row>
    </CtCard>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data(){
    return {
      signInData: {
        email: '',
        password: '',
        device_name: 'website',
      },
    }
  },

  computed: {
    serverMessage () {
      return this.$store.state.serverMessage.serverMessage
    }
  },

  methods: {
    login(){
      this.$axios.post('/api/login', this.signInData)
        .then((response) => (response.data.token) ? this.updateToken(response.data.token) : this.updateServerMessage(response.data))
        .catch((error) => (error.response.data.message) ? (error.response.data.message === 'The given data was invalid.') ? this.updateServerMessage('Datos inválidos.') : this.updateServerMessage(error.response.data.message) : '')
    },

    ...mapMutations({
      updateServerMessage: 'serverMessage/updateServerMessage',
      updateToken: 'user/updateToken',
    }),
  }
}
</script>

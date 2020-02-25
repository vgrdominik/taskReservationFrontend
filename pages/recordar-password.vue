<template>
    <CtCard title="Recordar password" width="300" class="mx-auto">
      <v-row dense>
        <v-col cols="12" class="mt-5">
          <CtTextField append-icon="mdi-email" label="Email" v-model="email"/>
        </v-col>
        <v-col cols="12">
          <CtBtn @click="forgot()" type="primary" block>
            Enviar
          </CtBtn>
        </v-col>
        <v-col cols="12" class="my-5">
          <CtBtn to="/login" type="accent" block>
            Volver
          </CtBtn>
        </v-col>
      </v-row>
    </CtCard>
</template>

<script>
export default {
    data(){
        return {
            email: '',
            password: ''
        }
    },

    methods: {
        forgot(){
            this.$axios.get('/airlock/csrf-cookie', {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                withCredentials: true,
            })
            .then( function(){
                this.$auth.loginWith('local', {
                    data: {
                        email: this.email,
                        password: this.password
                    },
                });
            }.bind(this))
        }
    }
}
</script>

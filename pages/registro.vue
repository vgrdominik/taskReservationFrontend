<template>
    <CtCard title="Registro gratuito" width="300" class="mx-auto">
      <v-row dense>
        <v-col cols="12">
          <v-text-field outlined append-icon="mdi-account" label="Nombre" v-model="name"/>
        </v-col>
        <v-col cols="12">
          <v-text-field outlined append-icon="mdi-email" label="Email" v-model="email"/>
        </v-col>
        <v-col cols="12">
          <v-text-field outlined type="password" append-icon="mdi-lock" label="Password" v-model="password"/>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-spacer />
            <CtBtn @click="register()">
              Login
            </CtBtn>
            <v-spacer />
          </v-row>
        </v-col>
      </v-row>
    </CtCard>
</template>

<script>
export default {
    data(){
        return {
            name: '',
            email: '',
            password: ''
        }
    },

    methods: {
        register(){
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

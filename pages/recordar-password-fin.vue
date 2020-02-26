<template>
    <CtCard title="Recordar password" width="300" class="mx-auto">
      <v-row dense>
        <v-col cols="12" class="mt-5">
          En unos momentos recibirás un correo con las instrucciones para modificar el password.
        </v-col>
        <v-col cols="12">
          <CtBtn to="/" type="primary" block>
            Home
          </CtBtn>
        </v-col>
        <v-col cols="12" class="my-5">
          <CtBtn to="/login" type="accent" block>
            Login
          </CtBtn>
        </v-col>
      </v-row>
    </CtCard>
</template>

<script>
export default {
}
</script>

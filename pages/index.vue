<template>
  <CtCard title="Home" width="500" class="mx-auto">
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
// import { mapMutations } from 'vuex'

export default {
  /*computed: {
    todos () {
      return this.$store.state.todos.list
    }
  },
  methods: {
    addTodo (e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
  }*/
}
</script>

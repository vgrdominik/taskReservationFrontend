export const state = () => ({
  serverMessage: '',
})

export const mutations = {
  updateServerMessage (state, serverMessageUpdated) {
    state.serverMessage = serverMessageUpdated
  },
  removeServerMessage (state) {
    state.serverMessage = ''
  },
}

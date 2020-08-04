
  const state = {
    Refresh: undefined
  }
  const mutations= {
    setRefresh(state, value){
      state.Refresh = value;
    }
  }
  const actions = {}
  const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
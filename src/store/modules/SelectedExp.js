import { base } from './../../boot/axios'
  
  const $axios = base;
  
  const state = {
    Exp: undefined,
    Title: undefined,
    Chart: undefined
  }
  const mutations= {
    setExperiment(state, value){
      $axios.get("/getInfo", {expID: 4}).then(response => { console.log(response) });
      state.Exp = value;
    },
    setTitle(state, value){
      state.Title = value;
    },
    setChart(state, value){
      state.Chart = value;
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
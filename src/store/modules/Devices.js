import { base } from '../../boot/axios'

const $axios = base;

const state = {
  devices : [],
  selectedDevice: ""
}

const mutations = {
  setDevices(state, value){
    state.devices = value;
  },
  setSelected(state, value){
    state.selectedDevice = value;
  }
}

const actions = {
  fetchDevices(context) {
    return new Promise((resolve, reject) => {
      $axios
      .get("/getDevices")
        .then(response => {
          var DataArray = response.data;
          for(var i = 0; i < DataArray.length; i++){
            var data = DataArray[i];
            var sensors = [];
            sensors.push({name:"Co2", on: data.co2 != 0})
            sensors.push({name:"C2H4", on: data.c2h4 != 0})
            sensors.push({name:"O2", on: data.o2 != 0})
            sensors.push({name:"RH", on: data.dht != 0})
            sensors.push({name:"T", on: data.dht != 0})
            DataArray[i].sensors = sensors;
          }
          console.log(DataArray)
          context.commit("setDevices", DataArray);
          resolve();
        })
        .catch(() => {
          reject();
        })
    })
  },
  setSelectedDev(context, value){
    context.commit("setSelected",value);
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
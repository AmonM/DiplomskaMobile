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
            sensors.push({name:"S1", on: data.S1 != 0})
            sensors.push({name:"S2", on: data.S2 != 0})
            sensors.push({name:"S3", on: data.S3 != 0})
            sensors.push({name:"DHT", on: data.dht != 0})
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
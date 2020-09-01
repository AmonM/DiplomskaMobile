import { base } from './../../boot/axios'

const $axios = base;

const state = {
  refresh: undefined,
  experiments: []
}

const mutations = {
  setRefresh(state, value) {
    state.refresh = value;
  },
  setExperiments(state, value) {
    state.experiments = value;
  }
}

const actions = {
  fetchExperiments(context) {
    return new Promise((resolve, reject) => {
      var experiments = [];
      $axios
      .get("/getInfo")
        .then(response => {
          var DataArray = response.data;
          var experiment;
          console.log(DataArray)
          for (var data in response.data) {
            experiment = new Object();
            experiment.id = DataArray[data].exp_ID;
            experiment.name = DataArray[data].exp_name;
            experiment.desc = DataArray[data].exp_desc;
            if (DataArray[data].exp_start_date)
              experiment.start = new Date(
                DataArray[data].exp_start_date.replace(" ", "T")
              ).toLocaleString();
            if (DataArray[data].exp_end_date)
              experiment.end = new Date(
                DataArray[data].exp_end_date.replace(" ", "T")
              ).toLocaleString();
            experiment.sensors = {};

            experiment.sensors[1] = {
              name: DataArray[data].S1 || "S1",
              on: DataArray[data].S1 ? true : false
            };
            experiment.sensors[2] = {
              name: DataArray[data].S2 || "S2",
              on: DataArray[data].S2 ? true : false
            };
            experiment.sensors[3] = {
              name: DataArray[data].S3 || "S3",
              on: DataArray[data].S3 ? true : false
            };
            experiment.sensors[4] = {
              name: "RH",
              on: DataArray[data].RH ? true : false
            };
            experiment.sensors[5] = {
              name: "T",
              on: DataArray[data].T ? true : false
            };
            experiments.push(experiment);
          }
          context.commit("setExperiments", experiments);
          resolve("Podatki posodobljeni.");
        })
        .catch(() => {
          reject("Podatkov ni uspelo posodobiti.");
        })
    })
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
import { base } from './../../boot/axios'

const $axios = base;

const state = {
  Exp: {},
  Title: undefined,
  Chart: {},
  Interval: "",
  Length: ""
}
const mutations = {
  setExperiment(state, value) {
    state.Exp = value;
  },
  setTitle(state, value) {
    state.Title = value;
  },
  setChart(state, value) {
    state.Chart = value;
  },
  setInterval(state, value) {
    state.Interval = value;
  },
  setLength(state, value) {
    state.Length = value;
  }
}

const actions = {
  fetchData(context, res) {
    return new Promise((resolve, reject) => {
      $axios
        .get("/getInfo", {
          params: { expID: res }
        })
        .then(response => {
          var Data = response.data[0];
          console.log(Data)
          var experiment = new Object();
          experiment.id = Data.exp_ID;
          experiment.name = Data.exp_name;
          experiment.desc = Data.exp_desc;
          if (Data.exp_start_date)
            experiment.start = new Date(
              Data.exp_start_date.replace(" ", "T")
            ).toLocaleString();
          if (Data.exp_end_date)
            experiment.end = new Date(
              Data.exp_end_date.replace(" ", "T")
            ).toLocaleString();

          experiment.S1 = Data.S1;
          experiment.S2 = Data.S2;
          experiment.S3 = Data.S3;
          experiment.rh = Data.RH;
          experiment.t = Data.T;

          experiment.intM = Data.M_int

          var MeasureInterval = "Meritev opravljena na ";


          if (experiment.intM > 2 || experiment.intM == 0) {
            MeasureInterval += experiment.intM + " minut.";
          } else if (experiment.intM == 2) {
            MeasureInterval += experiment.intM + " minuti.";
          } else {
            MeasureInterval += experiment.intM + " minuto.";
          }4

          experiment.interval = MeasureInterval;

          context.commit("setExperiment", experiment);
          resolve("Podatki posodobljeni.");
        })
        .catch(error => {
          reject("Podatkov ni uspelo posodobiti.")
        });
    });
  },
  fetchGraph({commit}, res) {
    return new Promise((resolve, reject) => {
      $axios
      .get(`/getData?expID=${res}`)
      .then(response => {
        var DataArray = response.data;
        var chart = {
          S3: [],
          S2: [],
          S1: [],
          T: [],
          RH: []
        }

        for (var index in DataArray) {
          if(DataArray[index]["S3"] != null)
          chart.S3.push(DataArray[index]["S3"]);

          if(DataArray[index]["S2"] != null)
          chart.S2.push(DataArray[index]["S2"]);

          if(DataArray[index]["S1"] != null)
          chart.S1.push(DataArray[index]["S1"]);

          if(DataArray[index]["Humidity"] != null)
          chart.RH.push(DataArray[index]["Humidity"]);

          if(DataArray[index]["Temperature"] != null)
          chart.T.push(DataArray[index]["Temperature"]);
        }

        commit("setChart", chart);
        resolve("Podatki posodobljeni.");
      })
      .catch(() => {
        reject("Podatkov ni uspelo posodobiti.")
      });
    });
  }
}

const getters = {
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
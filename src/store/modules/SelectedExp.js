import { base } from './../../boot/axios'

const $axios = base;

const state = {
  Exp: {},
  Title: undefined,
  Chart: undefined,
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

          experiment.co2 = Data.Co2;
          experiment.c2h4 = Data.C2H4;
          experiment.o2 = Data.O2;
          experiment.rh = Data.RH;
          experiment.t = Data.T;

          experiment.intM = Data.M_int.split(":")[2];
          experiment.intH = Data.M_int.split(":")[1];
          experiment.intD = Data.M_int.split(":")[0];

          var MeasureInterval = "Meritev opravljena na ";

          if (experiment.intD > 2 || experiment.intD == 0) {
            MeasureInterval += experiment.intD + " dni ";
          } else if (experiment.intD == 2) {
            MeasureInterval += experiment.intD + " dneva ";
          } else {
            MeasureInterval += experiment.intD + " dan ";
          }

          if (experiment.intH > 2 || experiment.intH == 0) {
            MeasureInterval += experiment.intH + " ur ";
          } else if (experiment.intH == 2) {
            MeasureInterval += experiment.intH + " uri ";
          } else {
            MeasureInterval += experiment.intH + " uro ";
          }

          if (experiment.intM > 2 || experiment.intM == 0) {
            MeasureInterval += experiment.intM + " minut.";
          } else if (experiment.intM == 2) {
            MeasureInterval += experiment.intM + " minuti.";
          } else {
            MeasureInterval += experiment.intM + " minuto.";
          }

          experiment.lengthD = Data.length.split(":")[0];
          experiment.lengthH = Data.length.split(":")[1];
          experiment.lengthM = Data.length.split(":")[2];

          var ExperimentLength = "Trajanje ";

          if (experiment.lengthD > 2 || experiment.lengthD == 0) {
            ExperimentLength += experiment.lengthD + " dni ";
          } else if (experiment.lengthD == 2) {
            ExperimentLength += experiment.lengthD + " dneva ";
          } else {
            ExperimentLength += experiment.lengthD + " dan ";
          }

          if (experiment.lengthH > 2 || experiment.lengthH == 0) {
            ExperimentLength += experiment.lengthH + " ur ";
          } else if (experiment.lengthH == 2) {
            ExperimentLength += experiment.lengthH + " uri ";
          } else {
            ExperimentLength += experiment.lengthH + " uro ";
          }

          if (experiment.lengthM > 2 || experiment.lengthM == 0) {
            ExperimentLength += experiment.lengthM + " minut.";
          } else if (experiment.lengthM == 2) {
            ExperimentLength += experiment.lengthM + " minuti.";
          } else {
            ExperimentLength += experiment.lengthM + " minuto.";
          }
          experiment.length = ExperimentLength;
          experiment.interval = MeasureInterval;

          context.commit("setExperiment", experiment);
          resolve("Podatki posodobljeni.");
        })
        .catch(error => {
          reject("Podatkov ni uspelo posodobiti.")
        });
    });
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
<template>
  <q-page class="bg-grey-3 q-px-sm q-pt-sm">
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="row">
          <div class="col-10 q-mt-xs">Splošni podatki.</div>
          <div class="col-1 q-pl-sm">
            <q-btn
              v-if="!exp.end"
              outline
              text-color="primary"
              size="0.5rem"
              icon="cancel"
              @click="end()"
            ></q-btn>
          </div>
        </div>
        <q-separator class="q-mt-sm q-mb-xs bg-black full-width"></q-separator>
        <div class="text-bold" style="font-size: 1.2222rem">{{ exp.name }}</div>
        <div class="row">{{ exp.desc }}</div>
        <div class="row q-mt-md">Začetek: {{ exp.start }}</div>
        <div class="row">Konec: {{ exp.end || "/" }}</div>
        <div class="row q-mt-md">{{ ExperimentLength }}</div>
        <div class="row">{{ MeasureInterval }}</div>
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section>
        <div class="row">
          Grafi.
        </div>
        <q-separator class="q-mt-sm q-mb-xs bg-black full-width"></q-separator>
        <q-btn
          v-if="exp.t"
          class="q-ma-sm full-width"
          color="primary"
          icon="bar_chart"
          label="temperatura"
          @click="openChart('Temperatura')"
        />
        <q-btn
          v-if="exp.rh"
          class="q-ma-sm full-width"
          color="primary"
          icon="bar_chart"
          label="vlaga"
          @click="openChart('Vlaga')"
        />
        <q-btn
          v-if="co2"
          class="q-ma-sm full-width"
          color="primary"
          icon="bar_chart"
          label="ogljikov dioksid"
          @click="openChart('Ogljikov dioksid')"
        />
        <q-btn
          v-if="o2"
          class="q-ma-sm full-width"
          color="primary"
          icon="bar_chart"
          label="kisik"
          @click="openChart('Kisik')"
        />
        <q-btn
          v-if="c2h4"
          class="q-ma-sm full-width"
          color="primary"
          icon="bar_chart"
          label="etilen"
          @click="openChart('Etilen')"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "Experiment",
  data() {
    return {
      co2: false,
      o2: false,
      c2h4: false,
      rh: false,
      t: false,
      exp: undefined,
      MeasureInterval: "",
      ExperimentLength: ""
    };
  },
  created() {
    this.exp = this.$route.params.experiment;
    this.getData();

    this.$nextTick(() => {
      window.screen.orientation
        .lock("portrait")
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    });
  },
  methods: {
    end() {
      this.$axios
        .get("/getData", {
          params: { endExp: "true" }
        })
        .then(response => {
          console.log(response);
          this.getData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    getData() {
      this.$axios
        .get("/getInfo", {
          params: { expID: this.$route.params.experiment }
        })
        .then(response => {
          var Data = response.data[0];
          console.log(Data);
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

          this.MeasureInterval = "Meritev opravljena na ";

          if (experiment.intD > 2 || experiment.intD == 0) {
            this.MeasureInterval += experiment.intD + " dni ";
          } else if (experiment.intD == 2) {
            this.MeasureInterval += experiment.intD + " dneva ";
          } else {
            this.MeasureInterval += experiment.intD + " dan ";
          }

          if (experiment.intH > 2 || experiment.intH == 0) {
            this.MeasureInterval += experiment.intH + " ur ";
          } else if (experiment.intH == 2) {
            this.MeasureInterval += experiment.intH + " uri ";
          } else {
            this.MeasureInterval += experiment.intH + " uro ";
          }

          if (experiment.intM > 2 || experiment.intM == 0) {
            this.MeasureInterval += experiment.intM + " minut.";
          } else if (experiment.intM == 2) {
            this.MeasureInterval += experiment.intM + " minuti.";
          } else {
            this.MeasureInterval += experiment.intM + " minuto.";
          }

          experiment.lengthD = Data.length.split(":")[0];
          experiment.lengthH = Data.length.split(":")[1];
          experiment.lengthM = Data.length.split(":")[2];

          this.ExperimentLength = "Trajanje ";

          if (experiment.lengthD > 2 || experiment.lengthD == 0) {
            this.ExperimentLength += experiment.lengthD + " dni ";
          } else if (experiment.lengthD == 2) {
            this.ExperimentLength += experiment.lengthD + " dneva ";
          } else {
            this.ExperimentLength += experiment.lengthD + " dan ";
          }

          if (experiment.lengthH > 2 || experiment.lengthH == 0) {
            this.ExperimentLength += experiment.lengthH + " ur ";
          } else if (experiment.lengthH == 2) {
            this.ExperimentLength += experiment.lengthH + " uri ";
          } else {
            this.ExperimentLength += experiment.lengthH + " uro ";
          }

          if (experiment.lengthM > 2 || experiment.lengthM == 0) {
            this.ExperimentLength += experiment.lengthM + " minut.";
          } else if (experiment.lengthM == 2) {
            this.ExperimentLength += experiment.lengthM + " minuti.";
          } else {
            this.ExperimentLength += experiment.lengthM + " minuto.";
          }
          experiment.length = this.ExperimentLength;
          experiment.interval = this.MeasureInterval;
          7;

          this.exp = experiment;
          this.$store.commit("SelectedExp/setExperiment", this.exp);
        })
        .catch(error => {
          console.log(error);
        });
    },
    openChart(title) {
      this.$store.commit("SelectedExp/setTitle", title);
      this.$router.push("/chart");
    }
  }
};
</script>

<style lang="sass" scoped></style>

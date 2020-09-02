<template>
  <q-page class="bg-grey-3 q-px-sm q-pt-sm">
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="row">
          <div class="col-11 q-mt-xs">Splošni podatki.</div>
          <div class="col-1">
            <q-btn
              class="float-right"
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
        <div class="row q-mt-md">{{ exp.length }}</div>
        <div class="row">{{ exp.interval }}</div>
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
          style="pointer-events: none"
          class="q-ma-sm full-width"
          v-bind:class="{ primary: isT }"
          color="negative"
          icon="bar_chart"
          label="temperatura"
          @click="openChart('Temperatura','T')"
        />
        <q-btn
          v-if="exp.rh"
          style="pointer-events: none"
          class="q-ma-sm full-width"
          v-bind:class="{ primary: isRH }"
          color="negative"
          icon="bar_chart"
          label="vlaga"
          @click="openChart('Vlaga','RH')"
        />
        <q-btn
          v-if="exp.S1"
          style="pointer-events: none"
          class="q-ma-sm full-width"
          v-bind:class="{ primary: isS1 }"
          color="negative"
          icon="bar_chart"
          :label="exp.S1"
          @click="openChart(exp.S1,'S1')"
        />
        <q-btn
          v-if="exp.S2"
          style="pointer-events: none"
          class="q-ma-sm full-width"
          v-bind:class="{ primary: isS2 }"
          color="negative"
          icon="bar_chart"
          :label="exp.S2"
          @click="openChart(exp.S2,'S2')"
        />
        <q-btn
          v-if="exp.S3"
          style="pointer-events: none"
          class="q-ma-sm full-width"
          v-bind:class="{ primary: isS3 }"
          color="negative"
          icon="bar_chart"
          :label="exp.S3"
          @click="openChart(exp.S3,'S3')"
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
      isRH: 1,
      isT: 1,
      isS1: 1,
      isS2: 1,
      isS3: 1,
    };
  },
  created() {
    this.getData();

    this.$store.dispatch("SelectedExp/fetchGraph",this.$route.params.experiment);
    this.$nextTick(() => {
      this.$axios
        .get(`isData?expID=${this.$route.params.experiment}`)
        .then(response => {
          if(response.data[0].isRH){
            this.isRH = response.data[0].isRH;
          }else{
            this.isRH = 0;
          }

          if(response.data[0].isT){
            this.isT = response.data[0].isT;
          }else{
            this.isT = 0;
          }

          if(response.data[0].isS1){
            this.isS1 = response.data[0].isS1;
          }else{
            this.isS1 = 0;
          }

          if(response.data[0].isS2){
            this.isS2 = response.data[0].isS2;
          }else{
            this.isS2 = 0;
          }

          if(response.data[0].isS3){
            this.isS3 = response.data[0].isS3;
          }else{
            this.isS3 = 0;
          }
        })
        .catch(err => {
          console.log(err);
        });

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
  computed: {
    exp: {
      get() {
        return this.$store.state.SelectedExp.Exp;
      }
    }
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
    notification(message, color) {
      if (this.$q.platform.is.desktop) {
        this.$q.notify({
          message: message,
          color: color,
          position: "top"
        });
      } else {
        this.$q.notify({
          message: message,
          color: color
        });
      }
    },
    getData() {
      this.$store
        .dispatch("SelectedExp/fetchData", this.$route.params.experiment)
        .catch(error => {
          this.notification("Napaka pri pridobivanju podatkov.", "negative");
        });
    },
    openChart(title,info) {
      this.$store.commit("SelectedExp/setTitle", title);
      this.$router.push({name: "chart", params:{"info":info, "experiment":this.$route.params.experiment}});
    }
  }
};
</script>

<style lang="sass">
.primary
  background-color: $primary !important
  pointer-events: auto !important
</style>

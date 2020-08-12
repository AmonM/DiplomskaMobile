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
          v-if="exp.co2"
          class="q-ma-sm full-width"
          color="primary"
          icon="bar_chart"
          label="ogljikov dioksid"
          @click="openChart('Ogljikov dioksid')"
        />
        <q-btn
          v-if="exp.o2"
          class="q-ma-sm full-width"
          color="primary"
          icon="bar_chart"
          label="kisik"
          @click="openChart('Kisik')"
        />
        <q-btn
          v-if="exp.c2h4"
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
    };
  },
  created() {
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
  computed:{
    exp:{
      get(){
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
    notification(message, color){
    if(this.$q.platform.is.desktop){
      this.$q.notify({
        message: message,
        color: color,
        position: "top"
      })
    }else{
      this.$q.notify({
        message: message,
        color: color
      })
    }
    },
    getData() {
      this.$store.dispatch("SelectedExp/fetchData",this.$route.params.experiment).catch(error =>{
        this.notification("Napaka pri pridobivanju podatkov.", negative);
      })
    },
    openChart(title) {
      this.$store.commit("SelectedExp/setTitle", title);
      this.$router.push("/chart");
    }
  }
};
</script>
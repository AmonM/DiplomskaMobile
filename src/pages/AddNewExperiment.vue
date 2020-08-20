<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md">
      <div class="row text">
        <q-select
          v-model="selectedDevice"
          @input="setSelectedDevice()"
          :options="devices"
          label="Izberi napravo"
          class="full-width"
          outlined
        />
      </div>
      <div class="text-center row">
        <used-sensor-notif
          v-for="(senzor, index) in selectedDeviceObj"
          :key="index"
          :sensor="senzor.name"
          :on="senzor.on"
        />
      </div>
      <div class="row text">
        Naslov poskusa
        <q-input v-model="exTitle" dense class="full-width" outlined></q-input>
      </div>
      <div class="row text">
        Opis poskusa
        <q-input
          v-model="exDesc"
          dense
          type="textarea"
          class="full-width"
          outlined
        ></q-input>
      </div>
      <br />
      <div class="text col-12 text-center text">Interval meritev</div>
      <div class="row text">
        Ure: {{ intervalH }}
        <q-slider v-model="intervalH" :min="0" :max="3"></q-slider>
      </div>
      <div class="row text">
        Minute: {{ intervalM }}
        <q-slider v-model="intervalM" :min="0" :max="59"></q-slider>
      </div>
      <br />
      <div class="text col-12 text-center text">Trajanje poskusa</div>
      <div class="row text">
        Dnevi: {{ lengthD }}
        <q-slider v-model="lengthD" :min="0" :max="29"></q-slider>
      </div>
      <div class="row text">
        Ure: {{ lengthH }}
        <q-slider v-model="lengthH" :min="0" :max="23"></q-slider>
      </div>
      <div class="row text">
        Minute: {{ lengthM }}
        <q-slider v-model="lengthM" :min="0" :max="59"></q-slider>
      </div>
      <br />
      <div class="text col-12 text-center text">Vrednosti, ki nas zanimajo</div>
      <div class="row">
        <div class="col-4">
          <q-toggle v-model="co2" label="Co2" />
          <q-toggle v-model="c2h4" label="C2H4" />
        </div>
        <div class="col-4">
          <q-toggle v-model="o2" label="o2" />
          <q-toggle v-model="rh" label="R" />
        </div>
        <div class="col-4">
          <q-toggle v-model="t" label="TH" />
        </div>
      </div>
      <div class="row col-12">
        <q-btn color="primary" class="full-width" label="Ustvari poskus" @click="createExp()" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "AddNewExperiment",
  components: {
    UsedSensorNotif: () => import("../components/UsedSensorNotif")
  },
  data() {
    return {
      selectedDevice: "",
      intervalH: 0,
      intervalM: 1,
      lengthD: 1,
      lengthH: 0,
      lengthM: 30,
      exTitle: "",
      exDesc: "",
      co2: false,
      c2h4: false,
      o2: false,
      rh: false,
      t: false
    };
  },
  created() {
    this.$store.dispatch("Devices/fetchDevices");
  },
  methods: {
    setSelectedDevice(){
      this.$store.dispatch("Devices/setSelectedDev", this.selectedDevice);
    },
    createExp(){
      var data = {
        "expName":this.exTitle,
        "expDesc":this.exDesc,
        "length":this.lengthD+":"+this.lengthH+":"+this.lengthM,
        "interval":"0:"+this.intervalH+":"+this.intervalM,
        "co2":this.co2,
        "o2":this.o2,
        "c2h4":this.c2h4,
        "rh":this.rh,
        "t":this.t 
      }

      console.log(data)
      console.log(JSON.stringify(data))
      this.$axios.post("/new-experiment",
      JSON.stringify(data)).then((response) => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  computed: {
    devices() {
      return this.$store.state.Devices.devices.map(value => {
        return value.serialNo;
      });
    },
    selectedDeviceObj() {
      if (this.selectedDevice) {
        console.log(
          this.$store.state.Devices.devices.filter(value => {
            if (value.serialNo == this.selectedDevice) return value;
          })[0].sensors
        );
        return this.$store.state.Devices.devices.filter(value => {
          if (value.serialNo == this.selectedDevice) return value;
        })[0].sensors;
      } else {
        {
        }
      }
    }
  }
};
</script>

<style lang="sass">
.text
    font-size: 1.1111rem
</style>

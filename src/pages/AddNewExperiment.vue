<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md">
      <div class="row text">
        <q-select
          v-model="selectedDevice"
          @input="setSelectedDevice()"
          :options="devices"
          label="Pregled naprav"
          class="full-width"
          outlined
          hide-dropdown-icon
        >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
        </q-select>
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
        <q-input ref="title" v-model="exTitle" dense class="full-width" outlined :rules="[val => !!val || 'Polje je obvezno!']"></q-input>
      </div>
      <div class="row text">
        Opis poskusa
        <q-input
          ref="desc"
          v-model="exDesc"
          dense
          type="textarea"
          class="full-width"
          outlined
          :rules="[val => !!val || 'Polje je obvezno!']"
        ></q-input>
      </div>
      <br />
      <div class="text col-12 text-center text">Interval meritev</div>
      <div class="row text justify-center
Justify Content">
        Na {{ intervalM }} min.
        <q-slider v-model="intervalM" :min="1" :max="59"></q-slider>
      </div>
      <br />
      <div class="text col-12 text-center text">Vrednosti, ki nas zanimajo</div>
      <div class="row justify-center">
        <div class="col-4">
          <q-toggle size="4rem" v-model="S1" label="S1" />
          <q-toggle size="4rem" v-model="S2" label="S2" />
        </div>
        <div class="col-4">
          <q-toggle size="4rem" v-model="S3" label="S3" />
          <q-toggle size="4rem" v-model="DHT" label="DHT" />
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
      intervalM: 1,
      exTitle: "",
      exDesc: "",
      S1: false,
      S2: false,
      S3: false,
      DHT: false
    };
  },
  created() {
    this.$store.dispatch("Devices/fetchDevices");
  },
  methods: {
    setSelectedDevice(){
      this.$store.dispatch("Devices/setSelectedDev", this.selectedDevice);
    },
    requiredField(field){
      if(field == "toggle"){
        this.$q.notify({
          message: "Izbran mora biti vsaj 1 senzor.",
          color: "negative"
        })
      }else{
        this.$q.notify({
          message: "Polje \""+field+"\" ne sme ostati prazno.",
          color: "negative"
        })
      }
    },
    createExp(){
      console.log(this.$refs)
      if(!this.$refs.title.validate()){
        this.requiredField("Naslov poskusa");
        return;
      }

      if(!this.$refs.desc.validate()){
        this.requiredField("Opis poskusa");
        return;
      }

      if(!this.S3 && !this.S2 && !this.S1 && !this.DHT){
        this.requiredField("toggle");
        return;
      }

      var interval = "";

      if(this.intervalM < 10){
        interval = "0"+String(this.intervalM);
      }else{
        interval = this.intervalM;
      }
      return;
      var data = {
        "expName":this.exTitle,
        "expDesc":this.exDesc,
        "interval": interval,
        "S3":this.S3,
        "S2":this.S2,
        "S1":this.S1,
        "DHT":this.DHT
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

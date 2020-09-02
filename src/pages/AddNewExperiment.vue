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
        <q-toggle size="4rem" v-model="DHT" label="DHT" />
      </div>
      <div class="row">
        <q-input :readonly="!S1"  ref="S1i" label="Senzor na S1" v-model="S1Name" @input="val => { S1Name = val.toUpperCase() }" dense class="col-6 q-py-md" outlined :rules="[val => S1rules(val)]"></q-input>
        <q-toggle class="col-3" size="4rem" v-model="S1" label="S1" @input="S1Name = ''; change = true; $refs.S1i.resetValidation(); " />
      </div>
      <div class="row col-12">
        <q-input :readonly="!S2" ref="S2i" label="Senzor na S2" v-model="S2Name" @input="val => { S2Name = val.toUpperCase() }" dense class="col-6 q-py-md" outlined :rules="[val => S2rules(val)]"></q-input>
        <q-toggle class="col-3" size="4rem" v-model="S2" label="S2" @input="S2Name = ''; change = true; $refs.S2i.resetValidation(); " />
      </div>
      <div class="row col-12">
        <q-input :readonly="!S3" ref="S3i"label="Senzor na S3" v-model="S3Name" @input="val => { S3Name = val.toUpperCase() }" dense class="col-6 q-py-md" outlined :rules="[val => S3rules(val)]"></q-input>
        <q-toggle size="4rem" v-model="S3" label="S3" @input="S3Name = ''; change = true; $refs.S3i.resetValidation();" />
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
      change: false,
      selectedDevice: "",
      intervalM: 1,
      exTitle: "",
      exDesc: "",
      S1: false,
      S2: false,
      S3: false,
      DHT: false,
      S1Name: "",
      S2Name: "",
      S3Name: "",
    };
  },
  created() {
    this.$store.dispatch("Devices/fetchDevices");
  },
  methods: {
    S1rules(val) {
      // simulating a delay
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if(this.S1 && !val){
            resolve("Polje je obvezno.")
          }else{
            resolve(true)
          }
        }, 250)
      })
    },
    S2rules(val) {
      // simulating a delay
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if(this.S2 && !val){
            resolve("Polje je obvezno.")
          }else{
            resolve(true)
          }
        }, 250)
      })
    },
    S3rules(val) {
      // simulating a delay
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if(this.S3 && !val){
            resolve("Polje je obvezno.")
          }else{
            resolve(true)
          }
        }, 250)
      })
    },
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

      if(this.S1 && !this.$refs.S1i.validate()){
        this.requiredField("Senzor na S1");
        return;
      }


      if(this.S2 && !this.$refs.S2i.validate()){
        this.requiredField("Senzor na S2");
        return;
      }

      if(this.S3 && !this.$refs.S3i.validate()){
        this.requiredField("Senzor na S3");
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

      var S1 = null, S2 = null, S3 = null;

      if(this.S3Name)
        S3 = this.S3Name

      if(this.S2Name)
        S2 = this.S2Name
      
      if(this.S1Name)
        S1 = this.S1Name

      var data = {
        "expName":this.exTitle,
        "expDesc":this.exDesc,
        "interval": interval,
        "S3":S3,
        "S2":S2,
        "S1":S1,
        "DHT":this.DHT
      }

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

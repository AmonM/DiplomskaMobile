<template>
    <q-page class="q-col-gutter-md q-pa-md">
        <div class="q-gutter-md">
            <div class="row">Naslov poskusa
                <q-input dense class="full-width" outlined></q-input>
            </div>
            <div class="row">Opis poskusa
                <q-input dense type="textarea" class="full-width" outlined></q-input>
            </div>
            <div class="row">
                <q-separator size="0.08rem" color="blue"/>
            </div>
            <div class="row text" >Interval meritev {{ intervalH+":"+intervalM }}.</div>
            <div class="row text">
                Ure: {{ intervalH }}
                <q-slider v-model="intervalH" :min="0" :max="3"></q-slider>
            </div>
            <div class="row text">
                Minute: {{ intervalM }}
                <q-slider v-model="intervalM" :min="0" :max="59"></q-slider>
            </div>
            <div class="row">
                <q-separator size="0.08rem" color="blue"/>
            </div>
            <div class="row text" >Trajanje poskusa {{ lengthD+"-"+lengthH+":"+lengthM }}.</div>
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
        </div>
    </q-page>
</template>

<script>
export default {
    name: "AddNewExperiment",
    data(){
        return{
            intervalH: 0,
            intervalM: 1,
            lengthD: 1,
            lengthH: 0,
            lengthM: 30,
            text: "Ta stran.. je fantastična."
        }
    },
    methods:{
        
    }
}
</script>

<style lang="sass">
.text
    font-size: 1.1111rem
</style>
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
            ></q-btn>
          </div>
        </div>
        <q-separator class="q-mt-sm q-mb-xs bg-black full-width"></q-separator>
        <div class="text-bold" style="font-size: 1.2222rem">{{ exp.name }}</div>
        <div class="fixed-top-right">nekaj</div>
        <div class="row">{{ exp.desc }}</div>
        <div class="row q-mt-md">Začetek: {{ exp.start }}</div>
        <div class="row">Konec: {{ exp.end || "/" }}</div>
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section>
        <div class="row">
          Grafi.
        </div>
        <q-separator class="q-mt-sm q-mb-xs bg-black full-width"></q-separator>
        <q-btn
          class="q-ma-sm full-width"
          color="primary"
          icon-right="bar_chart"
          label="temperatura"
        />
        <q-btn
          class="q-ma-sm full-width"
          color="primary"
          icon-right="bar_chart"
          label="vlaga"
        />
        <q-btn
          class="q-ma-sm full-width"
          color="primary"
          icon-right="bar_chart"
          label="ogljikov dioksid"
        />
        <q-btn
          class="q-ma-sm full-width"
          color="primary"
          icon-right="bar_chart"
          label="kisik"
        />
        <q-btn
          class="q-ma-sm full-width"
          color="primary"
          icon-right="bar_chart"
          label="etilen"
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
      exp: undefined
    };
  },
  created() {
    this.exp = this.$route.params.experiment;
  },
  computed: {}
};
</script>

<style lang="sass" scoped></style>

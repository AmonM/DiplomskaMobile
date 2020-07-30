<template>
  <div class="row">
    <q-avatar
      v-if="on"
      color="green"
      text-color="white"
      size="1.2rem"
      font-size="1rem"
      icon="done"
      class="q-mr-xs"
    />
    <q-avatar
      v-else
      color="negative"
      text-color="white"
      size="1.2rem"
      font-size="1rem"
      icon="done"
      class="q-mr-xs"
    />
    <div class="q-pr-sm">{{ sensor }}</div>
  </div>
</template>

<script>
export default {
  name: "UsedSensorNotif",
  props: {
    sensor: { type: String, required: true },
    on: { type: Boolean, required: false, default: false}
  },
  data() {
    return {};
  },
  computed: {
  }
};
</script>

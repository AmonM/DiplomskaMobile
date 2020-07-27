<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    @click="onClick()"
    v-bind:class="{ selected: isSelected }"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'MyMenu',
  props: {
    title: {
      type: String,
      required: true
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    isSelected: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  methods:{
    onClick(){
      console.log(this.$router)
      if(this.$route.path != this.link)
        this.$router.push(this.link);
      this.$emit('click');
    }
  }
}
</script>

<style lang="sass">
.selected
  background-color: $grey-5
</style>

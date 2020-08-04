import Vue from 'vue'
import axios from 'axios'

const base = axios.create({
  baseURL: 'http://192.168.0.8',
  withCredentials: false
})

export default () => {
  Vue.prototype.$axios = base
}

export { base }

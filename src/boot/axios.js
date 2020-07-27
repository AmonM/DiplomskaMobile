import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios.create({
    baseURL: 'http://192.168.0.18',
    withCredentials: false
  })
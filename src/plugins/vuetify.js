import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  theme: {
    primary: '#607d8b',
    secondary: '#673ab7',
    accent: '#ff9800',
    error: '#f44336',
    warning: '#ffeb3b',
    info: '#00bcd4',
    success: '#4caf50'
  }
})

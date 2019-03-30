<template>
  <v-form @submit.prevent='submit'>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6 md6>
          <div class='form-group' :class="{ 'form-group--error': $v.query.$error }">
            <v-text-field
              class='form__input'
              v-model.trim='$v.query.$model'
              placeholder='start by typing in your favorite food item'
              clearable
            ></v-text-field>
          </div>
          <p v-if="submitStatus === 'ERROR'">Please type in a food item</p>
          <p v-if="submitStatus === 'PENDING'">Sending...</p>
          <p v-if="submitStatus === 'OK'">Here are recipes result for food item</p>
        </v-flex>
        <v-btn
          type='submit'
          :disabled="submitStatus === 'PENDING'"
          color="success"
        >Submit</v-btn>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>

import { required } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      query: '',
      submitStatus: null
    }
  },

  validations: {
    query: {
      required
    }
  },

  methods: {
    submit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)
      }
      this.$store.dispatch('callApi', this.query) // this will call the action to get data from api
    }
  }
}
</script>

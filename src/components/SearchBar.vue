<template>
  <v-container>
    <v-form @submit.prevent='search'>
      <v-layout justify-center row wrap>
        <v-flex xs12 sm6 md6>
          <div class='form-group' :class="{ 'form-group--error': $v.query.$error }">
            <v-text-field
              class='form__input'
              v-model.trim='$v.query.$model'
              placeholder='start by typing in your favorite food item'
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
        >Search</v-btn>
      </v-layout>
   </v-form>
  </v-container>
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
    search () {
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

<style>
.v-form {
  padding: 40px 20px;
}
</style>

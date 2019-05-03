<template>
  <v-container>
    <v-form @submit.prevent='search'>
      <v-layout justify-center row wrap>
        <v-flex xs12 sm6>
          <div class='form-group' :class="{ 'form-group--error': $v.query.$error }">
            <v-text-field
              class='form__input'
              v-model.trim='$v.query.$model'
              placeholder='Start by typing in your favorite food item'
              clearable
              solo
              @focus="clearMsg()"
            ></v-text-field>
          </div>
          <p v-if="submitStatus === 'ERROR'" class="ma-0">{{statusMsg}}</p>
          <p v-if="submitStatus === 'PENDING'">{{statusMsg}}</p>
          <p v-if="submitStatus === 'NULL'">{{statusMsg}}</p>
        </v-flex>
        <v-btn
          color="orange darken-2"
          type='submit'
          :disabled="submitStatus === 'PENDING'"
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
      submitStatus: null,
      statusMsg: ''
    }
  },
  validations: {
    query: {
      required
    }
  },
  computed: {
    recipeList () {
      return this.$store.getters.getRecipes
    },
    getApiError () {
      return this.$store.getters.getError
    }
  },
  methods: {
    clearMsg () {
      this.statusMsg = ''
    },
    search () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
        this.statusMsg = 'Please type in a food item'
      } else {
        this.submitStatus = 'PENDING'
        this.statusMsg = 'Sending....'
        this.$store.dispatch('callApi', this.query) // this will call the action to get data from api
          .then(response => {
            if (this.recipeList && this.recipeList.length !== 0) {
              this.submitStatus = 'OK'
            } else {
              this.submitStatus = 'NULL'
              this.statusMsg = 'Sorry no recipe matching search, try again in a few seconds'
              this.$store.dispatch('clearResult')
            }
          })
          .catch(error => {
            this.statusMsg = `Oops.. It seems that there is a problem. Please try again! - ${error}`
          })
      }
    }
  }
}
</script>

<style scoped>
.v-form {
  padding: 40px 20px;
}
</style>

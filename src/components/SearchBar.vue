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
              color="#7A7F80"
            ></v-text-field>
          </div>
          <p v-if="submitStatus === 'ERROR'" class="ma-0">Please type in a food item</p>
          <!-- <p v-if="submitStatus === 'OK'">Here are recipes result for food item</p> -->
          <p v-if="submitStatus === 'PENDING'">Sending...</p>
          <p v-if="submitStatus === 'NULL'">Sorry no recipe matching search, try again</p>
        </v-flex>
        <v-btn
          type='submit'
          :disabled="submitStatus === 'PENDING'"
          color="blue"
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
  computed: {
    recipeList () {
      return this.$store.getters.getRecipes
    }
  },
  // need to set up a promise, to set recipeList to null
  methods: {
    search () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.$store.dispatch('callApi', this.query) // this will call the action to get data from api
        /// Timer for following statements
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          console.log(this.recipeList)
          if (this.recipeList && this.recipeList.length !== 0) {
            this.submitStatus = 'OK'
          } else {
            this.submitStatus = 'NULL'
            this.$store.dispatch('clearResult')
          }
        }, 5000)
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

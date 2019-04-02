<template>
    <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md4>
        <v-card color="purple" dark>
          <v-card-title primary class="title">Filter</v-card-title>
            <input type="checkbox" 
                @click="getFilteredResults"
                v-for="(filterOption, index) in filterOptions"
                :key="index">
          <v-card-text></v-card-text>
        </v-card>
      </v-flex>

</template>

<script>

import NutritionFacts from './NutritionFacts'

export default {
   	components: {
   		NutritionFacts
   	},
	computed: {
		recipeList () {
  			return this.$store.getters.getRecipes
		},
		updateList () {
    		if (this.recipeList !== null) {
        	  let listItems = this.recipeList
        	  let begin = (this.page - 1) * this.numItemPerPage
        	  let end = begin + this.numItemPerPage
        	  return listItems.slice(begin, end)
      		}
	    	return []
	    },
	    getFilteredResults () {
	    	if (this.recipe.dietLabels.indexOf(this.tag) >= 0 ||
	    		this.recipe.healthLabes.indexOf(this.tag) >= 0) {
	    		this.recipe.visible = true
	    	}
	    }
	},
    data () {
        return {
            selectedOption: null
            filterOptions: [
            	“balanced”,
             	“high-protein”,
             	“high-fiber”,
             	“low-fat”,
             	“low-carb”,
             	“low-sodium”,
             	“vegan”,
             	“vegetarian”,
             	“dairy-free”,
             	“low-sugar”,
             	“low-fat-abs”,
             	“sugar-conscious”,
             	“fat free”,
             	“gluten free”,
             	“wheat free”
            ],
            tag: [],
            visible: true
        },
        mounted () {
            this.selectedOption = this.value
        },
        watch: {
            value: function (newValue) {
                this.selectedOption = newValue;
            }
        }
    }

</script>
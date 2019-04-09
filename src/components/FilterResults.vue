<template>
    <v-container fluid grid-list-md>
        <v-layout fixed row wrap>
          <v-flex d-flex xs12 sm6 md4>
            <v-card color="gray" light>
              <v-card-title primary class="title">Filter: </v-card-title>
              <div >
                <v-layout row wrap xs3>
                    <v-flex xs4 v-for="item in filterOptions" :key="item.id">
                        <v-checkbox :id="item.id" v-model="tagged" :value="item.tag" :label="item.tag">
                        </v-checkbox>
                    </v-flex>
                </v-layout>
                <button v-if="tagged.length > 0" @click="this.getFilteredResults()">
                    Apply Filters
                </button>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
    </v-container>

</template>

<script>

// getUpdatedRecipeFilter () {
//     recipeList.filter(recipe => {
//         recipe.dietLabels.includes(tagged) ? true : recipe.healthLabels.includes(tagged) ? true : false
//     })
// }

export default {
	computed: {
		getFilteredResults () {
	    	let filterResults = this.recipeList;

            if (this.tagged.length > 0) {
                filterResults = filterResults.filter(recipe => {
                    return this.tagged.includes(recipe.healthLabels) ? true : this.tagged.includes(recipe.dietLabels) ? true : false
                })
            }
            return filterResults;
	    }
	},
    data: function () {
        return {
        filterOptions: [
                {id: "1", tag: 'balanced', checked: false},
                {id: "2", tag: 'high-protein'},
                {id: "3", tag: 'high-fiber'},
                {id: "4", tag: 'low-fat'},
                {id: "5", tag: 'low-carb'},
                {id: "6", tag: 'low-sodium'},
                {id: "7", tag: 'vegan'},
                {id: "8", tag: 'vegetarian'},
                {id: "9", tag: 'dairy-free'},
                {id: "10", tag: 'low-sugar'},
                {id: "11", tag: 'low-fat-abs'},
                {id: "12", tag: 'sugar-conscious'},
                {id: "13", tag: 'fat free'},
                {id: "14", tag: 'gluten free'},
                {id: "15", tag: 'wheat free'}
        ],
        tagged: []
        }
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
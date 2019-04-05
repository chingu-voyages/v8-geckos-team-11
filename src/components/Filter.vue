<template>
    <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md4>
        <v-card color="gray" dark>
          <v-card-title primary class="title">Filter: </v-card-title>
          <v-content v-for="item in filterOptions" :key="item.id">
            <input type="checkbox" id="item.id" value="item.tag" v-model:"tagged">
          </v-content>
        </v-card>
      </v-flex>
    </v-layout>
    </v-container>

</template>

<script>

export default {
	computed: {
		recipeList () {
  			return this.$store.getters.getRecipes
		},
	    getFilteredResults () {
	    	return this.recipeList.dietLabels.includes(tagged)
	    }
	},
    data: {
        filterOptions: [
                {id: 1, tag: 'balanced', checked: false},
                {id: 2, tag: 'high-protein'},
                {id: 3, tag: 'high-fiber'},
                {id: 4, tag: 'low-fat'},
                {id: 5, tag: 'low-carb'},
                {id: 6, tag: 'low-sodium'},
                {id: 7, tag: 'vegan'},
                {id: 8, tag: 'vegetarian'},
                {id: 9, tag: 'dairy-free'},
                {id: 10, tag: 'low-sugar'},
                {id: 11, tag: 'low-fat-abs'},
                {id: 12, tag: 'sugar-conscious'},
                {id: 13, tag: 'fat free'},
                {id: 14, tag: 'gluten free'},
                {id: 15, tag: 'wheat free'}
        ],
        tagged: []
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
<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <v-toolbar-side-icon class="hidden-md-and-up" @click="$refs.drawer.drawer = !$refs.drawer.drawer"></v-toolbar-side-icon>
        <span @click="reloadPage" class="logo">In The PAN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
<!-- About start -->
      <v-btn flat @click.stop="openAbout">
        <span class="mr-2" >About</span>
      </v-btn>
<!-- About end -->
      <div class="hidden-sm-and-down">
        <ShoppingList/>
      </div>
      <v-btn flat @click.stop="openFaq">
        <span class="mr-2" >FAQ</span>
      </v-btn>
    </v-toolbar>
<!-- Chris has added the two components for the main landing page -->
<!-- Searchbar -->
    <v-content>
      <SearchBar/>
<!-- Search Results -->
      <SearchResults ref="drawer"/>
    </v-content>
<!-- About content start-->
     <v-dialog
      v-model="openAboutDialog"
      fullscreen
      transition="dialog-bottom-transition"
      scrollable
      color="blue"
    >
     <v-card>
       <v-toolbar dark color="primary" card>
          <v-btn icon dark @click="openAboutDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>About</v-toolbar-title>
       </v-toolbar>
       <v-card-text>
         <v-container>
           <v-layout row wrap>
             <v-flex xs12>
               <h2 class="display-2">Welcome</h2>
               <div>
                 <p>In the Pan offers its users a ton of recipe ideas base on a single food item</p>
               </div>
                <v-divider></v-divider>
               <div>
                 <h3>The Community:</h3>
                 <p>Chingu Voyage-8:</p>
               </div>
                <v-divider></v-divider>
               <div>
                 <h3>Special Thanks to:</h3>
                 <p>Edamam: </p>
               </div>
                <v-divider></v-divider>
               <div>
                 <h3>Contributors:</h3>
                 <p>Elizabeth, Alvaro, Chris, Simon</p>
               </div>
             </v-flex>
           </v-layout>
         </v-container>
       </v-card-text>
     </v-card>
    </v-dialog>
<!-- About content end -->
    <v-dialog
      v-model="openFaqDialog"
      fullscreen
      transition="dialog-bottom-transition"
      scrollable
      color="blue"
    >
     <v-card>
       <v-toolbar dark color="primary" card>
          <v-btn icon dark @click="openFaqDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>FAQ</v-toolbar-title>
       </v-toolbar>
       <v-card-text>
         <v-container>
           <v-layout row wrap>
             <v-flex xs12>
               <h2 class="display-2">In the Pan FAQ</h2>
               <div>
                 <p>Here you will find the common answers to top frequently questions</p>
               </div>
             </v-flex>
             <v-flex xs12 v-for="(q, index) in faq.faq" :key="index">
               <h3>{{q.q}}</h3>
               <div>
                 <p>{{q.a}}</p>
               </div>
             </v-flex>
           </v-layout>
         </v-container>
       </v-card-text>
     </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import SearchResults from './components/SearchResults'
import SearchBar from './components/SearchBar'
import ShoppingList from './components/ShoppingList'
import faq from './faq/questions'
export default {
  components: {
    SearchBar,
    SearchResults,
    ShoppingList
  },
  data () {
    return {
      openFaqDialog: false,
      openAboutDialog: false,
      drawer: false,
      faq: faq
    }
  },
  methods: {
    reloadPage () {
      location.reload()
    },
    openFaq () {
      this.openFaqDialog = true
    },
    openAbout () {
      this.openAboutDialog = true
    }
  }
}

</script>
<style>
.logo {
  cursor: pointer;
}
.soft-peach {
  color: #EEDFDE;
}

.fountain-blue {
  color: #65ADB2;
}

.emerald {
  color: #50C878;
}

.falcon {
  color: #6F5659;
}

.steel-gray {
  color: #7A7F80;
}
</style>

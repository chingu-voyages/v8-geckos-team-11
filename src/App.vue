<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <v-toolbar-side-icon class="hidden-md-and-up" @click="$refs.drawer.drawer = !$refs.drawer.drawer"></v-toolbar-side-icon>
        <span @click="reloadPage" class="logo">In The PAN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hidden-sm-and-down">
        <ShoppingList/>
      </div>
      <div class="hidden-sm-and-down">
        <About/>
      </div>
      <!-- <v-btn flat @click.stop="openAbout">
        <span class="mr-2" >About</span>
      </v-btn> -->
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
     <!-- <v-dialog
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
           <v-layout row wrap class='aboutLink'>
             <v-flex xs12>
               <h2 class="display-2">Welcome</h2>
               <div>
                 <p><i>In the Pan</i> is a recipe finder that will help you generate ideas for your next meal.
                   For more information on how to use this application please refer to the FAQ page.</p>
               </div>
                <v-divider></v-divider>
               <div>
                 <h3>The Community</h3>
                 <p>
                   This project was built in part with
                   <a href='https://chingu.io/' target='_blank'>Chingu</a>
                   Voyage-8 cohort
                </p>
               </div>
                <v-divider></v-divider>
               <div>
                 <h3>Special Thanks</h3>
                 <p>The recipe API is provided by
                   <a href='https://developer.edamam.com/' target='_blank'>Edamam</a>
                    and icons provided by
                    <a href='https://origin.fontawesome.com/' target='_blank'>Font Awesome</a>
                  </p>
               </div>
                <v-divider></v-divider>
               <div class='teamMembers'>
                 <h3>The Contributors</h3>
                 <p><i>In the Pan</i> was made with
                  <i class="fas fa-heart"></i> and
                  <i class="fas fa-coffee"></i> by
                  <a href='https://github.com/chingu-voyages/v8-geckos-team-11'>Geckos-Team-11</a>
                  <br>
                  Contributing members are
                  <a href='https://github.com/syaora/' target='_blank'>Elizabeth</a>
                  <a href='https://github.com/gnich12/' target='_blank'>Alvarado</a>
                  <a href='https://github.com/louischrisorona/' target='_blank'>Chris</a>
                  <a href='https://github.com/simonxcode/' target='_blank'>Simon</a>
                 </p>
               </div>
             </v-flex>
           </v-layout>
         </v-container>
       </v-card-text>
     </v-card>
    </v-dialog> -->
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
import About from './components/About'
export default {
  components: {
    SearchBar,
    SearchResults,
    ShoppingList,
    About
  },
  data () {
    return {
      openFaqDialog: false,
      // openAboutDialog: false,
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

.aboutHeadings > h3 {
  padding-top: 25px;
}

.aboutLink h3 {
  padding-top: 25px;
}

.aboutLink a {
  text-decoration: none
}

.teamMembers a {
  padding-right: 5px;
}
</style>

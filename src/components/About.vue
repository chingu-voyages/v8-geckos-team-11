<template>
  <v-dialog
        v-model="openAboutDialog"
        fullscreen
        transition="dialog-bottom-transition"
        scrollable
        color="blue"
      >
      <template v-slot:activator="{ on }">
        <v-btn
          class="aboutDrawer"
          flat
          v-on="on"
        >
        About
        </v-btn>
      </template>
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
                    <a href='https://github.com/gnich12/' target='_blank'>Alvaro</a>
                    <a href='https://github.com/louischrisorona/' target='_blank'>Chris</a>
                    <a href='https://github.com/simonxcode/' target='_blank'>Simon</a>
                  </p>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
      </v-dialog>
</template>
<script>
export default {
  data () {
    return {
      openAboutDialog: false
    }
  }
}
</script>
<style>
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

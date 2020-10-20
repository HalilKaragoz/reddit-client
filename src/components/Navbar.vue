<template>
  <nav>
    <v-snackbar v-model="error" top color="error">
      {{errorMessage}}

      <template v-slot:action="{attrs}">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="closeError"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>


    <v-toolbar class="blue-grey darken-4">
      <v-app-bar-nav-icon app @click="drawer = !drawer" class="grey--text"></v-app-bar-nav-icon>
      <v-app-bar-nav-icon>
            <v-img class="mr-3" src="@/assets/logo.png" width="40px">
            </v-img>
     </v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="mr-1 white--text">A Reddit Client</span>
        <span class="caption">Personalize Reddit</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-navigation-drawer app temporary v-model="drawer" class="grey darken-4" dark>
      <v-layout column justify-center fill-height>
        <v-list>
          <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-layout>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/' },
        { icon: 'mdi-text-box-search-outline', text: 'Search Subreddits', route: '/search-subreddits' }
      ],
      snackbar: false
    }
  },
  computed:{
    error(){
      return this.$store.state.error;
    },
    errorMessage(){
      return this.$store.state.errorMessage;
    }

  },
  methods:{
    closeError(){
      this.$store.state.error = false;
    }
  }
}
</script>

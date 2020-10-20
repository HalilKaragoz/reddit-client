<template>
  <div id="search-sub-reddit">
    <v-container>
      <v-row>
          <v-col
            cols="12"
            sm="8"
          >
            <v-text-field
              v-model="name"
              label="Enter at least three letters to search..."
              v-on:keyup="searchSubreddit"
              required
            ></v-text-field>
          </v-col>
          <v-col class="d-flex align-center"
            cols="12"
            sm="4">
            <v-btn block>
              {{buttonDisplayText}}
            </v-btn>
          </v-col>
      </v-row>
      <v-row dark>
        <v-col>
          <p v-if="noResults">We couldn't find what you were looking for...</p>

          <v-card
            class="mx-auto"
            outlined
            v-for="result in searchResults" :key="result.id"
            >
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">
                  {{result.data.display_name}}
                </v-list-item-title>
                <v-list-item-subtitle>{{result.data.description}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                size="80"
                color="grey"
              >
              <v-img :src="result.data.header_img || '/default.svg'"></v-img>
            </v-list-item-avatar>
            </v-list-item>

            <v-card-actions>
              <v-btn
                v-if="!followed(result.data.display_name)"
                outlined
                rounded
                text
                @click="follow(result.data.display_name)"
              >
                Follow
              </v-btn>
              <v-btn
                v-else
                outlined
                rounded
                color="error"
                @click="unfollow(result.data.display_name)"
              >
                Unfollow
              </v-btn>
            </v-card-actions>
          </v-card>

        </v-col>
      </v-row>
    </v-container>


  </div>
</template>

<script>
export default {
  data(){
    return {
      name: '',
      buttonIdleText: 'Enter Search Text',
      buttonBusyText: 'Searching...',
      buttonDisplayText: '',
      searchResults: [],
      timeout: null,
      error: false,
      noResults: false,
      store: this.$store
    }
  },
  created(){
      this.buttonDisplayText= this.buttonIdleText;
  },
  methods:{
    searchSubreddit: function(){
      if(this.name.length >= 3)
      {
        clearTimeout(this.timeout);
        this.noResults = false;

          this.timeout = setTimeout(() => {

            this.buttonDisplayText = this.buttonBusyText;

            this.$http.get('https://www.reddit.com/subreddits/search.json?q='+this.name).then(
              (response) => {
                this.buttonDisplayText = this.buttonIdleText;
                this.searchResults = response.body.data.children;
                console.log(response)
                if(this.searchResults <= 0)
                {
                  this.noResults = true;
                }

              },
              () => {
                this.buttonDisplayText = this.buttonIdleText;
                  this.$store.commit('setErrorMessage', 'There was an error.')
              }

            );
          }, 1000);
      }
      else {
        this.searchResults = []
        this.noResults = false;
      }
    },

    follow: function(name){
      this.$store.commit('follow', name);
    },
    unfollow: function(name){
      this.$store.commit('unfollow', name);
    },
    followed: function(name){
      return this.store.getters.followsInclude(name);
    }
  },
}
</script>

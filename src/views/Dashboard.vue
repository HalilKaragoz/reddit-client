<template>
  <div class="home">
    <v-container>
      <div class="my-2">
        <span class="text-h3 mr-2">Dashboard</span><span class="subtitle">You are following {{subs.length}} subreddits.</span>
      </div>
      <v-row class="justify-start">
        <v-col class="col-md-6 col-12"
        v-for="sub in subs" :key="sub.title"
        >
          <v-card>

            <v-card-title class="indigo lighten darken-1 mb-2">
              {{sub.name}}
              <v-spacer></v-spacer>
              <v-btn @click="unfollow(sub.name)" text>Unfollow</v-btn>
            </v-card-title>

            <v-list three-line>
              <template v-for="(post, index) in sub.posts" >
                <v-list-item
                  :key="post.data.title"
                  link
                  :href="`/post/${sub.name}/${post.data.id}`"
                >
                  <v-list-item-content>
                    <v-list-item-title v-html="post.data.title"></v-list-item-title>
                    <v-list-item-subtitle v-html="post.data.selftext"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider v-if="index < sub.posts.length-1" :key="index"></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  components: {

  },
  methods:{
    unfollow:function(name){
      this.$store.commit('unfollow', name);
    }
  },
  computed:{
    subs: function(){
      return this.$store.getters.newPostsPerSub;
    }
  }
  ,
  mounted(){
    this.$store.dispatch('loadSubrPosts');
  }
}
</script>

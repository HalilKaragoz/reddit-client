<template>
  <div id="Post">
    <v-container>        
          <v-card
            class="mx-auto"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">
                  {{post_title}}
                </v-list-item-title>
                <v-list-item-subtitle>{{post_body}}</v-list-item-subtitle>
                <a v-if="post_external_url != ''" color="blue" class="text-lowercase"  :href="post_external_url">{{post_external_url}}</a>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
              <v-btn
                outlined
                text
                :href="`https://www.reddit.com/r/${this.sub_name}/comments/${this.post_id}`"
              >
                See the original post here
              </v-btn>
            </v-card-actions>
          </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data(){
    return {
      post_id: this.$route.params.id,
      sub_name: this.$route.params.sub_name,
      post_title: '',
      post_external_url: '',
      post_body: ''
    }
  },
  mounted(){
    console.log(this.post_id);
    
    this.$http.get('https://www.reddit.com/r/'+this.sub_name+'/comments/'+this.post_id+'.json').then(
      (response) => {
        let post_data = response.body[0].data.children[0].data;
        
        this.post_title = post_data.title;
        this.post_body = post_data.selftext;
        this.post_external_url = post_data.url_overridden_by_dest;  
    
      },
      () => {
    
          this.$store.commit('setErrorMessage','Could not find the post...');
      }
    
    );
  }
}
</script>
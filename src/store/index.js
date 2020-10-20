import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex, axios)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  strtict:true,
  plugins: [vuexLocal.plugin],
  state: {
    error: false,
    errorMessage: '',
    followedSubreddits: ['deeplearning'],
    newPostsPerSub: []
  },
  mutations: {
    setErrorMessage(state, message){
      state.errorMessage = message;
      state.error = true;
    },
    follow: function(state, name){
      state.followedSubreddits.push(name);
    },
    unfollow: function(state, name){
      var index = state.followedSubreddits.indexOf(name);
      if(index > -1)
      {
        state.followedSubreddits.splice(index, 1);
      }

      state.newPostsPerSub.forEach((post, index)=>{
        if(post.name == name){
          state.newPostsPerSub.splice(index, 1);
        }
      });
      
      console.log(state.newPostsPerSub);
    },
    pushToPostsPerSub:function(state, object){
      this.state.newPostsPerSub = object;
    }
  },
  getters:{
    followsInclude:(state) => (name) => {
        return state.followedSubreddits.includes(name)
      },
      
    followedSubreddits: function(state){
      return state.followedSubreddits;
    },
    
    newPostsPerSub: function(state){
      return state.newPostsPerSub;
    }
    
  },
  actions: {
    loadSubrPosts(context){
      
      let temp = []

      context.state.followedSubreddits.forEach((name)=>{
        axios.get('https://www.reddit.com/r/'+name+'/new.json?limit=5').then(
            (response)=>{
              temp.push({name: name, posts:response.data.data.children});
              },
            ()=>{
              context.state.errorMessage = 'We ran into an error while fetching your subscriptions...';
              context.state.error = true;
            }
        );
      });
      
      context.commit('pushToPostsPerSub', temp);    
    }
  },
  modules: {
  }
})

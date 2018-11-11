import TodoDataService from "./dataaccess/TodoDataService";
import UserDataService from "./dataaccess/UserDataService";
import TodoStore from "./stores/TodoStore";
import UserStore from "./stores/UserStore";
import TodoContainer from "./components/TodoContainer/TodoContainer.vue";
import Vue from 'vue/dist/vue.js';

(function startApplication(){
    "use strict";

    let userDataService = UserDataService();
    let todoDataService = TodoDataService();
    let userStore = UserStore(userDataService);
    let todoStore = TodoStore(todoDataService, userStore);
    
    let stores = {
      todoStore,
      userStore
    };
  
    function loadStaticData(){
      return Promise.all([userStore.fetch()]);
    }
	
    function mountPage(){ 
      return new Vue({
        el: '#root',
        data : function(){
          return {
            stores
          };
        },
        components : {
          TodoContainer
        }
      });  
    }

    loadStaticData().then(mountPage);
})();
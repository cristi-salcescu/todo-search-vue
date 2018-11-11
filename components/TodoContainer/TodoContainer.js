import TodoSearch from "../TodoSearch/TodoSearch.vue";
import TodoList from "../TodoList/TodoList.vue";

module.exports = {
    props : ["stores"],
    data: function() { 
        return {
          todos : []
        };
    },
    created : function(){
      this.stores.todoStore.onChange(this.reload);
      this.stores.todoStore.fetch();
      this.query = null;
    },
    methods : {
      reload : function(){
        this.todos = this.stores.todoStore.getBy(this.query);
      },
      search : function(query){
        this.query = query;
        this.reload();
      }
    },
    components: {
        TodoSearch,
        TodoList
    }
};
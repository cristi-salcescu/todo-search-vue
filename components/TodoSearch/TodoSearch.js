module.exports = {
    data: function() { 
        return { text : "" };
    },
    methods : {
        search : function(){
            let query = Object.freeze({ text: this.text });
            this.$emit("search", query);
        }
    }
};
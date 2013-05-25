var AppView = Parse.View.extend({

    el: "#app",

    events: {
        'focus input':           'selectedFilter',
        'keyup' :               'filterCollection',
        'click #clearFilter': 'clickedClearFilter'
    },

    initialize: function() {
        $("#info").hide();

        this.seafoodCollectionView = new SeafoodDirectoryView({model: this.collection});

        $("article.info").hide();
        $(".seafood i.chevron").removeClass("icon-chevron-down");
        $(".seafood i.chevron").addClass("icon-chevron-right");
    },

    selectedFilter: function() {
        var filter = this.$el.find("input").val();
        
        if(filter.trim() == "")
        	Parse.history.navigate("listen", true);
        	
    },
    
    clickedClearFilter: function () {
    	Parse.history.navigate("listen", true);
    },

    clearFilter: function() {

        var filter = this.$el.find("input").val("");
        this.$el.find("button").attr("disabled", "disabled");

        if(this.originalSeafoodCollection)
            this.collection.reset(this.originalSeafoodCollection.toJSON());
    },

    filterCollection: function () {
        var filter = this.$el.find("input").val();

        this.$el.find("button").removeAttr("disabled");

        if(!this.originalSeafoodCollection)
            this.originalSeafoodCollection = new SeafoodCollection().reset(this.collection.toJSON())

        if(filter.trim() != "")
            this.collection.reset(this.originalSeafoodCollection.filterByString(filter));
        else
            this.clearFilter();

        if(this.collection.length == 1) {
            this.selectedKey = this.collection.at(0).get("key");
            Parse.history.navigate(this.selectedKey, false);

            this.openSelectedSeafood(false);
        }
    },

    openSelectedSeafood: function(scroll) {

        if(!this.selectedKey)
            return;

        var seafood = this.collection.getByKey(this.selectedKey);

        var seafoodInfoView = new SeafoodInfoView({
            model: seafood
        });

        $el = $(".seafood."+this.selectedKey).parent();

        if($el.children("article.info").length == 0)
            $el.append(seafoodInfoView.render().el);

        $el.children("article.info").show();
        $el.find(".seafood i.chevron").addClass("icon-chevron-down");
        $el.find(".seafood i.chevron").removeClass("icon-chevron-right");


        if(scroll) {

            $('html,body').animate({scrollTop: $el.offset().top});
        }

        this.selectedKey = null;
    }
});
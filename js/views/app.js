var AppView = Parse.View.extend({

    el: "#app",

    events: {
        'keyup' : 'filterCollection'
    },

    initialize: function() {

        $("#main").html('<img id="seafood-spinner" src="img/spinner.gif">');
        $("#main").prepend(new SeafoodDirectoryView({model: this.collection}).el);

        $("article.info").hide();
        $(".seafood i.chevron").removeClass("icon-chevron-down");
        $(".seafood i.chevron").addClass("icon-chevron-right");
    },

    resetFilter: function() {

        if(this.originalSeafoodCollection)
            this.collection.reset(this.originalSeafoodCollection.toJSON());
    },

    filterCollection: function () {
        var filter = this.$el.find("input").val();

        if(!this.originalSeafoodCollection)
            this.originalSeafoodCollection = new SeafoodCollection().reset(this.collection.toJSON())

        if(filter.trim() != "")
            this.collection.reset(this.originalSeafoodCollection.filterByString(filter));
        else
            this.resetFilter();

        if(this.collection.length == 1) {

            this.selectedKey = this.collection.at(0).get("key");
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
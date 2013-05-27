var SeafoodDirectoryView = Parse.View.extend({
    el: "#seafood-collection",

    initialize: function () {
        var self = this;

        _.bindAll(this, 'addSeafoods', 'addOneSeafood', 'resetSeafoods');

        this.collection.bind("add", this.addSeafoods);
        this.collection.bind("reset", this.resetSeafoods);
    },

    addSeafoods: function (seafoods) {
        if(seafoods instanceof Array)
            seafoods.each(this.addOneSeafood);
        else
            this.addOneSeafood(seafoods);

    },

    resetSeafoods: function (newCollection) {
        this.$el.find("ul.nav").html("");
        newCollection.each(this.addOneSeafood);
    },

    addOneSeafood: function (seafood) {
        var seafoodView = new SeafoodListItemView({
            model: seafood
        });
        this.$el.find("ul.nav").append(seafoodView.render().el);
        
        if(seafood.get("key") == this.collection.selectedSeafoodKey)      
        {
            seafoodView.toggleSeafoodInfo();
        	
        	if(this.collection.scrollToSlug)
        		$('html,body').animate({scrollTop: seafoodView.$el.offset().top});
        		
        	this.collection.selectedArticleSlug = null;
        	this.collection.scrollToSlug = null;
        	
        } 
    }
});

var SeafoodListItemView = Parse.View.extend({
    tagName: "li",

    template: _.template($('#seafoodItemTemplate').html()),

    events: {
        "click a.seafood" : "seafoodClicked"
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    
    seafoodClicked: function () {
    
    	this.toggleSeafoodInfo();
    	
		_gaq.push(['_trackEvent', 'Seafoods', 'Open', this.model.get("key")]);
    },

    toggleSeafoodInfo: function () {

        var seafoodView = new SeafoodInfoView({
            model: this.model
        });

		if(this.$el.children("article.info").length == 0)
			this.$el.append(seafoodView.render().el);
		else
			this.$el.children("article.info").toggle();

        if(this.$el.children("article.info")) {
            this.$el.find(".item i.chevron").toggleClass("icon-chevron-down");
            this.$el.find(".item i.chevron").toggleClass("icon-chevron-right");
        }

        if(this.$el.children("article.info").is(":hidden"))
            Parse.history.navigate("listen");
        else
            Parse.history.navigate(this.model.get("key"));
    }
});
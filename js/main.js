$(function() {

    Parse.$ = jQuery;

    Parse.initialize("zdothuhw5y2TiDtKyOb20IHIAcWDIRuZwnCVjHIf", "o4vTVCro9Rwr7RbbKa8FTzVFwBOM1CipFDBBi9C2");

    var Seafood = Parse.Object.extend("Seafood", {

    });

    var SeafoodCollection = Parse.Collection.extend({
        model: Seafood
    });

    var SeafoodView = Parse.View.extend({
        tagName: "li",

        template: _.template($('#seafoodItemTemplate').html()),

        events: {
            "click a" : "viewSeafoodInfo"
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        viewSeafoodInfo: function () {

            var seafoodInfo = new SeafoodInfoView({
                model: this.model
            });

            if(this.$el.children("article.info").length == 0)
                this.$el.append(seafoodInfo.render().el);

            this.$el.children("article.info").toggle();
        }
    });

    var SeafoodInfoView = Parse.View.extend({
        tagName: "article",
        className: "info",

        template: _.template($('#seafoodInfoTemplate').html()),

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

    var SeafoodDirectoryView = Parse.View.extend({
        el: $("#seafood-collection"),

        initialize: function () {
            var self = this;

            _.bindAll(this, 'addOneSeafood', 'addAllSeafoods' );

            this.seafoodCollection = new SeafoodCollection();
            this.seafoodCollection.bind("add", this.addOneSeafood);
            this.seafoodCollection.bind("reset", this.addAllSeafoods);

            this.seafoodCollection.comparator = function(object) {
                return object.get("name");
            };

            this.seafoodCollection.fetch();
        },

        addAllSeafoods: function () {
            this.$el.html("");
            this.seafoodCollection.each(this.addOneSeafood);
        },

        addOneSeafood: function (seafood) {
            var seafoodView = new SeafoodView({
                model: seafood
            });
            this.$el.append(seafoodView.render().el);
        }
    });

    var directory = new SeafoodDirectoryView("test");

});
$(function() {

    Parse.$ = jQuery;

    Parse.initialize("zdothuhw5y2TiDtKyOb20IHIAcWDIRuZwnCVjHIf", "o4vTVCro9Rwr7RbbKa8FTzVFwBOM1CipFDBBi9C2");

    var arter = [
        { name: "Torsk" },
        { name: "Laks" },
        { name: "Sei " },
        { name: "Reker" }
    ];


    var Seafood = Parse.Object.extend("Seafood", {

    });

    var SeafoodCollection = Parse.Collection.extend({
        model: Seafood
    });

    var SeafoodView = Parse.View.extend({
        tagName: "li",
        template: _.template($('#artTemplate').html()),

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var SeafoodDirectoryView = Parse.View.extend({
        el: $("#seafood-collection"),

        initialize: function () {
            _.bindAll(this, 'addOneSeafood', 'addAllSeafoods' );

            this.seafoodCollection = new SeafoodCollection();
            this.seafoodCollection.bind("add", this.addOneSeafood);
            this.seafoodCollection.bind("reset", this.addAllSeafoods);

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

    var directory = new SeafoodDirectoryView();

});
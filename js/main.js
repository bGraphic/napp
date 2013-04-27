
function hideSeafoodCollectionSpinner() {
    $("#seafood-spinner").hide();
}


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
            this.$el.find("i").toggleClass("icon-chevron-down");
            this.$el.find("i").toggleClass("icon-chevron-right");
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

            _.bindAll(this, 'batchRetrieve', 'addSeafoods', 'addOneSeafood', 'resetSeafoods' );

            this.seafoodCollection = new SeafoodCollection();
            this.seafoodCollection.bind("add", this.addSeafoods);
            this.seafoodCollection.bind("reset", this.resetSeafoods);

            this.batchRetrieve(0);

        },

        batchRetrieve: function (startIndex) {
            self = this;
            var limit = 15;

            var query = new Parse.Query(Seafood);
            query.skip(startIndex);
            query.limit(limit);
            query.ascending("name");

            query.find({
                success: function(results) {
                    if(startIndex == 0)
                        self.seafoodCollection.add(results);
                    else
                        self.seafoodCollection.add(results);

                    if(results.length == limit)
                        self.batchRetrieve(startIndex+limit);
                    else
                        hideSeafoodCollectionSpinner();
                },
                error: function(error) {
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        },

        addSeafoods: function (seafoods) {
            if(seafoods instanceof Array)
                seafoods.each(this.addOneSeafood);
            else
                this.addOneSeafood(seafoods);

        },

        resetSeafoods: function () {
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
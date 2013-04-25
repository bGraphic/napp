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

            $("#seafood-info").html("");
            $("#seafood-info").append(seafoodInfo.render().el);

            var scrollTop = $(window).scrollTop();
            var headerHeight = $("#header").height()+
                parseInt($("#header").css("margin-top")) +
                parseInt($("#header").css("margin-bottom")) +
                parseInt($("#header").css("padding-top")) +
                parseInt($("#header").css("padding-bottom"));

            if(scrollTop > headerHeight)
                $("#seafood-info").css("margin-top", (scrollTop-headerHeight+parseInt($("#header").css("margin-bottom")))+"px");
            else
                $("#seafood-info").css("margin-top", 0);

            $("#main-info").hide();

            $("#seafood-info").show();
        }
    });

    var SeafoodInfoView = Parse.View.extend({
        tagName: "article",

        template: _.template($('#seafoodInfoTemplate').html()),

        events: {
            "click button" : "closeSeafoodInfo"
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        closeSeafoodInfo: function () {

            $("#main-info").show();
            $("#seafood-info").hide();
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
$(function() {

    var listInfoGreen = "Disse artene høstes på en bærekraftig måte og kan spises med god samvittighet.";
    var listInfoOrange = "Disse artene høstes stort sett på en bærekraftig måte. Fangstmetoder og områder kan være av betydning for miljøvennlighet.";
    var listInfoRed = "Disse artene er sårbare for populasjonsreduksjoner eller høstes på en lite bærekraftig måte.";

    function hideSeafoodCollectionSpinner() {
        $("#seafood-spinner").hide();
    }

    $('body').popover({
        selector: '[data-toggle="popover"]',
        html: true,
        placement: 'top'
    });

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
            "click a.seafood" : "viewSeafoodInfo"
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

        initialize: function () {
            var self = this;

            _.bindAll(this, 'viewHelpers');

        },

        viewHelpers: function () {
            var name = this.model.get("name");

            var status = this.model.get("status");
            if(status == "green")
                this.model.set("status_text", name + ' er på den <a class="list-info green" data-toggle="popover" title="Grønn liste" data-content="<small></a>' + listInfoGreen + '</small>"> grønne listen.</a>');
            else if (status == "orange")
                this.model.set("status_text", name + ' er på den <a class="list-info orange" data-toggle="popover" title="Orange liste" data-content="<small>' + listInfoOrange + '</small>"> orange listen</a>.');
            else if (status == "red")
                this.model.set("status_text", name + ' er på den <a class="list-info red" data-toggle="popover" title="Rød liste" data-content="<small>' + listInfoRed + '</small>"> røde listen.</a>');
            else
                this.model.set("status_text", "Mangler listeklassifisering " + name);

            var env_status = this.model.get("env_status");
            if(env_status == "smil")
                this.model.set("env_status_text", name + " er et godt klimavalg.");
            else if (env_status == "ok")
                this.model.set("env_status_text", name + " er et ok klimavalg.");
            else if (env_status == "sur")
                this.model.set("env_status_text", name + " er et dårlig klimavalg");
            else
                this.model.set("env_status_text", "Ingen klimainformasjon om " + name);
        },


        render: function () {
            this.viewHelpers();
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
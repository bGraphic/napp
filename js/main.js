var AppRouter = Parse.Router.extend({

    routes: {
        "":                 "seafoodCollection",
        "info":             "info",
        ":seafoodKey":   "seafood"
    },

    initialize: function() {
        this.seafoodCollection = new SeafoodCollection();
        this.appView = new AppView({collection: this.seafoodCollection});
        this.batchRetrieve(0);
    },

    seafoodCollection: function() {
        $("#seafood-collection").show();
        $("#info-page").hide();
    },

    info: function() {
        $("#info-page").show();
        $("#seafood-collection").hide();
    },

    seafood: function(seafoodKey) {

        if(!this.seafoodCollection) {
            this.appView.selectedKey = seafoodKey;
        }
        else  {
            this.appView.selectedKey = seafoodKey;
            this.appView.openSelectedSeafood(false);
        }
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
                else {
                    self.appView.openSelectedSeafood(true);
                    $("#seafood-spinner").remove();
                }
            },
            error: function(error) {
                console.log("Error: " + error.code + " " + error.message);
            }
        });
    }

});


$(function() {
    $('body').popover({
        selector: '[data-toggle="popover"]',
        html: true,
        placement: 'top'
    });

    Parse.$ = jQuery;

    Parse.initialize("zdothuhw5y2TiDtKyOb20IHIAcWDIRuZwnCVjHIf", "o4vTVCro9Rwr7RbbKa8FTzVFwBOM1CipFDBBi9C2");

    var app = new AppRouter();

    Parse.history.start();



});
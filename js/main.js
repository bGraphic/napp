function hideSeafoodCollectionSpinner() {
    $("#seafood-spinner").hide();
}


var Router = Parse.Router.extend({

    routes: {
        "":                 "home",
        ":seafoodKey":   "contact"
    },

    home: function() {
        var directory = new SeafoodDirectoryView();
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

    var router = new Router();
    Parse.history.start();

});
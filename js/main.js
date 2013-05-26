var AppRouter = Parse.Router.extend({

    routes: {
    	"":                       "seafoodCollectionView",
        "listen":                 "seafoodCollectionView",
        "appen":                      "appInfo",
        "klassifisering":           "classInfo",
        "merking":                   "badgeInfo",
        ":seafoodKey":   "seafood"
    },

    initialize: function() {
        this.seafoodCollection = new SeafoodCollection();
        
        var seafoodCollectionView = new SeafoodDirectoryView({
        	collection: this.seafoodCollection}
		);
                
        this.appView = new FilterView({
        	collection: this.seafoodCollection
        });
        
        this.batchRetrieve(0);
    },

    seafoodCollectionView: function() {
        $('[id^="info-"]').hide();
        $("#seafood-collection").show();
    	$("#seafood-collection article.info").hide();    
    	$("#seafood-collection .seafood i.chevron").removeClass("icon-chevron-down");
    	$("#seafood-collection .seafood i.chevron").addClass("icon-chevron-right");
    	
        this.updateNavbar("seafood-collection");
        
        this.appView.clearFilter();
    },
    
    info: function(infoToShow) {
        this.appView.clearFilter();
    
		$("#seafood-collection").hide();
		$('[id^="info-"]').hide();
		$("#"+infoToShow).show();
		
		this.updateNavbar(infoToShow);
    },
    
    updateNavbar: function(activePage) {
    	$(".navbar li").removeClass("active");
    	$(".navbar li."+activePage).addClass("active");
    	
    	if(activePage.indexOf("info") > -1)
    		$(".navbar li.info").addClass("active");
    },
    
    appInfo: function() {
		this.info("info-app");
    },
    
    classInfo: function () {
		this.info("info-class");    	
    },
    
    badgeInfo: function () {
		this.info("info-badges");    	    
    },

    seafood: function(seafoodKey) {
		this.seafoodCollection.selectedSeafoodKey = seafoodKey;
		this.seafoodCollection.scrollToSlug = seafoodKey;
		this.seafoodCollectionView();
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
                    $("#seafood-spinner").hide();
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
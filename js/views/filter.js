var FilterView = Parse.View.extend({

    el: "#filter",

    events: {
        'focus input':           'selectedFilter',
        'keyup' :               'filterCollection',
        'click #clearFilter': 'clickedClearFilter'
    },

    selectedFilter: function() {
        var filter = this.$el.find("input").val();
        
        if(filter.trim() == "")
        	Parse.history.navigate("listen", true);
        	
    },
    
    clickedClearFilter: function () {
    	Parse.history.navigate("listen", true);
    },

    clearFilter: function() {

        var filter = this.$el.find("input").val("");
        this.$el.find("button").attr("disabled", "disabled");

        if(this.originalSeafoodCollection)
            this.collection.reset(this.originalSeafoodCollection.toJSON());
    },

    filterCollection: function () {
        var filter = this.$el.find("input").val();

        this.$el.find("button").removeAttr("disabled");

        if(!this.originalSeafoodCollection)
            this.originalSeafoodCollection = new SeafoodCollection().reset(this.collection.toJSON())

        if(filter.trim() != "")
			var filteredCollection = this.originalSeafoodCollection.filterByString(filter);
			
			console.log(filteredCollection);
			
			if(filteredCollection.length == 1) {
				var selectedSeafoodKey = filteredCollection[0].get("key");
				
				this.collection.selectedSeafoodKey= selectedSeafoodKey;
				this.collection.scrollToSlug = false;
				
//				_gaq.push(['_trackEvent', 'Poison', 'Search', selectedPoisonSlug]);
				
				Parse.history.navigate(selectedSeafoodKey);
			}
			
			if(filteredCollection.length == 0) {
//				_gaq.push(['_trackEvent', 'Poison', 'Search', '_'+filter]);
			}
		
		    this.collection.reset(filteredCollection);
		}
        else
            this.clearFilter();
    },
});
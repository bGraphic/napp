var listInfoGreen = "Disse artene høstes på en bærekraftig måte og kan spises med god samvittighet.";
var listInfoOrange = "Disse artene høstes stort sett på en bærekraftig måte. Fangstmetoder og områder kan være av betydning for miljøvennlighet.";
var listInfoRed = "Disse artene er sårbare for populasjonsreduksjoner eller høstes på en lite bærekraftig måte.";

var SeafoodInfoView = Parse.View.extend({
    tagName: "article",
    className: "info",

    template: _.template($('#seafoodInfoTemplate').html()),

    initialize: function () {
        var self = this;

        _.bindAll(this, 'viewHelpers');

    },

    viewHelpers: function () {
        self = this;

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
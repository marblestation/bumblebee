define([
], function () {

  var actions = {};
  actions.TYPES = {
    DOCUMENTS: 'DOCUMENTS'
  };

  actions.updateDocuments = function (documents) {
    return {
      TYPE: actions.TYPES.DOCUMENTS,
      documents: documents
    };
  };

  actions.displayDocuments = function (apiQuery) {
    return function (dispatch, getState, widget) {
      var bibcode = apiQuery.get('q');
      if (bibcode.length > 0 && bibcode[0].indexOf('bibcode:') > -1) {
        bibcode = bibcode[0].replace('bibcode:', '');
        dispatch(actions.loadBibcodeData(bibcode));
      }
    };
  };

  actions.loadBibcodeData = function (bibcode) {
    return function (dispatch, getState, widget) {
      if (bibcode === widget._bibcode) {
        widget.trigger('page-manager-event', 'widget-ready', { 'isActive': true });
      } else {
        widget._bibcode = bibcode;
        var searchTerm = 'bibcode:' + bibcode;


      }


      if (bibcode === this._bibcode){
        this.trigger('page-manager-event', 'widget-ready', {'isActive': true});
      }
      else {
        this._bibcode = bibcode;
        var searchTerm = "bibcode:" + this._bibcode;
        //abstractPageFields comes from the LinkGenerator Mixin
        this.dispatchRequest(new ApiQuery({
          'q': searchTerm,
          fl : this.requiredFields
        }));
      }
    };
  };

  return actions;
});

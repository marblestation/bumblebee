'use strict';
define([
  'underscore',
  'js/components/api_query',
  'analytics'
], function (_, ApiQuery, analytics) {

  var FIELDS = ['links_data'];

  var actions = {};

  actions.TYPES = {
    RESOURCES: 'RESOURCES',
    'IS_LOADING': 'IS_LOADING'
  };

  actions.updateResources = function (value) {
    return {
      type: actions.TYPES.RESOURCES,
      fullTextSources: value.fullTextSources,
      dataProducts: value.dataProducts
    };
  };

  actions.loading = function () {
    return {
      type: actions.TYPES.IS_LOADING,
      value: true
    }
  };

  actions.loaded = function () {
    return {
      type: actions.TYPES.IS_LOADING,
      value: false
    }
  };

  actions.emitAnalytics = function (text) {
    return function () {
      analytics('send', 'event', 'interaction', 'full-text-link-followed', text);
    }
  };

  /**
   * Get the current query, clean up bibcode and send it off to load
   * the links
   * @param {object} apiQuery
   * @returns {Function}
   */
  actions.displayDocuments = function (apiQuery) {
    return function (dispatch) {
      var bibcode = apiQuery.get('q');
      if (bibcode.length > 0 && bibcode[0].indexOf('bibcode:') > -1) {
        bibcode = bibcode[0].replace('bibcode:', '');
        dispatch(actions.loadBibcodeData(bibcode));
      }
    };
  };

  /**
   * Create query to retrieve the link data
   * @param {String} bibcode
   * @returns {Function}
   */
  actions.loadBibcodeData = function (bibcode) {
    return function (dispatch, getState, widget) {
      if (bibcode === widget._bibcode) {
        widget.trigger('page-manager-event', 'widget-ready', {
          'isActive': true
        });
      } else {
        widget._bibcode = bibcode;
        var searchTerm = 'bibcode:' + bibcode;

        widget.dispatchRequest(new ApiQuery({
          'q': searchTerm,
          fl: FIELDS.join(',')
        }));
      }
    };
  };

  return actions;
});

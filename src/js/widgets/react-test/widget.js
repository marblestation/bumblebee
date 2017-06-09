define([
  'redux',
  'backbone',
  'es6!./view.jsx',
  'underscore',
  'js/widgets/base/base_widget'
], function (Redux, Backbone, View, _, BaseWidget) {

  var action = function (text) {
    return {
      type: 'updateQuery',
      text: text
    }
  };

  var initialState = {
    query: ''
  };
  var app = function (state, action) {
    if (typeof state === 'undefined') {
      return initialState;
    }

    switch(action.type) {
      case 'updateQuery':
        return _.assign({}, state, {
          query: action.query
        });
      default:
        return state;
    }
  };

  var Base = BaseWidget.extend({
    initialize: function (options) {
      this.options = options || {};
      this.view = new View();
      this.store = Redux.createStore(app);
    },
    activate: function (beehive) {
      this.setBeeHive(beehive);
      _.bindAll(this, 'dispatchRequest', 'processResponse');
      this.getPubSub().subscribe(this.getPubSub().INVITING_REQUEST, this.dispatchRequest);
    },
    dispatchRequest: function (apiQuery) {
      //this.store.dispatch(action(apiQuery.get('q')));
    },
    _dispatchRequest: function () {
      console.log('_dispatchRequest', arguments);
    }
  });

  return Base;
});

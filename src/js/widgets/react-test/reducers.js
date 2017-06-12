define([
  'underscore',
  './actions'
], function (_, actions) {

  var initialState = {
    query: ''
  };

  var exports = function (state, action) {
    if (!state) {
      return initialState;
    }

    switch(action.type) {
      case actions.TYPES.QUERY_UPDATE:
        return _.assign({}, state, {
          query: action.query
        });
      default: return state;
    }
  };

  return exports;
});

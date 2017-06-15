define([
  './actions'
], function (actions) {

  var initialState = function () {
    return {
      documents: []
    };
  };

  var exports = function (state, action) {
    var state = state ? state : initialState();

    switch(action.type) {
      case actions.TYPES.DOCUMENTS:
        return Object.assign({}, state, {
          documents: action.documents
        });
      default: return state;
    }
  };

  return exports;
});

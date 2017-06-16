define([
  './actions'
], function (actions) {

  var initialState = function () {
    return {
      dataProducts: [],
      fullTextSources: [],
      isLoading: true
    };
  };

  var exports = function reducers (state, action) {
    var state = state ? state : initialState();

    switch(action.type) {
      case actions.TYPES.DOCUMENTS:
        return Object.assign({}, state, {
          documents: action.documents
        });
      case actions.TYPES.IS_LOADING:
        return Object.assign({}, state, {
          isLoading: action.value
        });
      case actions.TYPES.RESOURCES:
        return Object.assign({}, state, {
          dataProducts: action.dataProducts,
          fullTextSources: action.fullTextSources
        });
      default:
        return state;
    }
  };

  return exports;
});

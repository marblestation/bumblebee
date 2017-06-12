define([

], function () {
  var TYPES = {
    QUERY_UPDATE: 'QUERY_UPDATE'
  };

  var exports = {
    updateQuery: function (text) {
      return {
        type: TYPES.QUERY_UPDATE,
        query: text
      };
    },
    TYPES: TYPES
  };

  return exports;
});

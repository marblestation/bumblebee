define([

], function () {

  var exports = {};
  exports.TYPES = {
    QUERY_UPDATE: 'QUERY_UPDATE',
    ALERT: 'ALERT',
    ALERT_DONE: 'ALERT_DONE'
  };

  exports.updateQuery = function (text) {
    return {
      type: exports.TYPES.QUERY_UPDATE,
      query: text
    };
  };

  exports.alertDone = function () {
    return function (dispatch, getState, widget) {
      setTimeout(function () {
        widget.getPubSub().publish(widget.getPubSub().NAVIGATE, 'index-page');
      }, 1000);
    };
  };

  exports.createAlert = function (msg) {
    return function (dispatch) {
      setTimeout(function () {
        console.log(msg);
        return dispatch(exports.alertDone());
      }, 50);
    }
  };

  return exports;
});

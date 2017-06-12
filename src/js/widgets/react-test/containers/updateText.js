define([
  'react-redux',
  'es6!../components/app.jsx'
], function (ReactRedux, App) {

  var mapStateToProps = function (state) {
    return {
      query: state.query
    };
  };

  var mapDispatchToProps = function (dispatch, ownProps) {

  };

  return ReactRedux.connect(mapStateToProps)(App);
});

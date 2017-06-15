define([
  '../actions',
  'react',
  'react-redux'
], function (actions, React, ReactRedux) {

  var App = React.createClass({
    render: function () {
      return (
        <div></div>
      );
    },
    propTypes: {

    }
  });

  var mapStateToProps = function (state) {
    return {};
  };

  var mapDispatchToProps = function (dispatch) {
    return {};
  }

  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
});

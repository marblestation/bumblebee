define([
  '../actions',
  'react',
  'react-redux'
], function (actions, React, ReactRedux) {

  var App = React.createClass({
    render: function () {
      return (
        <div>
          <h1>
            {this.props.query}
          </h1>
          <button onClick={this.props.alert}>ALERT</button>
        </div>
      );
    },
    propTypes: {
      query: React.PropTypes.string.isRequired,
      alert: React.PropTypes.func
    }
  });

  var mapStateToProps = function (state) {
    return {
      query: state.query
    };
  };

  var mapDispatchToProps = function (dispatch) {
    return {
      alert: function () {
        return dispatch(actions.createAlert('hello'));
      }
    }
  }

  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
});

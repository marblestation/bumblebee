define([
  'react-redux',
  'backbone',
  'react',
  'react-dom'
], function (ReactRedux, Backbone, React, ReactDOM) {

  var Sub = React.createClass({
    render: function () {
      return (
        <div>
        <h1>{query}</h1>
        </div>
      );
    }
  });

  Sub.PropTypes = {
    query: React.PropTypes.string.isRequired
  };

  var Container = ReactRedux.connect(function mapStateToProps(state) {
    return {
      query: state.query
    };
  }, function mapDispatchToProps(dispatch) {}, Sub);


  var View = Backbone.View.extend({
    render: function (store, actions) {
      ReactDOM.render(
        <ReactRedux.Provider store={store}>
          <Container></Container>
        </ReactRedux.Provider>
      , this.el);
      return this;
    }
  });

  return View;
});

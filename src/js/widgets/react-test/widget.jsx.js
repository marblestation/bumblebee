define([
  './actions',
  './initialState',
  'backbone',
  'react',
  'redux',
  'redux-thunk',
  'react-redux',
  'react-dom',
  './reducers',
  'es6!./components/app.jsx',
  'js/widgets/base/base_widget'
], function (
  actions, initialState, Backbone, React, Redux, thunk, ReactRedux, ReactDOM, reducers, App, BaseWidget) {

  var View = Backbone.View.extend({
    initialize: function (options) {
      this.store = options.store;
    },
    render: function () {
      ReactDOM.render(
        <ReactRedux.Provider store={this.store}>
          <App />
        </ReactRedux.Provider>,
        this.el
      );
      return this;
    }
  });

  var Widget = BaseWidget.extend({
    initialize: function (options) {
      this.options = options || {};
      this.store = Redux.createStore(reducers, Redux.applyMiddleware(thunk.default.withExtraArgument(this)));
      this.view = new View({
        store: this.store
      });
    },
    activate: function (beehive) {
      this.setBeeHive(beehive);
      _.bindAll(this, 'dispatchRequest', 'processResponse');
      this.getPubSub().subscribe(this.getPubSub().INVITING_REQUEST, this.dispatchRequest);
    },
    dispatchRequest: function (apiQuery) {
      this.store.dispatch(actions.updateQuery(apiQuery.get('q').join(' ')));
    },
    _dispatchRequest: function () {

    }
  });

  return Widget;
});

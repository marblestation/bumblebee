define([
  './actions',
  'backbone',
  'react',
  'redux',
  'react-redux',
  'react-dom',
  './reducers',
  'es6!./components/app.jsx',
  'js/widgets/base/base_widget'
], function (actions, Backbone, React, Redux, ReactRedux, ReactDOM, reducers, App, BaseWidget) {

  var store = Redux.createStore(reducers);

  var View = Backbone.View.extend({
    render: function () {
      ReactDOM.render(
        <ReactRedux.Provider store={store}>
          <App />
        </ReactRedux.Provider>,
        this.el
      );
      return this;
    }
  });

  var exports = BaseWidget.extend({
    initialize: function (options) {
      this.options = options || {};
      this.store = store;
      this.view = new View();
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

  return exports;
});

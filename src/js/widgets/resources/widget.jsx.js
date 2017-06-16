'use strict';
define([
  'underscore',
  'backbone',
  'react',
  'react-dom',
  'redux',
  'react-redux',
  'redux-thunk',
  'js/widgets/base/base_widget',
  'js/mixins/link_generator_mixin',
  './reducers',
  './actions',
  'es6!./components/app.jsx'
], function (
  _, Backbone, React, ReactDOM, Redux, ReactRedux,
  ReduxThunk, BaseWidget, LinkGenerator, reducers, actions, App) {

  var View = Backbone.View.extend({
    initialize: function (options) {
      _.assign(this, options);
    },
    render: function () {
      ReactDOM.render(
        <ReactRedux.Provider store={this.store}>
          <App/>
        </ReactRedux.Provider>,
        this.el
      );
      return this;
    },
    destroy: function () {
      ReactDOM.unmountComponentAtNode(this.el);
    }
  });

  var Widget = BaseWidget.extend({
    initialize: function (options) {
      this.options = options || {};
      var middleware = Redux.applyMiddleware(
        ReduxThunk.default.withExtraArgument(this));
      this.store = Redux.createStore(reducers, middleware);
      this.view = new View({
        store: this.store
      });
    },
    activate: function (beehive) {
      this.setBeeHive(beehive);
      var pubsub = beehive.getService('PubSub');
      var dispatch = this.store.dispatch;
      _.bindAll(this, ['processResponse']);

      pubsub.subscribe(pubsub.DISPLAY_DOCUMENTS, function (apiQuery) {
        dispatch(actions.displayDocuments(apiQuery));
        dispatch(actions.loading());
      });
      pubsub.subscribe(pubsub.DELIVERING_RESPONSE, this.processResponse);
    },
    processResponse: function (apiResponse) {
      var data = apiResponse.get('response.docs[0]');

      // get the link server info, if exists
      data.link_server = this
        .getBeeHive().getObject('User').getUserData('USER_DATA').link_server;
      data = this.parseResourcesData(data);

      this.store.dispatch(actions.updateResources(data));

      // Turn off the loading icon
      this.store.dispatch(actions.loaded());
    }
  });

  _.extend(Widget.prototype, LinkGenerator);
  return Widget;
});

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
  './actions'
], function (
  _, Backbone, React, ReactDOM, Redux, ReactRedux, ReduxThunk, BaseWidget, LinkGenerator, reducers, actions) {

  var View = Backbone.View.extend({
    initialize: _.partial(_.assign, this),
    render: function () {
      ReactDOM.render(
        <ReactRedux.Provider store={this.store}>
          <App/>
        </ReactRedux.Provider>
      );
      return this;
    }
  });

  var Widget = BaseWidget.extend({
    initialize: function (options) {
      this.options = options || {};
      var middleware = Redux.createMiddleware(ReduxThunk.default.withExtraArgument(this));
      this.store = Redux.createStore(reducers, middleware);
    },
    activate: function (beehive) {
      this.setBeeHive(beehive);
      _.bindAll(this, ['onDisplayDocuments', 'processResponse']);
      var pubsub = beehive.getService('PubSub');

      pubsub.subscribe(pubsub.DISPLAY_DOCUMENTS, _.partial(this.store.dispatch, actions.TYPES.DISPLAY_DOCUMENTS));
    }
  });

  _.extend(Widget.prototype, LinkGenerator);
  return Widget;
});

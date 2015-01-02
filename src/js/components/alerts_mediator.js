/**
 * Service which receives alerts, it can be used by both widgets and
 * trusted components. Its purpose is to communicate to users important
 * messages.
 */

define([
    'underscore',
    'jquery',
    'cache',
    'js/components/generic_module',
    'js/mixins/dependon',
    'js/components/api_feedback',
    'js/mixins/hardened',
    'js/components/alerts'
  ],
  function(
    _,
    $,
    Cache,
    GenericModule,
    Dependon,
    ApiFeedback,
    Hardened,
    Alerts
    ) {

    var AlertsMediator = GenericModule.extend({
      initialize: function(options) {
        _.extend(this, _.pick(options, ['debug', 'widgetName']));
      },

      /**
       * This controller does need elevated beehive
       * and applicaiton
       *
       * @param beehive
       * @param app
       */
      activate: function(beehive, app) {
        this.setBeeHive(beehive);
        this.setApp(app);
        this.setPubSub(beehive);
        var pubsub = this.getPubSub();
        pubsub.subscribe(pubsub.ALERT, _.bind(this.onAlert, this));
        pubsub.subscribe(pubsub.FEEDBACK, _.bind(this.onStartSearch, this));

        var widget = this.getWidget();
        if (!widget) {
          throw new Error('If you want to use AlertController, you also need to have a Widget capable of displaying the messages (default: AlertsWidget)');
        }
      },

      onStartSearch: function(apiFeedback) {
        // reset the widget
        switch(apiFeedback.code) {
          case ApiFeedback.CODES.SEARCH_CYCLE_STARTED:
            this.alert(new ApiFeedback({
              type: Alerts.TYPE.INFO,
              msg: null}));
            break;
        }
      },

      onAlert: function(apiFeedback, psk) {
        var self = this;
        var promise = this.alert(apiFeedback)
          .done(function(result) {

            if (_.isFunction(result)) {
              result();
              return;
            };

            // non-privileged components can reach alerts sending limited
            // definition of actions; we'll turn those into functions/actions

            if (_.isObject(result) && result.action) {
              switch (result.action) {
                case Alerts.ACTION.TRIGGER_FEEDBACK:
                  self.pubsub.publish(self.pubsub.FEEDBACK, new ApiFeedback(result.arguments));
                  break;
                case Alerts.ACTION.CALL_PUBSUB:
                  self.pubsub.publish(result.signal, result.arguments);
                  break;
                default:
                  throw new Exception('Unknow action type:' + result);
              }
            }
          });
        return promise;
      },

      getWidget: function() {
        return this.getApp().getWidget(this.widgetName || 'AlertsWidget');
      },

      alert: function(apiFeedback) {
        var w = this.getWidget();
        if (!w) {
          console.warn('"AlertsWidget" has disappered, we cant display messages to the user');
          var defer = $.Deferred();
          defer.reject('AlertsWidget has disappeared');
          return defer.promise();
        }
        // return promise
        return w.alert(apiFeedback);
      },

      hardenedInterface:  {
        debug: 'state of the alerts',
        getHardenedInstance: 'allow to create clone of the already hardened instance'
      }
    });

    _.extend(AlertsMediator.prototype, Dependon.BeeHive, Dependon.App, Dependon.PubSub);
    _.extend(AlertsMediator.prototype, Hardened);

    return AlertsMediator;
  });
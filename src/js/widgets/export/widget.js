
/*
* for future refrence: a sample request to classic endpoint (handled by proxy api)
* curl -X POST  -H "User-Agent: ADS Script Request Agent" -d 'bibcode=2015IJMPB..2930001X&data_type=BIBTEX&sort=NONE'  http://adsabs.harvard.edu/cgi-bin/nph-abs_connect
* */

define([
    'marionette',
    'js/widgets/base/base_widget',
    'js/components/api_query',
    'hbs!js/widgets/export/templates/export_template',
    'hbs!js/wraps/widget/loading/template',
    'hbs!js/widgets/export/templates/classic_submit_form',
    'js/components/api_feedback',
    'js/components/api_targets',
    'jquery',
    'jquery-ui',
    'module',
    'js/components/api_targets',
    'js/mixins/dependon',
    'clipboard',
    'filesaver'
  ],
  function(
    Marionette,
    BaseWidget,
    ApiQuery,
    WidgetTemplate,
    loadingTemplate,
    ClassicFormTemplate,
    ApiFeedback,
    ApiTargets,
    $,
    $ui,
    WidgetConfig,
    ApiTargets,
    Dependon,
    Clipboard
    ){

    //modified from userChangeRows mixin
    var ExportModel = Backbone.Model.extend({

      initialize : function(){
        this.on("change:numFound", this.updateMax);
        this.on("change:max", this.updateCurrent);
      },

      updateMax : function() {
        var m = _.min([this.get("defaultMax"), this.get("numFound")]);
        this.set("max", m);
      },

      defaults : function(){
        return {
          format: 'bibtex',
          //the actual data
          export: undefined,
          //current system wide query
          query: undefined,
          //something the user needs to know about
          msg: undefined,
          identifiers: [],
          defaultMax: ApiTargets._limits.ExportWidget.limit,
          default: ApiTargets._limits.ExportWidget.default,
          // returned by api_feedback after starting_search_cycle
          numFound : undefined,
          // total currently being shown
          current : undefined,
          // the smaller of either numFound or maxAllowed
          max : undefined,
          //records that user has requested
          userVal: undefined
        }
      },

      reset : function(){
        this.clear({silent : true}).set(this.defaults(), {silent : true});
        this.trigger("change:export");
      }

    });

    var cb;
    
    var ExportView = Marionette.ItemView.extend({

      className : "s-export",

      template: function (data) {
        if (data.loading) {
          return loadingTemplate(_.extend(data, { widgetLoadingSize: 'big' }));
        }
        return WidgetTemplate(data);
      },

      ui :  {
        "triggerDownload" : "#btn-download"
      },

      events: {
        "click @ui.triggerDownload" : "downloadRecords",
        "click .close-widget": "signalCloseWidget",
        "click .submit-rows" : "setUserVal"
      },

      modelEvents: {
        "change:export": 'render',
        'change:error' : 'render'
      },

      setUserVal: function() {
        this.model.set('userVal', _.min([parseInt($(".user-input").val()), this.model.get("max")]));
      },

      contentTypes : {
        endnote : "application/x-endnote-refer",
        bibtex : "application/x-bibtex",
        aastex : "text/plain",
        ris: "text/plain"
      },

      downloadRecords : function(){
        var that = this, type, blob;

        type = this.contentTypes[this.model.get("format")];
        blob = new Blob([this.model.get("export")], {type: type });
        saveAs(blob, this.model.get("format") + "-records.txt");
        this.ui.triggerDownload.html('<i class="fa fa-lg fa-download"></i> Downloaded!');

        setTimeout(function(){
          that.ui.triggerDownload.html('<i class="fa fa-lg fa-download"></i> Download file');
        }, 2000);
      },

      signalCloseWidget: function (ev) {
        ev.preventDefault();
        this.isClosed = true;
        this.trigger('close-widget');
      },

      onDestroy : function () {
        //get rid of clipboard event listener
        if (cb) {
          cb.destroy();
        }
      },

      onRender : function(){
        var that = this;
        this.isClosed = false;
        //this doesn't seem to be working?
        if (cb) cb.destroy();
        //reduce unnecessary work
        if (!that.model.get("export")) return;

        cb = new Clipboard("#btn-copy");

        cb.on('success', function(e) {
          this.$("#btn-copy").html('<i class="fa fa-lg fa-clipboard"></i> Copied!')
          e.clearSelection();
          setTimeout(function(){
            that.$("#btn-copy").html('<i class="fa fa-lg fa-clipboard"></i> Copy to Clipboard')
          }, 800)
        });

        cb.on('error', function  (e){
              //this should only affect safari, execCommand isn't supported
              this.$("#btn-copy").html('<i class="fa fa-lg fa-clipboard"></i> Now press Ctrl+C (or Cmd+C for Mac) to copy');
              setTimeout(function(){
                that.$("#btn-copy").html('<i class="fa fa-lg fa-clipboard"></i> Copy to Clipboard')
              }, 2000);
            }
        );
      },

    });


    var ExportWidget = BaseWidget.extend({

      initialize: function (options) {
        this.model = new ExportModel();
        this.view = new ExportView({model : this.model});
        BaseWidget.prototype.initialize.apply(this, arguments);
      },

      activate: function (beehive) {
        this.setBeeHive(beehive);
        var pubsub = this.getPubSub();

        pubsub.subscribe(pubsub.INVITING_REQUEST, _.bind(this.setCurrentQuery, this));
        this.activateWidget();
        this.attachHandler(ApiFeedback.CODES.API_REQUEST_ERROR, this.onApiRequestFail);
      },

      viewEvents: {
        'export-records': 'renderWidgetForListOfBibcodes',
        'export-query': 'renderWidgetForCurrentQuery',
        'close-widget': 'closeWidget'
      },

      modelEvents : {
        "change:userVal" : "changeRows"
      },

      //query information already exists, user just wants different rows
      changeRows : function () {
        //remove current model's "export" param to indicate we are awaiting data
        this.model.set("export", undefined);

        var q = this.model.get("query");
        q = q.clone();
        q.unlock();
        q.set('rows', this.model.get("userVal"));
        q.set('fl', 'bibcode');
        this.initiateQueryBasedRequest(q)
      },

      /**
       * Export data directly - uses the widget's cached query
       * @param info (object with numFound, and format params)

       */
      renderWidgetForCurrentQuery: function (info) {
        if (this.getState() === 'loading') {
          return;
        }
        try {
          if (!_.isObject(info)) {
            throw new Error('info must be an object!');
          }
          if (!info.format || !info.numFound) {
            throw new Error('info must contain the keys "format" and "numFound" ');
          }
        } catch (e) {
          this.updateState('errored');
        }

        this.model.reset();

        //navigator hands off these values
        this.model.set({
          'query': this.getCurrentQuery(),
          'format': info.format,
          'numFound': info.numFound
        });

        if (this.model.get("numFound") === -1) {
          self.model.set('error', 'Unknown number of results');
        }

        //now initiating request to export api endpoint
        var q = this.model.get("query").clone();
        q.unlock();
        q.set('rows', this.model.get("default"));
        q.set('fl', 'bibcode');

        this.initiateQueryBasedRequest(q);
      },

      /*
      * takes an apiQuery, gets bibcodes, then requests them from
      * the export endpoint
      */
      initiateQueryBasedRequest: function (apiQuery) {
        var self = this;

        if (!apiQuery || !(apiQuery instanceof ApiQuery)) {
          this.updateState('errored');
        }

        var onSuccess = function (apiResponse) {

          // export documents by their ids
          var ids = _.map(apiResponse.get('response.docs'), 'bibcode');

          //tell model how many bibcodes we're planning on showing
          self.model.set("current", ids.length);

          //this will get the exports and register a callback to put them in the model
          self._getExports(self.model.get('format') || 'bibtex', ids);
        };

        var onFailure = function () {
          self.updateState('errored');
        };

        // initiate a request to the api
        try {
          this._executeApiRequest(apiQuery).done(onSuccess).fail(onFailure);
        } catch (e) {
          this.updateState('errored');
        }
      },

      // @param {array} recs
      // @param {object} data
      renderWidgetForListOfBibcodes : function (recs, data) {
        if (this.getState() === 'loading') {
          return;
        }

        try {
          if (!_.isObject(data)) {
            throw new Error('data must be an object!');
          }

          this.model.reset();

          if (!_.isArray(recs)) {
            throw new Error('Identifiers must be an array');
          }
          if (recs.length <= 0) {
            console.warn('Do you want to export nothing? Let me be!');
          }
          if (!data || !data.format) {
            throw new Error('no export format was provided');
          }
        } catch (e) {
          console.error(e);
          this.updateState('errored');
        }

        //classic special case
        if (data.format === "classic"){
          this.openClassicExports({bibcodes : recs, libid: data.libid});
          return;
        }

        this.model.set('current', recs.length);
        this.model.set('format', data.format);
        this.model.set("rows", ApiTargets._limits.ExportWidget.default);

        try {
          this._getExports(data.format, recs);
        } catch (e) {
          this.updateState('errored');
        }
      },

      //special case, will eventually be removed
      openClassicExports : function(options){
        if (options.bibcodes){
           var $form =  $(ClassicFormTemplate({
             bibcodes: options.bibcodes,
             exportLimit : ApiTargets._limits.ExportWidget.limit
           }));
          $form.submit();
        }
        else if (options.currentQuery ) {
          var q = options.currentQuery.clone();
          q.set("rows", this.model.get("defaultMax"));
          q.set("fl", "bibcode");
          this._executeApiRequest(q)
            .done(function(apiResponse) {
              // export documents by their ids
              var ids = _.map(apiResponse.get('response.docs'), function(d) {return d.bibcode});
              var $form =  $(ClassicFormTemplate({ bibcodes: ids, exportLimit: ids.length }));
              //firefox requires form to actually be in the dom when it is submitted
              $("body").append($form);
              $form.submit();
              $form.remove();
            });
        }
        else {
          throw new Error("can't export with no bibcodes or query");
        }

        //finally, close export widget and return to results page

        if (options.libid) {
          // We are in an ADS library: the contents of the library need to stay visible and the highlight
          // has to go back to the "View Library" menu item
          this.getPubSub().publish(this.getPubSub().NAVIGATE, "IndividualLibraryWidget", {subView: "library", id : options.libid});
        } else {
          this.getPubSub().publish(this.getPubSub().NAVIGATE, "results-page");
        }
        //this.getPubSub().publish(this.getPubSub().NAVIGATE, "results-page");
      },

      /**
       * Fetches data from the export api and saves into the model
       *
       * @param identifiers
       * @param format
       * @returns {*}
       * @private
       */
      _getExports : function (format, identifiers) {

        format = format || this.model.get('format') || 'bibtex';

        //export endpoints
        var tbl = {
          endnote: 'endnote',
          aastex: 'aastex',
          bibtex: 'bibtex',
          ris: 'ris'
        };
        format = tbl[format.toLowerCase()] || format.toLowerCase();

        if (!_.isArray(identifiers)) {
          //TODO: handle this
          throw new Error('Identifiers must be an array');
        }
        if (identifiers.length <= 0) {
          //TODO: handle this
          throw new Error('Do you want to export nothing? Let me be!');
        }

        var q = new ApiQuery();
        //export parameter is "bibcode"
        q.set('bibcode', identifiers);
        q.set('sort', 'NONE');

        var req = this.composeRequest(q);
        req.set("target",  ApiTargets.EXPORT + format);

        //use post, although get is also possible
        var reqOptions = {
          type: 'POST',
          contentType : "application/json"
        };

        req.set('options', reqOptions);

        if (req) {
          var pubsub = this.getPubSub();
          pubsub.subscribeOnce(pubsub.DELIVERING_RESPONSE, _.bind(function(exports) {
            if (exports && exports.has('export')) {
              this.model.set('export', exports.get('export'));
              this.updateState('idle');
            } else {
              this.updateState('errored');
              console.error('The export did return some garbage, tfuj!', exports);
            }
          }, this));

          this.updateState('loading');
          pubsub.publish(pubsub.EXECUTE_REQUEST, req);
        }
        else {
          throw new Error('Well, this is unexpected behaviour! Who wrote this software?');
        }
        this.model.set('identifiers', identifiers);
      },

      _executeApiRequest: function (apiQuery) {
        if (!apiQuery) {
          //TODO: handle this
          throw new Error('Damn, and I thought you knew what you do!');
        }

        var $dd = $.Deferred();

        // compose new request from the query
        var req = this.composeRequest(apiQuery);
        if (!req) {
          //TODO: handle this
          throw new Error('something is wrong with the request object');
        }

        this.updateState('loading');
        var pubsub = this.getPubSub();
        pubsub.subscribeOnce(pubsub.DELIVERING_RESPONSE, function () {
          $dd.resolve.apply($dd, arguments);
        });
        pubsub.publish(pubsub.EXECUTE_REQUEST, req);

        return $dd.promise();
      },

      closeWidget: function () {
        this.view.isClosed = true;
        this.getPubSub().publish(this.getPubSub().NAVIGATE, "results-page");
      },

      _showMessageAndClose: function () {
        if (!this.view.isClosed) {
          this.closeWidget();
          var msg = Array.prototype.join.call(arguments, '<br/>');
          var pubsub = this.getPubSub();
          _.delay(function () {
            pubsub.publish(pubsub.ALERT, new ApiFeedback({
              code: 0,
              title: 'Something Went Wrong',
              msg: msg,
              type : 'danger',
              modal: true
            }));
          }, 500);
        }
      },

      onErrored: function () {
        this._showMessageAndClose.apply(this, [
          'The Export Service is not working properly',
          'Please wait a bit and try again, or reload the page'
        ]);
      },

      onStateChange: function (state) {
        this.model.set({ loading: (state === 'loading') });
        this.view.render();
      },

      onApiRequestFail: function () {
        this.updateState('errored');
      }
    });

    _.extend(ExportWidget.prototype, Dependon.BeeHive);
    return ExportWidget;
  });

define({
  core: {
    controllers: {
      FeedbackMediator: 'js/wraps/discovery_mediator',
      QueryMediator: 'js/components/query_mediator',
      Diagnostics: 'js/bugutils/diagnostics',
      AlertsController: 'js/wraps/alerts_mediator',
      Orcid: 'js/modules/orcid/module'
    },
    services: {
      Api: 'js/services/api',
      PubSub: 'js/services/pubsub',
      Navigator: 'js/apps/discovery/navigator',
      PersistentStorage: 'js/services/storage',
      HistoryManager: 'js/components/history_manager'
    },
    objects: {
      User: 'js/components/user',
      Session: 'js/components/session',
      DynamicConfig: 'discovery.vars',
      MasterPageManager: 'js/page_managers/master',
      AppStorage: 'js/components/app_storage',
      RecaptchaManager : 'js/components/recaptcha_manager',
      CSRFManager : "js/components/csrf_manager",
      LibraryController : 'js/components/library_controller',
      DocStashController : 'js/components/doc_stash_controller'
    },
    modules: {
      FacetFactory: 'js/widgets/facet/factory'
    }
  },
  widgets: {
    LandingPage: 'js/wraps/landing_page_manager/landing_page_manager',
    SearchPage: 'js/wraps/results_page_manager',
    DetailsPage: 'js/wraps/abstract_page_manager/abstract_page_manager',
    AuthenticationPage: 'js/wraps/authentication_page_manager',
    SettingsPage: 'js/wraps/user_settings_page_manager/user_page_manager',
    OrcidPage: 'js/wraps/orcid_page_manager/orcid_page_manager',
    OrcidInstructionsPage : 'js/wraps/orcid-instructions-page-manager/manager',

    LibrariesPage: 'js/wraps/libraries_page_manager/libraries_page_manager',
    HomePage: 'js/wraps/home_page_manager/home_page_manager',
    PublicLibrariesPage : 'js/wraps/public_libraries_page_manager/public_libraries_manager',
    ErrorPage : 'js/wraps/error_page_manager/error_page_manager',

    Authentication: 'js/widgets/authentication/widget',
    UserSettings: 'js/widgets/user_settings/widget',
    UserPreferences: 'js/widgets/preferences/widget',
    LibraryImport : 'js/widgets/library_import/widget',
    BreadcrumbsWidget: 'js/widgets/filter_visualizer/widget',
    NavbarWidget: 'js/widgets/navbar/widget',
    UserNavbarWidget: 'js/widgets/user_navbar/widget',
    AlertsWidget: 'js/widgets/alerts/widget',
    ClassicSearchForm: 'js/widgets/classic_form/widget',
    SearchWidget: 'js/widgets/search_bar/search_bar_widget',
    PaperSearchForm:'js/widgets/paper_search_form/widget',
    Results: 'js/widgets/results/widget',
    QueryInfo: 'js/widgets/query_info/query_info_widget',
    QueryDebugInfo: 'js/widgets/api_query/widget',
    ExportWidget  : 'js/widgets/export/widget',
    Sort : 'js/widgets/sort/widget',
    ExportDropdown : 'js/wraps/export_dropdown',
    VisualizationDropdown : 'js/wraps/visualization_dropdown',
    AuthorNetwork : 'js/wraps/author_network',
    PaperNetwork : 'js/wraps/paper_network',
    ConceptCloud : 'js/widgets/wordcloud/widget',
    BubbleChart : 'js/widgets/bubble_chart/widget',

    Metrics :  'js/widgets/metrics/widget',
    CitationHelper: 'js/widgets/citation_helper/widget',
    OrcidBigWidget: 'js/modules/orcid/widget/widget',

    AuthorFacet: 'js/wraps/author_facet',
    BibgroupFacet: 'js/wraps/bibgroup_facet',
    BibstemFacet: 'js/wraps/bibstem_facet',
    DataFacet: 'js/wraps/data_facet',
    DatabaseFacet: 'js/wraps/database_facet',
    GrantsFacet: 'js/wraps/grants_facet',
    KeywordFacet: 'js/wraps/keyword_facet',
    ObjectFacet: 'js/wraps/object_facet',
    RefereedFacet: 'js/wraps/refereed_facet',
    VizierFacet: 'js/wraps/vizier_facet',
    GraphTabs : 'js/wraps/graph_tabs',
    FooterWidget : 'js/widgets/footer/widget',
    PubtypeFacet: 'js/wraps/pubtype_facet',

    ShowAbstract: 'js/widgets/abstract/widget',
    ShowGraphics: 'js/widgets/graphics/widget',
    ShowGraphicsSidebar: 'js/wraps/sidebar-graphics-widget',
    ShowReferences: 'js/wraps/references',
    ShowCitations : 'js/wraps/citations',
    ShowCoreads : 'js/wraps/coreads',
    //can't camel case because router only capitalizes first letter
    ShowTableofcontents : 'js/wraps/table_of_contents',
    ShowResources : 'js/widgets/resources/widget',
    ShowRecommender : 'js/widgets/recommender/widget',
    ShowMetrics: 'js/wraps/paper_metrics',
    ShowPaperExport : 'js/wraps/paper_export',
    ShowLibraryAdd : 'js/wraps/abstract_page_library_add/widget',

    IndividualLibraryWidget : 'js/widgets/library_individual/widget',
    AllLibrariesWidget : 'js/widgets/libraries_all/widget',
    LibraryListWidget : 'js/widgets/library_list/widget'
  },
  plugins: {}
});

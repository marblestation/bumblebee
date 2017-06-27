define([
  "marionette",
  "./footer.html"
], function(
  Marionette,
  FooterTemplate
  ){



  var Footer = Marionette.ItemView.extend({

    template : FooterTemplate,

    className : "footer s-footer"

  })


  return Footer


})

define([
 'react',
 '../containers/updateText'
], function (React, UpdateText) {

  var App = React.createClass({
    render: function () {
      return (
        <h1>
          <UpdateText/>
        </h1>
      );
    },
    PropTypes: {
      query: React.PropTypes.string.isRequired
    }
  });

  return App;
});

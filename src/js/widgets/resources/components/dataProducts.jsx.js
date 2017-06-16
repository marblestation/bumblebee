define([
  'react'
], function (React) {

  /**
   * Create the DataProducts Section
   * @param props
   * @returns {*}
   * @constructor
   */
  function DataProducts(props) {
    var products = props.products;
    if (!products.length) {
      return null;
    }

    var links = products.map(function (product) {
      return (
        <li key={product.title}>
          <a href={product.link} target="_blank">{product.title}</a>
        </li>
      );
    });

    return (
      <div>
        <h3 className="s-right-col-widget-title">
          <i className="icon-data" aria-hidden="true"></i> Data Products
        </h3>
        <ul className="list-unstyled">
          {links}
        </ul>
      </div>
    );
  };

  return DataProducts;
});

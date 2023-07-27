import React from "react";
import axios from "axios";
import {Routes, Route, useNavigate} from 'react-router-dom';

export const AllProducts = () => {
    
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    axios.get('http://localhost:4000/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error.response}</p>;
  //edit buton redirects to edit product page
  const ProductCard = ({ product }) => {
    return (
      <div className="col-md-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{product.productName}</h5>
            <p className="card-text">Description: {product.productDescription}</p>
            <p className="card-text">Category: {product.productCategory.categoryName}</p>
            <p className="card-text">Price: {product.productPrice}$</p>
            <button className = "btn btn-primary action" onClick ={() => navigate('/viewProduct/' + product._id)}>View</button>
            <button className="btn btn-primary action" onClick = {() => navigate('/editProduct/' + product._id)}>Edit</button>
          </div>
        </div>
      </div>
    );
  };

  const ProductList = ({ products }) => {
    return (
      <div className="row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div className="cards-container">
      <ProductList products={products} />
    </div>
  );
};

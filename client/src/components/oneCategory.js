import React from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

export const OneCategory = () => {
    const { id } = useParams();
    const [category, setCategoory] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    React.useEffect(()=>{
       loadCategory();
    }
    , []);
    const loadCategory = async () => {
        await axios.get('http://localhost:4000/categories/' + id)
        .then((response) => {   
            setCategoory(response.data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        });
    }
    if(loading) return <p>Loading...</p>;
    //a table of products of the category
    if(error) return <p>Something went wrong: {error.response}</p>;
    return (
        <div class="container">
        <Link to="/categories" className="btn btn-primary">Back to Categories</Link>
        <div  id="products-table">
            <h3>Category {category.categoryName}</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Description</th>
                        <th>Product Price</th>
                    </tr>
                </thead>
                <tbody>
                    {category.products.map((product) => (
                        <tr >
                            <td>{product.productName}</td>
                            <td>{product.productDescription}</td>
                            <td>{product.productPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    )
}

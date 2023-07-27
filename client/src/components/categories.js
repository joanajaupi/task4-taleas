import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export const Categories = () => {
    const [categories, setCategories] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const loadCategories = async () => {
        await axios.get('http://localhost:4000/categories')
        .then((response) => {
            setCategories(response.data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        });
    }
    React.useEffect( () => {
        loadCategories();
    }
    , []);
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Something went wrong: {error.response}</p>;
    console.log();
    //load data
    
    // on click of the button delete, the category will be deleted from the database
    const handleDeleteCategory = async (id) => {
        await axios.delete('http://localhost:4000/categories/' + id)
        .then((response) => {
            console.log(response.data);
        })
        .then(() => {
            loadCategories();
        })

        .catch((error) => {
            console.log(error);
        });
    }
    
    return (
        //a table to display the categories
        // an autoincrement number placed instead of the id and the name of the category
        //a button to add a new category (circle button with + sign)
    <div>
        
        <div id ="buttons-container">
            <Link to="/addCategory" className="btn btn-primary">Add Category</Link>
            <Link to="/categories" className="btn btn-primary">Go Back</Link>
        </div>
        
        <div className="table-container">
      
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Category Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            
            <tbody>
                
                {categories.map((category) => (
                    // and 3 buttons view products, edit and delete
                    <tr key={category.categoryName}>
                        <td>{category.categoryName}</td>
                        <td>
                            <Link id = "category-action-button" className="btn btn-primary" to={`/viewCategory/${category._id}`}>View Products</Link>
                            <Link id = "category-action-button" className="btn btn-primary" to={`/editCategory/${category._id}`}>Edit</Link>
                            <button id = "category-action-button"
                            className="btn btn-danger"
                            onClick={() => handleDeleteCategory(category._id)}>
                            Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    </div>


    );
}
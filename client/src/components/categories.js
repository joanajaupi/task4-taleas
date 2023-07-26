import React from 'react';
import axios from 'axios';

function Categories(){
    const [categories, setCategories] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        axios.get('http://localhost:4000/categories')
        .then((response) => {
            setCategories(response.data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        });
    }
    , []);
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Something went wrong: {error.response}</p>;
    console.log();

    return (
        //a table to display the categories
        // an autoincrement number placed instead of the id and the name of the category

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
                            <button className="btn btn-primary action">View Products</button>
                            <button className="btn btn-primary action">Edit</button>
                            <button className="btn btn-danger action">Delete</button>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
        </div>

    );
}

export default Categories;

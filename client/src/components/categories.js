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
        <div>
            <h1>Categories</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category._id}>
                        {category.categoryName}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;

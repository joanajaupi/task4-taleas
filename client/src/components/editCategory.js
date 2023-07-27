import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {  useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom';



export const EditCategory = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const loadCategory = async () => {
        await axios.get('http://localhost:4000/categories/' + id)
        .then((response) => {
            setCategory(response.data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        });
    }
    React.useEffect(()=>{
        loadCategory();
    }
    , []);
    const handleCategoryNameChange = (event) => {
        setCategory({...category, categoryName: event.target.value});
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.put('http://localhost:4000/categories/' + id, category)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
        navigate('/categories');
    }

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Something went wrong: {error.response}</p>;
    return (
        <div id="edit-category" className="text-center">
        <h3>Edit Category</h3>
        <div id="edit-form" class="d-inline-block">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Category Name</label>
                <input type="text" className="form-control" value={category.categoryName} onChange={handleCategoryNameChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/categories" className="btn btn-primary">Go Back</Link>
        </form>
    </div>
</div>

    )
}

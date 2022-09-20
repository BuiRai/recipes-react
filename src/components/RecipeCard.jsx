import React from 'react';
import './Home.css'
import { Link } from 'react-router-dom'

function RecipeCard(props) {
    const { recipe } = props;

    return (
        <Link to={`detail/${recipe.id}`} className="card-container" style={{
            backgroundImage: `url(${recipe.image})`
        }}>
            <div className='card-title'>{recipe.title}</div>
            {/* <div className='card-title'>{recipe.title}</div> */}
        </Link>
    );
}

export default RecipeCard;
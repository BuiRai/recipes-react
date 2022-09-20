import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './Home.css'
import RecipeCard from './RecipeCard'
import { useSearchParams } from 'react-router-dom';
import { API_KEY } from '../constants/global';

function Home() {
    const [params] = useSearchParams();

    useEffect(() => {
        const query = params.get('query');
        if (query) {
            setSearch(query);
            fetchData(query).then(res => {
                setData(res.results);
            });
        }
    }, [])

    const fetchData = async (search) => {
        try {
            const res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${search}&&maxFat=25&apiKey=${API_KEY}`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const [search, setSearch] = useState('')
    const [data, setData] = useState([])

    const handleEnter = async (event) => {
        if (search.length < 3) {
            console.log('Search too short');
            return
        }

        if (event.key === 'Enter') {
            console.log('search');
            const data = await fetchData(search);
            setData(data.results || [])
            console.log('🚀 ~ handleEnter ~ data', data)
        }
    }

    return (
        <div className='home-container'>
            <input
                value={search}
                type="text"
                onChange={e => setSearch(e.target.value)}
                onKeyPress={handleEnter}
            />

            <div className="container">
                {data.map((d) => (
                    <RecipeCard key={d.id} recipe={d} />
                ))}
            </div>
        </div>
    );
}

export default Home;

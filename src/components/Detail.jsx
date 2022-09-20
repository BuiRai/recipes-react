import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './Detail.css'
import { API_KEY } from '../constants/global';
import axios from'axios'

const Detail = () => {
    const params = useParams();

    const [data, setData] = useState()

    useEffect(() => {
        const { id } = params;
        const fetchData = async () => {
            const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
            setData(response.data)
        }

        fetchData().catch(console.error);;
    }, [])

    if (!data) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="detail-container">
            <h2>{data.title}</h2>
            <a href={data.sourceUrl}>Go to recipe detail</a>
            <img src={data.image} alt={data.title} />
            { data.vegan ? (<h3>Is vegan</h3>) : (<h3>No vegan</h3>)}
        </div>
    )
}

export default Detail;

import React, { useState } from 'react'
import {v4 as uuid} from 'uuid'
import axios from 'axios'

const useFlip = () => {
    const [start, flipStart] = useState(true);
    const flip = () => {
        flipStart(start => !start)
    }

    return [start,flip]
}

const useAxios = (baseUrl) => {
    const [set, updateSet] = useState([]);
    let response;
    let url = (baseUrl) ? baseUrl : "https://deckofcardsapi.com/api/deck/new/draw/";
    const addToSet = async (name) => {
        if(url === baseUrl){    
            response = await axios.get(`${baseUrl}${name}`)
        } else {
            response = await axios.get(url)
        }
            updateSet(set => [...set, { ...response.data, id: uuid() }]);
        }

    return [set,addToSet]
};


export {useFlip,useAxios} 
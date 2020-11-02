import React, { useEffect, useState } from "react"

import PlaceList from "../components/PlaceList";
import {useParams} from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook"

const DUMMY_PLACES = [
    {
        id: "p1",
        title: "empire state building",
        description: "one of the most famous sky scappers in the world",
        imageUrl:"https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
        address: "Noida",
        location: {
            lat:123,
            lng:13
        },
        creator: "u1"
    },
    {
        id: "p2",
        title: "Noida state building",
        description: "one of the most famous sky scappers in the world",
        imageUrl:"https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
        address: "Noida",
        location: {
            lat:123,
            lng:13
        },
        creator: "u2"
    }
]
const UserPlaces = () => {
    const userId = useParams().userId;
    const {isLoading, error, sendRequest, clearError }  = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState();

    useEffect(() => { 
        const fetchPlaces =  async () => {
            try{
                const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
                setLoadedPlaces(responseData.places);

            }
            catch(err){


            }

        }
        fetchPlaces();
        
        
    },[ sendRequest, userId]);

    
    const loadedPost = DUMMY_PLACES.filter(place => place.creator === userId);
    return <PlaceList items = {loadedPost}/>

}

export default UserPlaces;
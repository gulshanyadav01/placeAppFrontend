import React, { useEffect, useState } from "react"
// import { Router } from "react-router-dom"

import UserList from "../components/UsersList"
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";


const Users = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(() => {
        const sendRequest = async() => {
            setIsLoading(true)
       try {

        const response =   await fetch("http://localhost:5000/api/users/");
        const responseData = await response.json();
        console.log(response);
        setLoadedUsers(responseData.users);
        // console.log(loadedUsers);
        setIsLoading(false);
        if(!response.ok){
            throw new Error(responseData.message)
        }

    }catch(err){
        setIsLoading(false);
        setError(err.message);
    }  
}
        sendRequest();
        
    }, []);

    const errorHandler = () => {

    }
  
    return (
        <React.Fragment>
        <ErrorModal error = {error} onClear = {errorHandler}/>
        {
            isLoading && (
                <div className ="center">
                    <LoadingSpinner/>
                </div>
        )
        }
      { !isLoading && loadedUsers &&  <UserList items = { loadedUsers } />}
       </React.Fragment>
    )
}

export default Users;
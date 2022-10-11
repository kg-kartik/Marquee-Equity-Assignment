import Axios from "axios";
import React, { useEffect } from "react";
import { useState} from "react";

const SearchInput = () => {

    const [searchValue,setSearchValue] = useState("");
    
    const API_URL = "https://cors-anywhere.herokuapp.com/https://www.zaubacorp.com/custom-search";

    const formData = new FormData();

    formData.append("search",searchValue);
    formData.append("filter","company");

    useEffect(() => {

        //debouncing
        //call the api after 400ms of difference between keystroke
        const getData = setTimeout(() => {

            Axios({
                data:formData,
                method:"POST",
                url:API_URL
            })
            .then((data) => {
                console.log(data.data);
            }).catch((err) => {
                console.log(err);
            })

        },400)

        return () => clearTimeout(getData);

    },[searchValue])
    

    return (
        <>
            <input type="text" value={searchValue} 
                onChange={(e) => setSearchValue(e.target.value)} 
            />
        </>
    )

}

export default SearchInput;
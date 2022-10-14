import React from "react";
import Dropdown from "../components/Dropdown";
import {useEffect,useState} from "react"
import Axios from "axios"
// import cheerio from "cheerio";
import { parse } from 'node-html-parser';

const SearchBar = () => {

    const [dropdownValue, setDropdownValue] = useState("");
    const [options,setOptions] = useState([]);
    const [input,setInput] = useState("");

    const handleDropdownValue = (inputValue) => {
        setDropdownValue(inputValue.value);
    }

    const handleInputValueChange = (val) => {
        setInput(val);
    }

    const API_URL = "https://cors-anywhere.herokuapp.com/https://www.zaubacorp.com/custom-search";

    const formData = new FormData();

    formData.append("search",input);
    formData.append("filter","company");

    console.log(options,"options")

    //!todo need to use async slect

    useEffect(() => {

        //debouncing
        //call the api after 400ms of difference between keystroke
        
        if(input !== ""){
            const getData = setTimeout(() => {
    
                Axios({
                    data:formData,
                    method:"POST",
                    url:API_URL
                })
                .then((data) => {
                    console.log(data.data,"data");
                    
                    const root = parse(data.data);

                    root.querySelectorAll('div').forEach(function(elem) {
                        console.log(elem.innerText);  
                    });

                }).catch((err) => {
                    console.log(err);
                })
    
            },400)
    
            return () => clearTimeout(getData);
        }

    },[input])

    return (
        <>
            <p className='list-title'>Search and add Company</p>
            <div className="search-wrapper">
                <Dropdown
                    placeholder={"Search company"}
                    options={options}
                    value={dropdownValue}
                    cb={handleDropdownValue}
                    cbInput={handleInputValueChange}
                />
            </div>
        </>
    )
}

export default SearchBar;
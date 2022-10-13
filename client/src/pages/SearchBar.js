import React from "react";
import Dropdown from "../components/Dropdown";
import {useEffect,useState} from "react"
import Axios from "axios"

const SearchBar = () => {

    const [dropdownValue, setDropdownValue] = useState("");
    const [options,setOptions] = useState([]);
    const [input,setInput] = useState("");

    const handleDropdownValue = (inputValue) => {
        setDropdownValue(inputValue.value);
    }

    console.log(input,"input");

    const handleInputValueChange = (val) => {
        setInput(val);
    }

    const API_URL = "https://cors-anywhere.herokuapp.com/https://www.zaubacorp.com/custom-search";

    const formData = new FormData();

    formData.append("search",input);
    formData.append("filter","company");

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
                    console.log(data.data);
                    setOptions([{ value: 'chocolate', label: 'Chocolate' },
                    { value: 'strawberry', label: 'Strawberry' },
                    { value: 'vanilla', label: 'Vanilla' }])
                }).catch((err) => {
                    console.log(err);
                })
    
            },400)
    
            return () => clearTimeout(getData);
        }

    },[input])

    return (
        <div className="search-wrapper">

            <Dropdown
                placeholder={"Search company"}
                options={options}
                value={dropdownValue}
                cb={handleDropdownValue}
                cbInput={handleInputValueChange}
            />
        </div>
    )
}

export default SearchBar;
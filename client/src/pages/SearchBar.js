import React from "react";
import Dropdown from "../components/Dropdown";
import {useEffect,useState} from "react"
import Axios from "axios"
import { parse } from 'node-html-parser';

const SearchBar = () => {

    const [dropdownValue, setDropdownValue] = useState("");
    const [input,setInput] = useState("");

    const handleDropdownValue = (inputValue) => {
        setDropdownValue(inputValue.value);
    }

    const handleInputValueChange = (val) => {
        setInput(val);
    }

    return (
        <>
            <p className='list-title'>Search and add Company</p>
            <div className="search-wrapper">
                <Dropdown
                    placeholder={"Search company"}
                    value={dropdownValue}
                    cb={handleDropdownValue}
                    cbInput={handleInputValueChange}
                />
            </div>
        </>
    )
}

export default SearchBar;
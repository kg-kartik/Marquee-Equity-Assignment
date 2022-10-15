import React from "react";
import AsyncSelect from "react-select/async";
import { useEffect, useState } from "react";
import Axios from "axios"
import { parse } from 'node-html-parser';
// import {useHistory} from "react-router-dom"

const Dropdown = ({ options, placeholder, cb,cbInput }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [inputValue,setInputValue] = useState("");

    // const navigate = useHistory();

    const handleValueChange = (val) => {
        setSelectedOption(val);
        cb(val);
    };

    const handleInputValueChange = (val) => {
        setInputValue(val);
        cbInput(val);
    }

    const API_URL = "https://cors-anywhere.herokuapp.com/https://www.zaubacorp.com/custom-search";

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: "#FFFFFFAF",
            paddingLeft: "5%",
            fontSize: "14px"
        }),
        container: (provided, state) => ({
            ...provided,
            width: "40%",
            marginLeft: "30%",
            marginTop:"5%",
            borderRadius: "20px"
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            height: "40px"
        }),
        control: (provided) => ({
            ...provided,
            paddingLeft: "2%",
            fontSize: "14px",
            color: "#a4a4a4",
            border: "1px solid transparent"
        }),
        singleValue: (provided, state) => {
            return { ...provided };
        }
    };

    const formData = new FormData();

    formData.append("search",inputValue);
    formData.append("filter","company");

    const loadOptions = () => {

        //!todo add debouncing; this is for test only
        if(inputValue.length > 4){

            return Axios({
                data:formData,
                method:"POST",
                url:API_URL
            })
            .then((data) => {
                
                const root = parse(data.data);
    
                var resultArray = [];
    
                root.querySelectorAll('div').forEach(function(elem) {
                    const obj = {};
                    obj.cin = elem.id;
                    obj.name = elem.innerText;
                    resultArray.push(obj);
                });
    
                return resultArray;
    
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const addCompany = () => {
        Axios.post("http://localhost:5000/company/addCompany",{
            companyDetails:{
                name:selectedOption.name,
                cin:selectedOption.cin.slice(9+selectedOption.name.length,selectedOption.cin.length)
            }
        })
        .then((res) => {
            console.log(res.data,"data saved successfully");  
            window.location.replace("http://localhost:3000/about");
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <>
            <AsyncSelect
                cacheOptions
                isSearchable={true}
                styles={customStyles}
                placeholder={placeholder}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        neutral0: "#24272bff",
                        primary25: "#4a525aff;"
                    }
                })}
                getOptionLabel={e => e.name}
                getOptionValue={e => e.cin}  
                loadOptions={loadOptions}
                defaultValue={selectedOption}
                onChange={(val) => handleValueChange(val)}
                onInputChange={(val) => handleInputValueChange(val)}
                options={options}
            />
            
            <div className="button-container">
                <button
                    className="button"
                    onClick={addCompany}
                >   
                    <div className="text">Add company</div>

                </button>
            </div>
        </>
    );
};

export default Dropdown;

import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';
const Filter = ({ options, selected, selectFunction, dropdownText, getDropdownText, onSelectFunction}) =>{
    // console.log(options)
    const setSelection = (e)=>{
        getDropdownText(options[e]['Name']);
        selected = options[e]['Value'];
        selectFunction(selected);     
    }

    return(

        <div>
            <DropdownButton id="dropdown-item-button" 
                                        title= {dropdownText}
                                        onSelect={setSelection}>
                                        
            {options.map( (selection, idx)  =>(

                <Dropdown.Item as="button" eventKey = {idx}> {selection.Name} </Dropdown.Item>
            ))}

        </DropdownButton>
        </div>
    );
};
export default Filter;
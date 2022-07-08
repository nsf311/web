import React, { Component, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';
import BosMap from './BosMap';
// import {selectUserType, selectSubject, selectRegDV } from './BosMap';


const Filters = ({ selectedUser, selectedFrequency, selectUserType, dropdownUser, getDropdownUserText}) =>{

    // const [dropdownUser, setDropdownUserText] = useState('select user type');
    const [dropdownSubjectText, setDropdowSubjectText] = useState('select subject');
    const [dropdownIVtext, setDropdownIVtext] = useState('select independent variable');
    const [dropdownDVtext, setDropdownDVtext] = useState('select dependent variable');
    const filterUserType = (e)=>{
        getDropdownUserText(e);
        
        if (e == 'Non-gov; all'){
            selectedUser = "non_gov"
            selectedFrequency = "all"
            
        }
        else if (e == 'Non-gov and unsure; all'){
            selectedUser = "non_gov_unsure"
            selectedFrequency = "all"
        }

        else if (e == 'All users; all'){
            selectedUser = "all"
            selectedFrequency = "all"

        }
        else if (e == 'Non-gov; heavy'){
            selectedUser = "non_gov"
            selectedFrequency = "heavy"
        }
        else if (e == 'Non-gov and unsure; heavy'){
            selectedUser = "non_gov_unsure"
            selectedFrequency = "heavy"
        }
        else if (e == 'All users; heavy'){
            selectedUser = "all"
            selectedFrequency = "heavy"
        }
        selectUserType(selectedUser, selectedFrequency);
        dropdownUser = selectedUser + "; " + selectedFrequency
        
    }

    const selectSubject=(e)=>{
        // setRegDV(regDVDict[e]);
        setDropdowSubjectText(e);
    }
    const selectRegDV=(e)=>{
        // setRegDV(regDVDict[e]);
        setDropdownDVtext(e);
    }

    const selectRegIV=(e)=>{
        // setRegDV(regDVDict[e]);
        setDropdownIVtext(e);
    }
    return(
        <div class = "container">
                <div class = "row">
                    <div class = "col-sm">
                        <DropdownButton id="dropdown-item-button" 
                                        title= {dropdownUser}
                                        onSelect={filterUserType}>
                        
                            <Dropdown.Item as="button" eventKey="Non-gov; all" > Non-gov; all</Dropdown.Item>
                            <Dropdown.Item as="button" eventKey = "Non-gov and unsure; all">Non-gov and unsure; all</Dropdown.Item>
                            <Dropdown.Item as="button" eventKey="All users; all">All users; all</Dropdown.Item>
                            <Dropdown.Item as="button" eventKey="Non-gov; heavy">Non-gov; heavy</Dropdown.Item>
                            <Dropdown.Item as="button" eventKey = "Non-gov and unsure; heavy">Non-gov and unsure; heavy</Dropdown.Item>
                            <Dropdown.Item as="button" eventKey = "All users; heavy">All users; heavy</Dropdown.Item>

                        </DropdownButton>
                    </div>
                    <div class = "col-sm">
                        <DropdownButton id="dropdown-item-button" 
                                    title= {dropdownSubjectText}
                                    onSelect = {selectSubject}>
                    
                            <Dropdown.Item as="button" eventKey="Animal" > Animal</Dropdown.Item>
                            <Dropdown.Item as="button" eventKey = "Parking">Parking</Dropdown.Item>
                            <Dropdown.Item as="button" eventKey="All subjects">All subjects</Dropdown.Item>

                        </DropdownButton>
                    </div>
                    <div class = "col-sm">
                        <DropdownButton id="dropdown-item-button" 
                                    title= {dropdownDVtext}
                                    onSelect={selectRegDV}>
                
                            <Dropdown.Item as="button" eventKey="total number of reports" > total number of reports</Dropdown.Item>
                            <Dropdown.Item as="button" eventKey = "total number of users">total number of users</Dropdown.Item>
                            <Dropdown.Item as="button" eventKey="radius of gyration">radius of gyration</Dropdown.Item>
                            <Dropdown.Item as="button" eventKey="max home distance">max home distance</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div class = "col-sm">
                        <DropdownButton id="dropdown-item-button" 
                                    title= {dropdownIVtext}
                                    onSelect = {selectRegIV}>
                    
                            <Dropdown.Item as="button" eventKey="Poverty Index" > Poverty Index</Dropdown.Item>
                            <Dropdown.Item as="button" eventKey = "Response Time">Response Time</Dropdown.Item>
                            <Dropdown.Item as="button" eventKey="Quality of Service">Quality of Service</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
            </div>
    );
};
export default Filters;
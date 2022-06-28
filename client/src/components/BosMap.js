import React, { Component,useState, useEffect } from 'react';
import "leaflet/dist/leaflet.css";
import {MapContainer, GeoJSON, TileLayer} from 'react-leaflet';
import DropdownButton from 'react-bootstrap/DropdownButton';

import bosHexes from '../data/hexagon_600m_311_pop_20200707.json';

import ReactDOMServer from 'react-dom/server';
import HexRegression from './HexRegression';
import bos311Service from '../services/bos311.service';
import RegressionPlt from './RegressionPlt';
import Filters from './filters';
import DropdownToggle from '@restart/ui/esm/DropdownToggle';
import DropdownItem from '@restart/ui/esm/DropdownItem';

import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown'
import SplitButton from 'react-bootstrap/SplitButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import { Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle } from 'react-bootstrap';
import { makeKey } from "../lib/makeKey"

const BosMap =()=>{
      // GeoJson Key to handle updating geojson inside react-leaflet
    const [geoJsonKey, setGeoJsonKey] = useState("initialKey123abc")
    const [selectedHex, setSelectedHex] = useState({});
    const [hexRegVars, setHexRegVars] = useState([]);
    const [RegData, setRegData] = useState({});
    const [regressionGraph, setRegressionGraph] = useState(false);

    const [selectedUser, setUser] = useState('non_gov');
    const [selectedFrequency, setFrequency] = useState('all');

    const [showHexOffcanvas, setShowHexOffcanvas] = useState(false);
    const handleHexOffcanvasClose = () => setShowHexOffcanvas(false);
    const handleHexOffcanvasShow = () => setShowHexOffcanvas(true);

    const [showRegOffcanvas, setShowRegOffcanvas] = useState(false);
    const handleRegOffcanvasClose = () => setShowRegOffcanvas(false);
    const handleRegOffcanvasShow = () => setShowRegOffcanvas(true);
 
    const [dropdownUser, setDropdownUserText] = useState('select user type');
    const [dropdownSubjectText, setDropdowSubjectText] = useState('select subject');
    const [dropdownIVtext, setDropdownIVtext] = useState('select independent variable');
    const [dropdownDVtext, setDropdownDVtext] = useState('select dependent variable');


    const [regDV, setRegDV] = useState('HEX_total_reporting');
    const bosCenter = [42.360081, -71.058884];
    const hexStyle = {
        fillColor:"yellow",
    };

    const regDVDict = {
        'total number of reports':'HEX_total_reporting',
        'total number of users': 'HEX_total_user',
        'radius of gyration': 'HEX_weighted_radius_of_gyration',
        'max home distance': 'HEX_weighted_max_home_distance'
    }

    useEffect(() => {
        const newKey = makeKey(10)
        setGeoJsonKey(newKey)
      }, [selectedUser, selectedFrequency])
    
    const hexRegData = async (hex)=>{
    
        console.log("load data")
        var hex_vars = await bos311Service.findByHexNum(hex.properties.HEX_600)
            .then(response=>{
                return response.data
            })
            .catch(e=>{
                console.log(e)
            });
            setHexRegVars(hex_vars);
    };

    const getHexRegVarsByFilter = (hex)=>{
    
        console.log("load hexagon regression vars")
        console.log(selectedUser)
        bos311Service.findHexByUserTypeFreq(hex.properties.HEX_600, selectedUser, selectedFrequency)
            .then(response=>{
                setHexRegVars(response.data);
            })
            .catch(e=>{
                console.log(e)
            });
            
    };


    const GetAllRegData = ()=>{
        console.log("load all reg data")
          bos311Service.findAll()
              .then(response=>{
                  setRegData(response.data);
                  setRegressionGraph(true);
                
              })
              .catch(e=>{
                  console.log(e)
              });
              
      };

    const RegDataByUserTypeFreq = (user_type, frequency)=>{
        console.log("load reg data by user type and frequency")
  
        bos311Service.findByUserTypeFreq(selectedUser, selectedFrequency)
            .then(response=>{
                  setRegData(response.data);
                  setRegressionGraph(true);
                
              })
              .catch(e=>{
                  console.log(e)
              });
        handleRegOffcanvasShow();
              
      };

    const onEachHex = (hex, layer)=>{
        layer.on('click',function(e){
            setSelectedHex(hex);
            // console.log("hexagon is clicked");
            console.log(hex.properties.HEX_600)
            getHexRegVarsByFilter(hex);
            handleHexOffcanvasShow();
        }); 
    }
  
    const selectUserType = (e)=>{
        setDropdownUserText(e);
        
        if (e == 'Non-gov; all'){
            setUser("non_gov");
            setFrequency("all");
            
        }
        else if (e == 'Non-gov and unsure; all'){
            setUser("non_gov_unsure");
            setFrequency("all");
        }

        else if (e == 'All users; all'){
            setUser("all");
            setFrequency("all");
        }
        else if (e == 'Non-gov; heavy'){
            setUser("non_gov");
            setFrequency("heavy");
        }
        else if (e == 'Non-gov and unsure; heavy'){
            setUser("non_gov_unsure");
            setFrequency("heavy");
        }
        else if (e == 'All users; heavy'){
            setUser("all");
            setFrequency("heavy");
        } 
    }

    const selectSubject=(e)=>{
        // setRegDV(regDVDict[e]);
        setDropdowSubjectText(e);
    }
    const selectRegDV=(e)=>{
        setRegDV(regDVDict[e]);
        setDropdownDVtext(e);
    }

    const selectRegIV=(e)=>{
        // setRegDV(regDVDict[e]);
        setDropdownIVtext(e);
    }

    return (
        <div>
            <h1 style ={{ textAlign: "center"}}>Bos 311 Viz</h1>
            <div class = "container">
                <div class = "row">
                    <div class = "col-sm">
                        <DropdownButton id="dropdown-item-button" 
                                        title= {dropdownUser}
                                        onSelect={selectUserType}>
                        
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
                    <div class = "col-sm">
                        <button onClick={()=> RegDataByUserTypeFreq (selectedUser, selectedFrequency)}>
                                    Show Regression Graph
                        </button>
                    </div>
                </div>
            </div>
            {/* <Filters dropdownUser = {dropdownUser} selectUserType ={} dropdownSubjectText = {dropdownSubjectText} dropdownDVtext = {dropdownDVtext} dropdownIVtext = {dropdownIVtext}></Filters> */}
            <div>
                <div>
                <Offcanvas class = "offcanvas-xxl offcanvas-start" show={showRegOffcanvas} onHide={handleRegOffcanvasClose}>
                    <OffcanvasHeader closeButton>
                        <OffcanvasTitle>Regression Graph</OffcanvasTitle>
                        <div class = "container">
                            <div class = "row">
                                <div class = "col-sm">
                                    <DropdownButton id="dropdown-item-button" 
                                                    title= {dropdownUser}
                                                    onSelect={selectUserType}>
                                    
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
                                <div class = "col-sm">
                                    <button onClick={()=> RegDataByUserTypeFreq (selectedUser, selectedFrequency)}>
                                                Show Regression Graph
                                    </button>
                                </div>
                            </div>
                        </div>
                    </OffcanvasHeader>
                    <OffcanvasBody>
                    {regressionGraph === true && <RegressionPlt RegDataSelectedUser = {RegData} RegDataDV = {regDV}/>}
                    </OffcanvasBody>
                </Offcanvas>
                    
                </div>

                   
                <MapContainer style = {{height:"80vh"}} zoom ={10} center ={bosCenter}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <GeoJSON key = {geoJsonKey} style = {hexStyle} data = {bosHexes.features} onEachFeature = {onEachHex}></GeoJSON>
                </MapContainer>      

                <Offcanvas show={showHexOffcanvas} onHide={handleHexOffcanvasClose} placement='end'>
                    <OffcanvasHeader closeButton>
                        <OffcanvasTitle>Hexagon Variables</OffcanvasTitle>
                    </OffcanvasHeader>
                    <OffcanvasBody>
                        <HexRegression selectedHex = {selectedHex}
                        hexRegVars = {hexRegVars} selectedUser = {selectedUser} selectedFrequency = {selectedFrequency}/>  
                    </OffcanvasBody>
                </Offcanvas>

            </div>           



        </div>
    )

}
export default BosMap;

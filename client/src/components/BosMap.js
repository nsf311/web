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
import Filter from './filter';

import DropdownToggle from '@restart/ui/esm/DropdownToggle';
import DropdownItem from '@restart/ui/esm/DropdownItem';

import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown'
import SplitButton from 'react-bootstrap/SplitButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import { Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle } from 'react-bootstrap';
import { makeKey } from "../lib/makeKey"

const bosCenter = [42.360081, -71.058884];
    

    const userTypeDict = [
        {Name : "Non-gov", Value: "non_gov"},
        {Name: "Non-gov and unsure", Value: "non_gov_unsure"},
        {Name: "All users", Value: "all"}
    ]
    const freqDict = [
        {Name: "all", Value: "all"},
        {Name: "heavy", Value: "heavy"}
    ]

    const DVDict = [
        {Name: "total number of reports", Value: "HEX_total_reporting" },
        {Name: "total number of users", Value: "HEX_total_user"},
        {Name: 'radius of gyration', Value: 'HEX_weighted_radius_of_gyration'},
        {Name: 'max home distance', Value: 'HEX_weighted_max_home_distance'}
    ]

    const IVDict = [
        {Name: "Poverty Index", Value: "povertyIndex" }
    ]

    const SubjectDict = [
        {Name: "All subjects", Value: "all" },
        {Name: "Mayors 24 Hour Hotline", Value: "Mayors_24_Hour_Hotline"},
        {Name: "Consumer Affair and Licensing", Value:"Consumer_Affairs_and_Licensing"},
        {Name: "Boston Water and Sewer Commission", Value:"Boston_Water_and_Sewer_Commission"},
        {Name: "Public Works Department", Value:"Public_Works_Department"},
        {Name: "Inspectional Services", Value:"Inspectional_Services"},
        {Name: "Neighborhood Services", Value:"Neighborhood_Services"},
        {Name: "Property Management", Value:"Property_Management"},
        {Name: "Boston Public School", Value:"Boston_Public_School"},
        {Name: "Transportation Traffic Division", Value:"Transportation_Traffic_Division"},
        {Name: "Animal Control", Value: "Animal_Control" },
        {Name: "Boston Police Department", Value: "Boston_Police_Department" },
        {Name: "Parks and Recreation Department", Value: "Parks_and_Recreation_Department" },
        {Name: "Civil Rights", Value: "Civil_Rights" }
    ]

const BosMap =()=>{
      // GeoJson Key to handle updating geojson inside react-leaflet
    const [geoJsonKey, setGeoJsonKey] = useState("initialKey123abc")
    const [selectedHex, setSelectedHex] = useState([]);
    const [hexNum, setHexNum] = useState(-1);
    const [hexRegVars, setHexRegVars] = useState([]);
    const [RegData, setRegData] = useState({});
    const [regressionGraph, setRegressionGraph] = useState(false);

    const [selectedUser, setUser] = useState('non_gov');
    const [selectedFrequency, setFrequency] = useState('all');
    const [selectedDV, setDV] = useState('HEX_total_reporting');
    const [selectedIV, setIV] = useState('poverty_index');
    const [selectedSubject, setSubject] = useState('all');


    const [showHexOffcanvas, setShowHexOffcanvas] = useState(false);
    const handleHexOffcanvasClose = () => setShowHexOffcanvas(false);
    const handleHexOffcanvasShow = () => setShowHexOffcanvas(true);

    const [showRegOffcanvas, setShowRegOffcanvas] = useState(true);
    const handleRegOffcanvasClose = () => setShowRegOffcanvas(false);
    const handleRegOffcanvasShow = () => setShowRegOffcanvas(true);
 
    const [dropdownUser, setDropdownUserText] = useState('Non-gov');
    const [dropdownFreq, setDropdownFreqText] = useState('All');
    const [dropdownDVtext, setDropdownDVText] = useState('total number of reports');
    const [dropdownIVtext, setDropdownIVText] = useState('Poverty Index');
    const [dropdownSubjectText, setDropdowSubjectText] = useState('All subjects');

    useEffect(() => {
        const newKey = makeKey(10)
        setGeoJsonKey(newKey)
      }, [selectedUser, selectedFrequency, selectedSubject])

    useEffect(() => {
        RegDataByFilter();
        getHexRegVarsByFilter(hexNum);
    }, [selectedUser, selectedFrequency, selectedSubject])

    const hexStyle = {
        fillColor:"yellow",
    };


    const getHexRegVarsByFilter = (hexNum)=>{
        bos311Service.findHexVarByFilter(hexNum, selectedUser, selectedFrequency, selectedSubject)
        .then(response=>{
            setHexRegVars(response.data);
        })
        .catch(e=>{
            console.log(e)
        });    
    };
   


    const RegDataByFilter = ()=>{
        console.log("load reg data by user type and frequency")
        
  
        bos311Service.findRegVarByFilter(selectedUser, selectedFrequency, selectedSubject)
            .then(response=>{
                  setRegData(response.data);
                  setRegressionGraph(true);
                
              })
              .catch(e=>{
                  console.log(e)
              });
        
              
      };

    const onEachHex = (hex, layer)=>{
        layer.on('click',function(e){
            setSelectedHex(hex);
            setHexNum(hex.properties.HEX_600);
            // console.log("hexagon is clicked");
            console.log(hex.properties.HEX_600)
            getHexRegVarsByFilter(hex.properties.HEX_600);
            handleHexOffcanvasShow();
            
        }); 
    }

    const graphBtnOnclick = ()=>{
        RegDataByFilter();
        handleRegOffcanvasShow();
    }
  
    const hexRegData = (hex)=>{
    
        console.log("load data")
        var hex_vars = bos311Service.findByHexNum(hex.properties.HEX_600)
            .then(response=>{
                return response.data
            })
            .catch(e=>{
                console.log(e)
            });
            setHexRegVars(hex_vars);
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
    

    // console.log(selectedHex);
    return (
       
        <div>
            <h1 style ={{ textAlign: "center"}}>Bos 311 Viz</h1>
            <div class = "container">
            {showRegOffcanvas === false && showHexOffcanvas === false &&
                <div class = "row"> 
                    <div class = "col-sm">
                        <b>User Type: </b>
                        <Filter options = {userTypeDict} selected = {selectedUser} selectFunction = { (selectedUser) => {setUser(selectedUser)}} dropdownText = {dropdownUser} getDropdownText = {(dropdownUser) => setDropdownUserText(dropdownUser)}></Filter>
                    </div>
                    <div class = "col-sm">
                        <b>Frequency: </b>
                        <Filter options = {freqDict} selected = {selectedFrequency} selectFunction = { (selectedFrequency) => {setFrequency(selectedFrequency)}} dropdownText = {dropdownFreq} getDropdownText = {(dropdownFreq) => setDropdownFreqText(dropdownFreq)}></Filter>
                    </div>
                    <div class = "col-sm">
                        <b>Subject: </b>
                        <Filter options = {SubjectDict} selected = {selectedSubject} selectFunction = { (selectedSubject) => {setSubject(selectedSubject)}} dropdownText = {dropdownSubjectText} getDropdownText = {(dropdownSubjectText) => setDropdowSubjectText(dropdownSubjectText)}></Filter>
                    </div>
                    <div class = "col-sm">
                        <b>Dependent Variable: </b>
                        <Filter options = {DVDict} selected = {selectedDV} selectFunction = { (selectedDV) => {setDV(selectedDV)}} dropdownText = {dropdownDVtext} getDropdownText = {(dropdownDVtext) => setDropdownDVText(dropdownDVtext)}></Filter>
                    </div>
                    <div class = "col-sm">
                        <b>Independent Variable: </b>
                        <Filter options = {IVDict} selected = {selectedIV} selectFunction = { (selectedIV) => {setIV(selectedIV)}} dropdownText = {dropdownIVtext} getDropdownText = {(dropdownIVtext) => setDropdownIVText(dropdownIVtext)}></Filter>
                    </div>
                    <div class = "col-sm">
                        <button onClick={graphBtnOnclick}>
                                    Show Regression Graph
                        </button>
                    </div>
                    
                    {/* <Filters selectedUser = {selectedUser} selectedFrequency = {selectedFrequency} selectUserType ={ (selectedUser, selectedFrequency) =>{setUser(selectedUser); setFrequency(selectedFrequency)}} dropdownUser = {dropdownUser} getDropdownUserText = {(dropdownUser) => setDropdownUserText(dropdownUser)} ></Filters> */}
                    
                </div>
            } 
            </div>
            
            <div>
                <div>
                <Offcanvas class = "offcanvas-xxl offcanvas-start" show={showRegOffcanvas} onHide={handleRegOffcanvasClose}>
                    <OffcanvasHeader closeButton>
                        <OffcanvasTitle>Regression Graph</OffcanvasTitle>
                        
                    </OffcanvasHeader>
                    <OffcanvasBody>
                    <div class = "container">
                        <div class = "col-sm">
                            <b>User Type: </b>
                            <Filter options = {userTypeDict} selected = {selectedUser} selectFunction = { (selectedUser) => {setUser(selectedUser)}} dropdownText = {dropdownUser} getDropdownText = {(dropdownUser) => setDropdownUserText(dropdownUser)}></Filter>
                        </div>
                        <div class = "col-sm">
                            <b>Frequency: </b>
                            <Filter options = {freqDict} selected = {selectedFrequency} selectFunction = { (selectedFrequency) => {setFrequency(selectedFrequency)}} dropdownText = {dropdownFreq} getDropdownText = {(dropdownFreq) => setDropdownFreqText(dropdownFreq)}></Filter>
                        </div>
                        <div class = "col-sm">
                            <b>Subject: </b>
                            <Filter options = {SubjectDict} selected = {selectedSubject} selectFunction = { (selectedSubject) => {setSubject(selectedSubject)}} dropdownText = {dropdownSubjectText} getDropdownText = {(dropdownSubjectText) => setDropdowSubjectText(dropdownSubjectText)}></Filter>
                        </div>
                        <div class = "col-sm">
                            <b>Dependent Variable: </b>
                            <Filter options = {DVDict} selected = {selectedDV} selectFunction = { (selectedDV) => {setDV(selectedDV)}} dropdownText = {dropdownDVtext} getDropdownText = {(dropdownDVtext) => setDropdownDVText(dropdownDVtext)}></Filter>
                        </div>
                        <div class = "col-sm">
                            <b>Independent Variable: </b>
                            <Filter options = {IVDict} selected = {selectedIV} selectFunction = { (selectedIV) => {setIV(selectedIV)}} dropdownText = {dropdownIVtext} getDropdownText = {(dropdownIVtext) => setDropdownIVText(dropdownIVtext)}></Filter>
                        </div>
                                {/* <div class = "col-sm">
                                    <button onClick={()=> RegDataByFilter (selectedUser, selectedFrequency)}>
                                                Show Regression Graph
                                    </button>
                                </div> */}
                                
                                {/* <Filters selectedUser = {selectedUser} selectedFrequency = {selectedFrequency} selectUserType ={ (selectedUser, selectedFrequency) =>{setUser(selectedUser); setFrequency(selectedFrequency)}} dropdownUser = {dropdownUser} getDropdownUserText = {(dropdownUser) => setDropdownUserText(dropdownUser)} ></Filters> */}
                        </div>
                    {regressionGraph === true && <RegressionPlt RegDataSelectedUser = {RegData} RegDataDV = {selectedDV} DVName = {dropdownDVtext}/>}
                    </OffcanvasBody>
                </Offcanvas>
                {console.log(RegData)}
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
                        <div class = "container">
                            <div class = "col-sm">
                                <b>User Type: </b>
                                <Filter options = {userTypeDict} selected = {selectedUser} selectFunction = { (selectedUser) => {setUser(selectedUser)}} dropdownText = {dropdownUser} getDropdownText = {(dropdownUser) => setDropdownUserText(dropdownUser)}></Filter>
                            </div>
                            <div class = "col-sm">
                                <b>Frequency: </b>
                                <Filter options = {freqDict} selected = {selectedFrequency} selectFunction = { (selectedFrequency) => {setFrequency(selectedFrequency)}} dropdownText = {dropdownFreq} getDropdownText = {(dropdownFreq) => setDropdownFreqText(dropdownFreq)}></Filter>
                            </div>
                            <div class = "col-sm">
                                <b>Subject: </b>
                                <Filter options = {SubjectDict} selected = {selectedSubject} selectFunction = { (selectedSubject) => {setSubject(selectedSubject)}} dropdownText = {dropdownSubjectText} getDropdownText = {(dropdownSubjectText) => setDropdowSubjectText(dropdownSubjectText)}></Filter>
                            </div>
                            {/* <Filters selectedUser = {selectedUser} selectedFrequency = {selectedFrequency} selectUserType ={ (selectedUser, selectedFrequency) =>{setUser(selectedUser); setFrequency(selectedFrequency)}} dropdownUser = {dropdownUser} getDropdownUserText = {(dropdownUser) => setDropdownUserText(dropdownUser)} ></Filters> */}
                        </div>
                        <HexRegression selectedHex = {selectedHex} hexRegVars = {hexRegVars}/>  
                    </OffcanvasBody>
                </Offcanvas>

            </div>           



        </div>
    )

}
export default BosMap;

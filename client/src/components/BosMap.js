import React, { Component,useState } from 'react';
import "leaflet/dist/leaflet.css";
import {MapContainer, GeoJSON, TileLayer} from 'react-leaflet';
import DropdownButton from 'react-bootstrap/DropdownButton';

import bosHexes from '../data/hexagon_600m_311_pop_20200707.json';

import ReactDOMServer from 'react-dom/server';
import HexRegression from './HexRegression';
import bos311Service from '../services/bos311.service';
import RegressionPlt from './RegressionPlt';
import DropdownToggle from '@restart/ui/esm/DropdownToggle';
import DropdownItem from '@restart/ui/esm/DropdownItem';

import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown'
import SplitButton from 'react-bootstrap/SplitButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import { Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle } from 'react-bootstrap';


const BosMap =()=>{
    const [selectedHex, setSelectedHex] = useState({});
    const [regressionData, setRegressionData] = useState({});
    const [RegData, setRegData] = useState({});
    const [regressionGraph, setRegressionGraph] = useState(false);
    const [selectedUser, setUser] = useState({});
    const [selectedFrequency, setFrequency] = useState({});

    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleOffcanvasClose = () => setShowOffcanvas(false);
    const handleOffcanvasShow = () => setShowOffcanvas(true);
 
    const [dropdownUser, setDropdownUser] = useState({value:'select user type'});
    const bosCenter = [42.360081, -71.058884];
    const hexStyle = {
        fillColor:"yellow",
    };
    
    const hexRegData = (hex)=>{
      console.log("load data")
        bos311Service.findByHexNum(hex.properties.HEX_600)
            .then(response=>{
                setRegressionData(response.data);

            })
            .catch(e=>{
                console.log(e)
            });
    };
    // const Popup = ({hex}) =>{
    //     return(
    //         <div>
    //             <p>{`Hexagon ${hex.properties.HEX_600}`}</p>
    //             <p>{`total_popu: ${hex.properties.total_popu}`}</p>
    //         </div>
    //     );
    // };

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
              
      };


    const onEachHex = (hex, layer)=>{
        layer.on('click',function(e){
            setSelectedHex(hex);
            hexRegData(hex);
            handleOffcanvasShow();
        }); 
    }
    const changeDropdownText =(e) =>{
        console.log(e);
        setDropdownUser(e);
    }
    const selectUserType=(e)=>{
        
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

    return (
        <div>
            <h1 style ={{ textAlign: "center"}}>Bos 311 Viz</h1>
            <MapContainer style = {{height:"80vh"}} zoom ={10} center ={bosCenter}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON style = {hexStyle} data = {bosHexes.features} onEachFeature = {onEachHex}></GeoJSON>
            </MapContainer>      
            
            <Offcanvas show={showOffcanvas} onHide={handleOffcanvasClose} placement='end'>
                <OffcanvasHeader closeButton>
                    <OffcanvasTitle>Hexagon Regression</OffcanvasTitle>
                </OffcanvasHeader>
                <OffcanvasBody>
                    <HexRegression selectedHex = {selectedHex}
                    regressionData = {regressionData} />

                    
                </OffcanvasBody>
            </Offcanvas>

            <div>
                <DropdownButton id="dropdown-item-button" 
                                title= {dropdownUser.value}
                                onSelect={selectUserType}>
                
                    <Dropdown.Item as="button" eventKey="Non-gov; all"> Non-gov; all</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey = "Non-gov and unsure; all">Non-gov and unsure; all</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey="All users; all">All users; all</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey="Non-gov; heavy">Non-gov; heavy</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey = "Non-gov and unsure; heavy">Non-gov and unsure; heavy</Dropdown.Item>
                    <Dropdown.Item as="button" eventKey = "All users; heavy">All users; heavy</Dropdown.Item>

                </DropdownButton>
            </div>

            <div>
                <button onClick={()=> RegDataByUserTypeFreq (selectedUser, selectedFrequency)}>
                    Show Regression Graph
                </button>
            </div>
            
            <div>
                {regressionGraph === true && <RegressionPlt RegDataSelectedUser = {RegData}/>}
            </div>

        </div>
    )

}
export default BosMap;

import React, { Component,useState } from 'react';
import "leaflet/dist/leaflet.css";
import {MapContainer, GeoJSON, TileLayer} from 'react-leaflet';
import bosHexes from '../data/hexagon_600m_311_pop_20200707.json';

import ReactDOMServer from 'react-dom/server';
import HexRegression from './HexRegression';
import bos311Service from '../services/bos311.service';

const BosMap =()=>{
    const [selectedHex, setSelectedHex] = useState({});
    const [regressionData, setRegressionData] = useState({});
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
    const Popup = ({hex}) =>{
        return(
            <div>
                <p>{`Hexagon ${hex.properties.HEX_600}`}</p>
                <p>{`total_popu: ${hex.properties.total_popu}`}</p>
            </div>
        );
    };


    const onEachHex = (hex, layer)=>{
        layer.on('click',function(e){
            setSelectedHex(hex);
            hexRegData(hex);
        });
        const popupContent = ReactDOMServer.renderToString( 
            <div>
                <Popup hex={hex} />
            </div>
            
            
        );
        layer.bindPopup(popupContent);   
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
            
            <HexRegression selectedHex = {selectedHex}
                regressionData = {regressionData} />
        </div>
    )

}
export default BosMap;

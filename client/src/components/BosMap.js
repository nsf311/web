import React from 'react'
import "leaflet/dist/leaflet.css"
import {MapContainer, GeoJSON, TileLayer} from 'react-leaflet'

import bosHexes from '../data/hexagon_600m_311_pop_20200707.json'

const BosMap = ()=>{
    let bosCenter = [42.360081, -71.058884];

    const hexStyle = {
        fillColor:"yellow",
    };

    const onEachHex = (hex, layer)=>{
        const hex600 = hex.properties.HEX_600;
        layer.bindPopup(String(hex600));
        console.log(hex);

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
        </div>
    )
}

export default BosMap

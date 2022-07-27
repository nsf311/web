import React, {useState, useEffect } from 'react';
import {MapContainer, GeoJSON, TileLayer} from 'react-leaflet';
import { Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle } from 'react-bootstrap';
import { max, min} from "d3";
// css
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "leaflet/dist/leaflet.css";
// hexagon data
import bosHexes from '../data/hexagon_600m_311_pop_20200707.json';
// customized components
import HexRegression from './HexRegression';
import bos311Service from '../services/bos311.service';
import RegressionPlt from './RegressionPlt';
import Filter from './filter';
import Legend from '../components/graph/Legend';
// customized javascript
import { makeKey } from "../lib/makeKey"

// constant variables for map, styles, variable dictionaries
const bosCenter = [42.360081, -71.058884];
// component style - SASS variables
// https://coreui.io/react/docs/components/offcanvas/#coffcanvas
const offcanvasStyle = { 
    '--bs-offcanvas-width': "50vh"
}
const hexStyle = {
    fillColor:"yellow",
};

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
    {Name: "Total number of reports", Value: "HEX_total_reporting" },
    {Name: "Total number of 311 users", Value: "HEX_total_user"},
    // Mobility
    {Name: "Weighted radius of gyration", Value: "HEX_weighted_radius_of_gyration"},
    {Name: "Weighted average distance between reported locations", Value: "HEX_weighted_average_distance"},

    // Territoriality
    {Name: "Weighted number of hexagons covered", Value: "HEX_weighted_HEX_coverage"},
    {Name: "Weighted max home distance", Value: "HEX_weighted_max_home_distance"},
    {Name: "Weighted mean home distance", Value: "HEX_weighted_mean_home_distance"},
    {Name: "Weighted median home distance", Value: "HEX_weighted_median_home_distance"},

    // Variety
    {Name: "Weighted number of subjects reported", Value: "HEX_weighted_subject_coverage"},
    {Name: "Weighted subject reversed HHI", Value: "HEX_weighted_subject_hhi"},

    {Name: "Weighted number of reporting in 2015", Value: "HEX_weighted_num_reporting_2015"},
    {Name: "Number of 311 reports per 100 population", Value: "HEX_normalized_total_311_per_100"},
   
]

const IVDict = [
    {Name: "Poverty Index", Value: "poverty_index" },
    {Name: "Total number of reports", Value: "HEX_total_reporting" },
    {Name: "Total number of 311 users", Value: "HEX_total_user"},
    // Mobility
    {Name: "Weighted radius of gyration", Value: "HEX_weighted_radius_of_gyration"},
    {Name: "Weighted average distance between reported locations", Value: "HEX_weighted_average_distance"},

    // Territoriality
    {Name: "Weighted number of hexagons covered", Value: "HEX_weighted_HEX_coverage"},
    {Name: "Weighted max home distance", Value: "HEX_weighted_max_home_distance"},
    {Name: "Weighted mean home distance", Value: "HEX_weighted_mean_home_distance"},
    {Name: "Weighted median home distance", Value: "HEX_weighted_median_home_distance"},

    // Variety
    {Name: "Weighted number of subjects reported", Value: "HEX_weighted_subject_coverage"},
    {Name: "Weighted subject reversed HHI", Value: "HEX_weighted_subject_hhi"},

    {Name: "Weighted number of reporting in 2015", Value: "HEX_weighted_num_reporting_2015"},
    {Name: "Number of 311 reports per 100 population", Value: "HEX_normalized_total_311_per_100"},
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

const COLOR_1 = "#ffe6e6";
const COLOR_2 = "#ffb6b6";
const COLOR_3 = "#ff8686";
const COLOR_4 = "#ff5656";
const COLOR_5 = "#ff2626";
const COLOR_6 = "#ff0000";
const COLOR_7 = "#f00000";
const COLOR_8 = "#d00000";
const COLOR_9 = "#b00000";
const COLOR_10 = "#900000";
const COLOR_11 = "#700000";
const COLOR_NULL = "#ffffff";

const NUM_OF_HEX_COLORS = 11;


const BosMap =()=>{
    // GeoJson Key to handle updating geojson inside react-leaflet
    const [geoJsonKey, setGeoJsonKey] = useState("initialKey123abc")
    const [selectedHex, setSelectedHex] = useState([]);
    const [hexNum, setHexNum] = useState(-1);
    const [hexRegVars, setHexRegVars] = useState([]);
    const [RegData, setRegData] = useState([]);
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
    const [dropdownDVtext, setDropdownDVText] = useState('Total number of reports');
    const [dropdownIVtext, setDropdownIVText] = useState('Poverty Index');
    const [dropdownSubjectText, setDropdowSubjectText] = useState('All subjects');
    const [geojsonDV, setGeojsonDV] = useState(bosHexes);
   
    const [minDV, setMinDV] = useState(0);
    const [maxDV, setMaxDV] = useState(0);
    const [step, setStep] = useState(0);


    useEffect(() => {
        RegDataByFilter();
        getHexRegVarsByFilter(hexNum);
    }, [selectedUser, selectedFrequency, selectedSubject])

    useEffect(() => {
        appendHexDVToGeojson();
        const newKey = makeKey(10);
        setGeoJsonKey(newKey);
        
      }, [RegData, selectedDV])


    
    function getHexDV(hexagon){
        if(hexagon[0]!==undefined){
            return hexagon[0][selectedDV];
        }
    }
  

    function appendHexDVToGeojson(){
        // console.log(bosHexes.features.length);
        var variables_data = RegData.map((d) => d.results);
        var hexDVvals = variables_data.map(getHexDV);
        setMinDV(min(hexDVvals));
        setMaxDV(max(hexDVvals));    
        setStep(( max(hexDVvals) - min(hexDVvals) ) /(NUM_OF_HEX_COLORS));
   
        for (var hex_idx = 0; hex_idx<bosHexes.features.length; hex_idx++){
            var hexNum = bosHexes.features[hex_idx].properties.HEX_600
            // console.log(hexNum)
            var reg_idx = RegData.map(object => object.HEX_600).indexOf(hexNum);
            if (reg_idx!==-1){
                try {
                    bosHexes.features[hex_idx].properties.dvValue = RegData[reg_idx]['results'][0][selectedDV];
                }
                catch{
                    bosHexes.features[hex_idx].properties.dvValue = null;
                }
            }
            else{
                bosHexes.features[hex_idx].properties.dvValue = null;
                
            }
            
        }
        setGeojsonDV(bosHexes);

    }
    const getfillColor=(d)=>{
        
        if (RegData!==[]){
            // console.log("getfillColor")
            // console.log(step)
            // console.log(minDV)
            
            // console.log(maxDV - 11 * step)
            // console.log(maxDV - 2 * step)
            // console.log(maxDV)
            
            return d > Math.round((maxDV - 2 * step + Number.EPSILON) * 100) / 100
            ? COLOR_11
            : d > Math.round((maxDV - 3 * step + Number.EPSILON) * 100) / 100
            ? COLOR_10
            : d > Math.round((maxDV - 4 * step + Number.EPSILON) * 100) / 100
            ? COLOR_9
            : d > Math.round((maxDV - 5 * step + Number.EPSILON) * 100) / 100
            ? COLOR_8
            : d > Math.round((maxDV - 6 * step + Number.EPSILON) * 100) / 100
            ? COLOR_7
            : d > Math.round((maxDV - 7 * step + Number.EPSILON) * 100) / 100
            ? COLOR_6
            : d > Math.round((maxDV - 8 * step + Number.EPSILON) * 100) / 100
            ? COLOR_5
            : d >  Math.round((maxDV - 9 * step + Number.EPSILON) * 100) / 100
            ? COLOR_4
            : d > Math.round((maxDV - 10 * step + Number.EPSILON) * 100) / 100
            ? COLOR_3
            : d > Math.round((maxDV - 11 * step + Number.EPSILON) * 100) / 100
            ? COLOR_2
            : d > Math.round((maxDV - 12 * step + Number.EPSILON) * 100) / 100
            ? COLOR_1
            : COLOR_NULL;
            
        }  
      }
    
    const setHexStyle = (hex)=>{
        return{
            fillColor: getfillColor(hex.properties.dvValue),
            weight: 1,
            opacity: 1,
            color: "white",
            dashArray: "3",
            fillOpacity: 0.8
        };
    }

    
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
            // console.log(hex.properties.HEX_600)
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
    

    return (
       
        <div>
            <h1 style ={{ textAlign: "center"}}>Boston 311 Visualization System</h1>
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
                        <b>Color coded by: </b>
                        <Filter options = {DVDict} selected = {selectedDV} selectFunction = { (selectedDV) => {setDV(selectedDV)}} dropdownText = {dropdownDVtext} getDropdownText = {(dropdownDVtext) => setDropdownDVText(dropdownDVtext)}></Filter>
                    </div>
                    {/* <div class = "col-sm">
                        <b>Independent Variable: </b>
                        <Filter options = {IVDict} selected = {selectedIV} selectFunction = { (selectedIV) => {setIV(selectedIV)}} dropdownText = {dropdownIVtext} getDropdownText = {(dropdownIVtext) => setDropdownIVText(dropdownIVtext)}></Filter>
                    </div> */}
                    <div class = "col-sm">
                        <button onClick={graphBtnOnclick}>
                                    Show Regression Graph
                        </button>
                    </div>                    
                </div>
            } 
            </div>
            
            <div>
                <div>
                <Offcanvas class = "offcanvas-xxl offcanvas-start " show={showRegOffcanvas} onHide={handleRegOffcanvasClose} style = {offcanvasStyle}>
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
                    </div>
                    {regressionGraph === true && <RegressionPlt RegDataSelectedUser = {RegData} RegDataDV = {selectedDV} DVName = {dropdownDVtext} RegDataIV = {selectedIV} IVName = {dropdownIVtext}/>}
                    </OffcanvasBody>
                </Offcanvas>
                </div>

                   
                <MapContainer style = {{height:"80vh"}} zoom ={10.5} center ={bosCenter} >
                    <Legend maxDV  = {maxDV} minDV = {minDV} step = {step}></Legend>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <GeoJSON key = {geoJsonKey} style = {setHexStyle} data = {geojsonDV.features} onEachFeature = {onEachHex}></GeoJSON>
                </MapContainer>      

                <Offcanvas show={showHexOffcanvas} onHide={handleHexOffcanvasClose} placement='end' style = {offcanvasStyle}>
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
            {/* <p>min DV = {minDV}</p>     
            <p>max DV = {maxDV}</p>  */}
        </div>
    )

}
export default BosMap;

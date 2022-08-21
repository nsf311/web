import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
// import {
//   Offcanvas,
//   OffcanvasBody,
//   OffcanvasHeader,
//   OffcanvasTitle,
// } from "react-bootstrap";

// import "leaflet/dist/leaflet.css";
import bosHexes from "../core/data/hexagon_600m_311_pop_20200707.json";

import Collapse from "react-bootstrap/Collapse";

import HexRegression from "../components/HexRegression";
import bos311Service from "../core/services/bos311.service";
import RegressionPlt from "../components/RegressionPlt";
// import Filter from "../components/filter";
import Legend from "../components/graph/Legend";

import { max, min } from "d3";

import { makeKey } from "../core/lib/makeKey";

import { Button } from "react-bootstrap";

import { SelectForms } from "../shared/form-controller";

import {
  // offcanvasStyle,
  userTypeDict,
  freqDict,
  DVDict,
  IVDict,
  SubjectDict,
  IVDictObj,
  DVDictObj,
  COLOR_1,
  COLOR_2,
  COLOR_3,
  COLOR_4,
  COLOR_5,
  COLOR_6,
  COLOR_7,
  COLOR_8,
  COLOR_9,
  COLOR_10,
  COLOR_11,
  COLOR_NULL,
  NUM_OF_HEX_COLORS,
} from "../core/constants/map-contants";

const bosCenter = [42.360081, -71.058884];
// component style - SASS variables
// https://coreui.io/react/docs/components/offcanvas/#coffcanvas

const BosMap = () => {
  // GeoJson Key to handle updating geojson inside react-leaflet
  const [geoJsonKey, setGeoJsonKey] = useState("initialKey123abc");
  const [selectedHex, setSelectedHex] = useState([]);
  const [hexNum, setHexNum] = useState(-1);
  const [hexRegVars, setHexRegVars] = useState([]);
  const [RegData, setRegData] = useState([]);
  const [regressionGraph, setRegressionGraph] = useState(false);

  // variables' states
  const [selectedUser, setUser] = useState("non_gov");
  const [selectedFrequency, setFrequency] = useState("all");
  const [selectedDV, setDV] = useState("HEX_total_reporting");
  const [selectedIV, setIV] = useState("poverty_index");
  const [selectedSubject, setSubject] = useState("all");

  // sidebar for each individual hexagon
  const [showHexOffcanvas, setShowHexOffcanvas] = useState(false);
  // const handleHexOffcanvasClose = () => setShowHexOffcanvas(false);
  const handleHexOffcanvasShow = () => setShowHexOffcanvas(true);

  // sidebar for regression graph

  // const [showHexDetails, setShowHexDetails] = useState(false);

  // sidebar for regresson graph
  const [showRegOffcanvas, setShowRegOffcanvas] = useState(false);
  // const handleRegOffcanvasClose = () => setShowRegOffcanvas(false);
  const handleRegOffcanvasShow = () => setShowRegOffcanvas(true); // setShowRegOffcanvas(true);

  // sidebar for Hexagon Graph expand close the Regression Graph.
  useEffect(() => {
    if (showHexOffcanvas) {
      setShowRegOffcanvas(false);
    }
  }, [showHexOffcanvas]);

  useEffect(() => {
    if (showRegOffcanvas) {
      setShowHexOffcanvas(false);
    }
  }, [showRegOffcanvas]);

  // dropdown text states
  // const [dropdownUser, setDropdownUserText] = useState("Non-gov");
  // const [dropdownFreq, setDropdownFreqText] = useState("All");
  // const [dropdownDVtext, setDropdownDVText] = useState(
  //   "total number of reports"
  // );
  // const [dropdownIVtext, setDropdownIVText] = useState("Poverty Index");
  // const [dropdownSubjectText, setDropdowSubjectText] = useState("All subjects");

  // for color-coded map
  const [geojsonDV, setGeojsonDV] = useState(bosHexes);
  const [minDV, setMinDV] = useState(0);
  const [maxDV, setMaxDV] = useState(0);
  const [step, setStep] = useState(0);

  // when one of the following filter is changed,
  // load the data again
  useEffect(() => {
    RegDataByFilter();
    getHexRegVarsByFilter(hexNum);
  }, [selectedUser, selectedFrequency, selectedSubject]);

  /*
    - update the DV to geojson data when DV or regression data is changed
    (regression data is changed when frequency or user type is changed)
    - makeKey is used for refreshing/ updating the <GEOJSON> component when the DV is changed or 
    the regression data is changed 
    */
  useEffect(() => {
    appendHexDVToGeojson();
    const newKey = makeKey(10);
    setGeoJsonKey(newKey);
  }, [RegData, selectedDV]);

  // helper function to get values of selected DV of each hexagon
  const getHexDV = (hexagon) => {
    if (hexagon[0] !== undefined) {
      return hexagon[0][selectedDV];
    }
  };

  /*
    Color-coded map
    Append one feature (dvValue) to the boxHexex data to change the color of hexagons
    */
  const appendHexDVToGeojson = () => {
    // console.log(bosHexes.features.length);
    let variables_data = RegData.map((d) => d.results);
    let hexDVvals = variables_data.map(getHexDV);
    setMinDV(min(hexDVvals));
    setMaxDV(max(hexDVvals));
    setStep((max(hexDVvals) - min(hexDVvals)) / NUM_OF_HEX_COLORS);

    for (let hex_idx = 0; hex_idx < bosHexes.features.length; hex_idx++) {
      let hexNum = bosHexes.features[hex_idx].properties.HEX_600;
      let reg_idx = RegData.map((object) => object.HEX_600).indexOf(hexNum);
      if (reg_idx !== -1) {
        try {
          bosHexes.features[hex_idx].properties.dvValue =
            RegData[reg_idx]["results"][0][selectedDV];
          console.log(bosHexes.features[hex_idx].properties.dvValue);
          console.log(hex_idx);
        } catch {
          bosHexes.features[hex_idx].properties.dvValue = null;
        }
      } else {
        bosHexes.features[hex_idx].properties.dvValue = null;
      }
    }
    // update geojson data with appended DV
    setGeojsonDV(bosHexes);
  };

  const getfillColor = (d) => {
    if (RegData !== []) {
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
        : d > Math.round((maxDV - 9 * step + Number.EPSILON) * 100) / 100
        ? COLOR_4
        : d > Math.round((maxDV - 10 * step + Number.EPSILON) * 100) / 100
        ? COLOR_3
        : d > Math.round((maxDV - 11 * step + Number.EPSILON) * 100) / 100
        ? COLOR_2
        : d >= Math.round((maxDV - 12 * step + Number.EPSILON) * 100) / 100
        ? COLOR_1
        : COLOR_NULL;
    }
  };

  const setHexStyle = (hex) => {
    return {
      fillColor: getfillColor(hex.properties.dvValue),
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.8,
    };
  };

  const getHexRegVarsByFilter = (hexNum) => {
    bos311Service
      .findHexVarByFilter(
        hexNum,
        selectedUser,
        selectedFrequency,
        selectedSubject
      )
      .then((response) => {
        setHexRegVars(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const RegDataByFilter = () => {
    bos311Service
      .findRegVarByFilter(selectedUser, selectedFrequency, selectedSubject)
      .then((response) => {
        setRegData(response.data);
        setRegressionGraph(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onEachHex = (hex, layer) => {
    layer.on("click", function (e) {
      setSelectedHex(hex);
      setHexNum(hex.properties.HEX_600);
      // console.log("hexagon is clicked");
      // console.log(hex.properties.HEX_600)
      getHexRegVarsByFilter(hex.properties.HEX_600);
      handleHexOffcanvasShow();
    });
  };

  const graphBtnOnclick = () => {
    if (!showRegOffcanvas) {
      RegDataByFilter();
      handleRegOffcanvasShow();
    } else {
      setShowRegOffcanvas(false);
    }
  };

  const hexRegData = (hex) => {
    console.log("load data");
    var hex_vars = bos311Service
      .findByHexNum(hex.properties.HEX_600)
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        console.log(e);
      });
    setHexRegVars(hex_vars);
  };

  const GetAllRegData = () => {
    console.log("load all reg data");
    bos311Service
      .findAll()
      .then((response) => {
        setRegData(response.data);
        setRegressionGraph(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="container-fluid mt-5">
      {/* <div className="col-10 mx-auto py-3">
        <div className="row">
          <div className="col">
            <pre>{selectedUser}</pre>
            <SelectForms
              options={userTypeDict}
              label="User Type"
              onChange={setUser}
              value={selectedUser}
            ></SelectForms>
          </div>
          <div className="col">
            <SelectForms
              options={freqDict}
              label="Frequency"
              onChange={setFrequency}
              value={selectedFrequency}
            ></SelectForms>
          </div>
          <div className="col">
            <SelectForms
              options={SubjectDict}
              label="Subject"
              onChange={setSubject}
              value={selectedSubject}
            ></SelectForms>
          </div>
          <div className="col">
            <SelectForms
              options={DVDict}
              label="Color coded by"
              onChange={setDV}
              value={selectedDV}
            ></SelectForms>
          </div>
          <div className="col pt-4">
            <Button
              variant="outline-primary rounded-pill"
              onClick={graphBtnOnclick}
            >
              Show Regression Graph
            </Button>
          </div>
        </div>
      </div> */}

      <div>
        {/* <div>
          <Offcanvas
            className="offcanvas-xxl offcanvas-start"
            show={showRegOffcanvas}
            onHide={handleRegOffcanvasClose}
            style={offcanvasStyle}
          >
            <OffcanvasHeader closeButton>
              <OffcanvasTitle>Regression Graph</OffcanvasTitle>
            </OffcanvasHeader>
            <OffcanvasBody>
              <div className="container">
                <div className="col-sm">
                  <b>User Type: </b>
                  <Filter
                    options={userTypeDict}
                    selected={selectedUser}
                    selectFunction={(selectedUser) => {
                      setUser(selectedUser);
                    }}
                    dropdownText={dropdownUser}
                    getDropdownText={(dropdownUser) =>
                      setDropdownUserText(dropdownUser)
                    }
                  ></Filter>
                </div>
                <div className="col-sm">
                  <b>Frequency: </b>
                  <Filter
                    options={freqDict}
                    selected={selectedFrequency}
                    selectFunction={(selectedFrequency) => {
                      setFrequency(selectedFrequency);
                    }}
                    dropdownText={dropdownFreq}
                    getDropdownText={(dropdownFreq) =>
                      setDropdownFreqText(dropdownFreq)
                    }
                  ></Filter>
                </div>
                <div className="col-sm">
                  <b>Subject: </b>
                  <Filter
                    options={SubjectDict}
                    selected={selectedSubject}
                    selectFunction={(selectedSubject) => {
                      setSubject(selectedSubject);
                    }}
                    dropdownText={dropdownSubjectText}
                    getDropdownText={(dropdownSubjectText) =>
                      setDropdowSubjectText(dropdownSubjectText)
                    }
                  ></Filter>
                </div>
                <div className="col-sm">
                  <b>Dependent Variable: </b>
                  <Filter
                    options={DVDict}
                    selected={selectedDV}
                    selectFunction={(selectedDV) => {
                      setDV(selectedDV);
                    }}
                    dropdownText={dropdownDVtext}
                    getDropdownText={(dropdownDVtext) =>
                      setDropdownDVText(dropdownDVtext)
                    }
                  ></Filter>
                </div>
                <div className="col-sm">
                  <b>Independent Variable: </b>
                  <Filter
                    options={IVDict}
                    selected={selectedIV}
                    selectFunction={(selectedIV) => {
                      setIV(selectedIV);
                    }}
                    dropdownText={dropdownIVtext}
                    getDropdownText={(dropdownIVtext) =>
                      setDropdownIVText(dropdownIVtext)
                    }
                  ></Filter>
                </div>
              </div>
              {regressionGraph === true && (
                <RegressionPlt
                  RegDataSelectedUser={RegData}
                  RegDataDV={selectedDV}
                  DVName={dropdownDVtext}
                  RegDataIV={selectedIV}
                  IVName={dropdownIVtext}
                />
              )}
            </OffcanvasBody>
          </Offcanvas>
        </div> */}

        <div className="col-11 mx-auto shadow rounded-end border border-primary border-start-0">
          <div className="col-12  border-bottom  bg-primary bg-opacity-10">
            <h2 className="text-center text-primary"> Boston Map Data</h2>
          </div>
          <div className="row">
            <Collapse in={showRegOffcanvas} className="col-12 col-lg-3">
              <div id="regression-dialog">
                <div className="overflow-auto" style={{ height: "83vh" }}>
                  <div className="col-11 mx-auto d-flex">
                    <h3 className="text-center text-primary col-10">
                      Regression Graph
                    </h3>
                    <Button
                      className="btn btn-light btn-close ml-auto col py-2 rounded-pill"
                      onClick={() => setShowRegOffcanvas(false)}
                    >
                      <span className="visually-hidden">Close</span>
                    </Button>
                  </div>

                  <div className="col-11 mx-auto my-3">
                    <SelectForms
                      options={userTypeDict}
                      label="User Type"
                      onChange={setUser}
                      value={selectedUser}
                    ></SelectForms>
                  </div>
                  <div className="col-11 mx-auto my-3">
                    <SelectForms
                      options={freqDict}
                      label="Frequency"
                      onChange={setFrequency}
                      value={selectedFrequency}
                    ></SelectForms>
                  </div>
                  <div className="col-11 mx-auto my-3">
                    <SelectForms
                      options={SubjectDict}
                      label="Subject"
                      onChange={setSubject}
                      value={selectedSubject}
                    ></SelectForms>
                  </div>
                  <div className="col-11 mx-auto my-3 mb-auto">
                    <SelectForms
                      options={DVDict}
                      label="Dependent Variable (Color coded by)"
                      onChange={setDV}
                      value={selectedDV}
                    ></SelectForms>
                  </div>
                  <div className="col-11 mx-auto my-3 mb-auto">
                    <SelectForms
                      options={IVDict}
                      label="Independent Variable"
                      onChange={setIV}
                      value={selectedIV}
                    ></SelectForms>
                  </div>

                  <div className="col-12">
                    {regressionGraph === true && (
                      <RegressionPlt
                        RegDataSelectedUser={RegData}
                        RegDataDV={selectedDV}
                        DVName={DVDictObj[selectedDV]}
                        RegDataIV={selectedIV}
                        IVName={IVDictObj[selectedIV]}
                      />
                    )}
                  </div>
                </div>
              </div>
            </Collapse>
            <div
              className={
                showRegOffcanvas || showHexOffcanvas
                  ? "position-relative col-12 col-lg-9"
                  : "position-relative col"
              }
            >
              <MapContainer
                style={{ minHeight: "83vh", maxHeight: "100%" }}
                // className="min-vh-100"
                zoom={11}
                center={bosCenter}
              >
                <div className="position-absolute top-50 start-0 translate-middle-y show-on-mapcontainer">
                  <Button
                    variant="outline-primary rounded-start rounded-pill btn-sm"
                    onClick={graphBtnOnclick}
                    transform="rotate(-90)"
                  >
                    {showRegOffcanvas ? "Hide" : "Show"} Regression Graph
                  </Button>
                </div>
                <Legend maxDV={maxDV} minDV={minDV} step={step}></Legend>
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON
                  key={geoJsonKey}
                  style={setHexStyle}
                  data={geojsonDV.features}
                  onEachFeature={onEachHex}
                ></GeoJSON>
              </MapContainer>
            </div>
            <Collapse in={showHexOffcanvas} className="col-12 col-lg-3">
              <div id="hexagon-dialog">
                <div className="overflow-auto" style={{ height: "83vh" }}>
                  <div className="col-11 mx-auto d-flex">
                    <h3 className="text-center text-primary col-10">
                      Hexagon Graph
                    </h3>
                    <Button
                      className="btn btn-light btn-close ml-auto col py-2 rounded-pill"
                      onClick={() => setShowHexOffcanvas(false)}
                    >
                      <span className="visually-hidden">Close</span>
                    </Button>
                  </div>
                  <div className="col-11 mx-auto my-3">
                    <SelectForms
                      options={userTypeDict}
                      label="User Type"
                      onChange={setUser}
                      value={selectedUser}
                    ></SelectForms>
                  </div>
                  <div className="col-11 mx-auto my-3">
                    <SelectForms
                      options={freqDict}
                      label="Frequency"
                      onChange={setFrequency}
                      value={selectedFrequency}
                    ></SelectForms>
                  </div>
                  <div className="col-11 mx-auto my-3">
                    <SelectForms
                      options={SubjectDict}
                      label="Subject"
                      onChange={setSubject}
                      value={selectedSubject}
                    ></SelectForms>
                  </div>
                  <div className="col-11 mx-auto my-3">
                    <HexRegression
                      selectedHex={selectedHex}
                      hexRegVars={hexRegVars}
                    />
                  </div>
                </div>
              </div>
            </Collapse>
          </div>
        </div>

        {/* <Offcanvas
          show={showHexOffcanvas}
          onHide={handleHexOffcanvasClose}
          placement="end"
          style={offcanvasStyle}
        >
          <OffcanvasHeader closeButton>
            <OffcanvasTitle>Hexagon Variables</OffcanvasTitle>
          </OffcanvasHeader>
          <OffcanvasBody>
            <div className="container">
              <div className="col-11 mx-auto my-3">
                <SelectForms
                  options={userTypeDict}
                  label="User Type"
                  onChange={setUser}
                  value={selectedUser}
                ></SelectForms>
              </div>
              <div className="col-11 mx-auto my-3">
                <SelectForms
                  options={freqDict}
                  label="Frequency"
                  onChange={setFrequency}
                  value={selectedFrequency}
                ></SelectForms>
              </div>
              <div className="col-11 mx-auto my-3">
                <SelectForms
                  options={SubjectDict}
                  label="Subject"
                  onChange={setSubject}
                  value={selectedSubject}
                ></SelectForms>
              </div>
            </div>
            <HexRegression selectedHex={selectedHex} hexRegVars={hexRegVars} />
          </OffcanvasBody>
        </Offcanvas> */}
      </div>
      {/* <p>min DV = {minDV}</p>     
            <p>max DV = {maxDV}</p>  */}
    </div>
  );
};
export default BosMap;

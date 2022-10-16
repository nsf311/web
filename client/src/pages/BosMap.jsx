import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON, TileLayer, MapConsumer } from "react-leaflet";
import bosHexes from "../core/data/hexagon_600m_311_pop_20200707.json";

import { closeArrow, openArrow } from "../assets";
import Collapse from "react-bootstrap/Collapse";

import { SelectForms } from "../shared/form-controller";
import bos311Service from "../core/services/bos311.service";
import RegressionPlt from "../shared/RegressionPlt";
import Legend from "../shared/graph/Legend";

import { max, min } from "d3";

import { makeKey } from "../core/lib/makeKey";

import { Button } from "react-bootstrap";

import { Helmet } from "react-helmet";

import { HexModal } from "../shared/HexModal";

import {
  // offcanvasStyle,
  userTypeDict,
  freqDict,
  DVDict,
  IVDict,
  SubjectDict,
  IVDictObj,
  DVDictObj,
  ReportTypeDict,
  ReasonDict,
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

const bosCenter = [42.320081, -71.08];
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

  const [map, setMap] = useState(null);

  // variables' states
  const [selectedUser, setUser] = useState("all");
  const [selectedFrequency, setFrequency] = useState("all");
  const [selectedDV, setDV] = useState("HEX_total_reporting");
  const [selectedIV, setIV] = useState("poverty_index");
  // const [selectedSubject, setSubject] = useState("all");
  // const [selectedReportType, setReportType] = useState("all");

  const [selectedReason, setReason] = useState("all");
  const [position, setPosition] = useState(null);

  // sidebar for each individual hexagon
  const [showHexOffcanvas, setShowHexOffcanvas] = useState(false);
  const handleHexOffcanvasShow = () => setShowHexOffcanvas(true);

  // sidebar for regression graph

  // sidebar for regresson graph
  const [showRegOffcanvas, setShowRegOffcanvas] = useState(true);
  const handleRegOffcanvasShow = () => setShowRegOffcanvas(true);

  // sidebar for Hexagon Graph expand close the Regression Graph.
  // useEffect(() => {
  //   if (showHexOffcanvas) {
  //     setShowRegOffcanvas(false);
  //   } else {
  //   }
  //   if (showRegOffcanvas) {
  //     setPosition({ x: 1250, y: 0 });
  //   }
  // }, [showHexOffcanvas]);

  // useEffect(() => {
  //   if (showRegOffcanvas) {
  //     setShowHexOffcanvas(false);
  //     setPosition({ x: 1250, y: 0 });
  //   } else {
  //     setPosition({ x: 21, y: 21 });
  //   }
  // }, [showRegOffcanvas]);

  // dropdown text states

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
  }, [selectedUser, selectedFrequency, selectedReason]);

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
          // console.log(bosHexes.features[hex_idx].properties.dvValue);
          // console.log(hex_idx);
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
      return (
        // d > Math.round((maxDV - 2 * step + Number.EPSILON) * 100) / 100
        // ? COLOR_11
        // : d > Math.round((maxDV - 3 * step + Number.EPSILON) * 100) / 100
        // ? COLOR_10
        // : d > Math.round((maxDV - 4 * step + Number.EPSILON) * 100) / 100
        // ? COLOR_9
        // : d > Math.round((maxDV - 5 * step + Number.EPSILON) * 100) / 100
        // ? COLOR_8
        // :
        d > Math.round((maxDV - 6 * step + Number.EPSILON) * 100) / 100
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
          : COLOR_NULL
      );
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
        selectedReason
      )
      .then((response) => {
        console.log(response.data);
        setHexRegVars(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const RegDataByFilter = () => {
    bos311Service
      .findRegVarByFilter(selectedUser, selectedFrequency, selectedReason)
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
    <>
      <Helmet>
        <title>Boston 311 | Map</title>
      </Helmet>
      <div className="container-fluid">
        <div className="row d-flex">
          <Collapse in={showRegOffcanvas} className="col-12 col-lg-3 pe-0 mx-0">
            <div id="regression-dialog">
              <div className="overflow-auto" style={{ height: "100vh" }}>
                <div className="direction-left overflow-auto mx-2 my-3">
                  <div className="col-11 mx-auto my-3 mb-auto">
                    <label
                      className="fw-bold h3"
                      htmlFor="reason_dv performance_dv"
                    >
                      Report Types and Performances
                    </label>
                    <div className="col-11 mx-auto">
                      <SelectForms
                        options={ReasonDict}
                        label="Report Type"
                        id="reason_dv"
                        onChange={setReason}
                        value={selectedReason}
                      ></SelectForms>
                      <SelectForms
                        options={DVDict}
                        label="311 Performance Metrics (DV)"
                        id="performance_dv"
                        onChange={setDV}
                        value={selectedDV}
                      ></SelectForms>
                    </div>
                  </div>

                  <div className="col-11 mx-auto my-3 mb-auto">
                    <label
                      className="fw-bold h3"
                      htmlFor="who_reported repeated_users"
                    >
                      311 User Types
                    </label>
                    <div className="col-11 mx-auto">
                      <SelectForms
                        options={userTypeDict}
                        label="Who Reported?"
                        id={"who_reported"}
                        onChange={setUser}
                        value={selectedUser}
                      ></SelectForms>
                      <SelectForms
                        options={freqDict}
                        label="Repeated Users"
                        id={"repeated_users"}
                        onChange={setFrequency}
                        value={selectedFrequency}
                      ></SelectForms>
                    </div>
                  </div>
                  <div className="col-11 mx-auto my-3">
                    <label className="fw-bold h3" htmlFor="user_community_char">
                      Visualizing Relationships
                    </label>
                    <div className="col-11 mx-auto">
                      <SelectForms
                        options={IVDict}
                        id={"user_community_char"}
                        label="User and Community Characteristics (IV)"
                        onChange={setIV}
                        value={selectedIV}
                      ></SelectForms>
                    </div>
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
                  <div className="text-center">
                    <Button
                      variant="danger rounded-pill btn-sm"
                      className="my-2"
                      onClick={() => {
                        map?.setView([42.320081, -71.08], 12);
                      }}
                    >
                      View Boston
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Collapse>
          <div className={"col ps-0"}>
            <MapContainer
              style={{ height: "100%" }}
              className="h-100"
              zoom={12}
              center={bosCenter}
              whenCreated={setMap}
            >
              <MapConsumer>
                {(map) => {
                  return <></>;
                }}
              </MapConsumer>
              <Legend
                maxDV={maxDV}
                minDV={minDV}
                step={step}
                map={map}
                DVName={DVDictObj[selectedDV]}
                // position={position}
              />
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
          <HexModal
            show={showHexOffcanvas}
            selectedHex={selectedHex}
            hexRegVars={hexRegVars}
            onHide={() => setShowHexOffcanvas(false)}
            setReason={setReason}
            setFrequency={setFrequency}
            selectedFrequency={selectedFrequency}
            freqDict={freqDict}
            userTypeDict={userTypeDict}
            setUser={setUser}
            selectedUser={selectedUser}
            ReasonDict={ReasonDict}
            selectedReason={selectedReason}
          />
        </div>
      </div>
    </>
  );
};
export default BosMap;

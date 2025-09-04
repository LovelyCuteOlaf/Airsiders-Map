import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Rectangle
} from "react-leaflet";

import { Alert } from "../Alert";
import { LoadingSpinner } from "../LoadingSpinner";
import { GeoLocation } from "./GeoLocation";
import { BboxInput } from "./BboxInput";

import useOsmToGeo from "../../hooks/useOsmToGeo";
import { Bbox } from "../../types/map.type";
import { isValidBox } from "../../utils/validateBBox";

export const Map = () => {
  const [getData, setGetData] = useState(false);
  const [getCenter, setGetCenter] = useState(false);
  const [bbox, setBbox] = useState<Bbox | null>(null);
  
  const { mapData: osmToGEO, isLoading  } = useOsmToGeo(bbox, getData);
  
  const handleSubmit = () => {
    setGetData((prevState) => !prevState);
    setGetCenter(true);
  };
  
  const handleFill = () => {
    const defaultBox: Bbox = {
      min_lon: 11.54,
      min_lat: 48.14,
      max_lon: 11.541,
      max_lat: 48.141,
    };
    setBbox(defaultBox);
  };
  
  return (
    <div className="relative h-full">
      <MapContainer
        className="h-full"
        center={[48.14, 11.54]}
        zoom={15}
        maxBounds={[
          [-360, -180],
          [360, 180],
        ]}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors &amp; Mert Efe '
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {bbox && isValidBox(bbox) && osmToGEO.GeoJSONData?.features.length === 0 && (
          <Rectangle
            bounds={[[bbox.min_lat, bbox.min_lon], [bbox.max_lat, bbox.max_lon]]}
            pathOptions={{color: 'green'}}
          />
        )}
        <GeoLocation
          getCenter={getCenter}
          getData={getData}
          setGetCenter={setGetCenter}
          bbox={bbox}
          osmToGEO={osmToGEO}
        />
        {isLoading && <div className="fixed h-screen w-full bg-black bg-opacity-60 z-[500]"><LoadingSpinner /></div>}
      </MapContainer>
      
      <BboxInput
        bbox={bbox}
        handleFill={handleFill}
        handleSubmit={handleSubmit}
        setBbox={setBbox}
      />
      
      {osmToGEO.GeoJSONData?.features.length === 0 && (
        <Alert color="warning">There is no Geo JSON information in this bound.</Alert>
      )}
      {osmToGEO.error && (
        <Alert color="warning">{osmToGEO.error}</Alert>
      )}
    </div>
  );
};

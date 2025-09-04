import { useEffect, useState } from "react";
import axios from "axios";
import osmtogeojson from "osmtogeojson";
import  {Bbox, OSMToGEO } from "../types/map.type";

const useOsmToGeo = (bbox: Bbox | null, getData: boolean) => {
  const [mapData, setMapData] = useState<OSMToGEO>({ GeoJSONData: null, error: "" });
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    if (bbox) {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://api.openstreetmap.org/api/0.6/map?bbox=${bbox.min_lon},${bbox.min_lat},${bbox.max_lon},${bbox.max_lat}`
        );
        const newdata = osmtogeojson(response.data);
        setMapData({ GeoJSONData: newdata, error: "" });
      } catch (error: any) {
        const errorMessage = error.response.data ?? null;
        setMapData({
          GeoJSONData: null,
          error: errorMessage ? errorMessage : error.response.data }
        );
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [getData]);
  return {mapData, isLoading};
};

export default useOsmToGeo;

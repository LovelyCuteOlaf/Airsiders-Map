import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

import { isValidBox } from "../../utils/validateBBox";
import { Bbox, OSMToGEO } from "../../types/map.type";

export type GeoLocationProps = {
  bbox: Bbox | null;
  osmToGEO: OSMToGEO;
  getData: boolean;
  getCenter: boolean;
  setGetCenter: (value: boolean) => void;
};

export const GeoLocation = ({ bbox, osmToGEO, getCenter, setGetCenter, getData }: GeoLocationProps) => {
  const mapInstance = useMap();

  useEffect(() => {
    if (!mapInstance) return;

    if (osmToGEO?.GeoJSONData && osmToGEO.error.length <= 0) {
      const geoJson = new L.GeoJSON(osmToGEO.GeoJSONData);

      geoJson.setStyle({ className: "geo-location-area" });

      setTimeout(() => {
        geoJson.addTo(mapInstance);
      }, 700);

      if (bbox && isValidBox(bbox) && getCenter) {
        setTimeout(() => {
          mapInstance.flyTo([bbox.min_lat, bbox.min_lon], 15, {
            duration: 2,
          });
          setGetCenter(false);
        }, 1000);
      }
    }
  }, [getData, getCenter, osmToGEO, bbox]);

  return null;
};

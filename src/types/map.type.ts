import { FeatureCollection } from "geojson";

export type Bbox = {
  min_lon: number;
  min_lat: number;
  max_lon: number;
  max_lat: number;
}

export type OSMToGEO = {
  GeoJSONData: FeatureCollection | null;
  error: any;
}

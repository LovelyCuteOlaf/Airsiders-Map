import { Bbox } from "../types/map.type";

export const isValidBox = (bBox: Bbox | null) => {
  if (!bBox) {
    return false;
  }
  
  return (
    bBox.min_lon !== undefined &&
    bBox.min_lat !== undefined &&
    bBox.max_lon !== undefined &&
    bBox.max_lat !== undefined &&
    bBox.min_lon !== null &&
    bBox.min_lat !== null &&
    bBox.max_lon !== null &&
    bBox.max_lat !== null
  );
};

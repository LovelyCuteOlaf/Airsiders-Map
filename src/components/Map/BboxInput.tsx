import React from "react";

import { Button } from "../Button";
import { Input } from "../Input";
import Tooltip from "../Tooltip";
import { isValidBox } from "../../utils/validateBBox";
import { Bbox } from "../../types/map.type";

export type BboxInput = {
  bbox: Bbox | null;
  setBbox: (value: Bbox) => void;
  handleFill: () => void;
  handleSubmit: () => void;
};

const MockLocations = [
  {
    min_lon: 11.54,
    min_lat: 48.14,
    max_lon: 11.541,
    max_lat: 48.141,
  },
  {
    min_lon: 8.68,
    min_lat: 49.40,
    max_lon: 8.681,
    max_lat: 49.405,
  },
  {
    min_lon: 54.088958,
    min_lat: 12.248757,
    max_lon: 54.09139,
    max_lat: 12.25248,
  },
  {
    min_lon: 10.0,
    min_lat: 50.0,
    max_lon: 10.001,
    max_lat: 50.001,
  },
  {
    min_lon: 9.0,
    min_lat: 51.0,
    max_lon: 9.001,
    max_lat: 51.001,
  },
  {
    min_lon: 12.0,
    min_lat: 47.0,
    max_lon: 12.001,
    max_lat: 47.001,
  },
  {
    min_lon: 55.0,
    min_lat: 11.0,
    max_lon: 55.001,
    max_lat: 11.001,
  },
  {
    min_lon: 13.0,
    min_lat: 46.0,
    max_lon: 13.001,
    max_lat: 46.001,
  },
  {
    min_lon: 56.0,
    min_lat: 10.0,
    max_lon: 56.001,
    max_lat: 10.001,
  },
  {
    min_lon: 14.0,
    min_lat: 45.0,
    max_lon: 14.001,
    max_lat: 45.001,
  },
];

export const BboxInput = ({ bbox, setBbox, handleFill, handleSubmit }: BboxInput) => {
  const handleInputChange = (key: keyof Bbox, value: number) => {
    setBbox({...bbox, [key]: value} as Bbox);
  };
  
  const handleRandomBBox = () => {
    const randomIndex = (Math.floor(Math.random() * 100)) % 10;
    const randomBBox: Bbox = MockLocations[randomIndex];
    setBbox(randomBBox);
  };
  
  return (
    <div className="absolute bottom-20 left-1/2 w-3/4 z-[900] bg-white p-3 rounded -translate-x-1/2">
      <div className="flex gap-2">
        <Input
          label="N"
          value={String(bbox?.max_lat) || ''}
          type="number"
          placeholder={" 48.142 (max_lat)"}
          onChange={(e) => handleInputChange('max_lat', Number(e.target.value))}
        />
        <Input
          label="S"
          value={String(bbox?.min_lat) || ''}
          type="number"
          placeholder={" 48.14 (min_lat)"}
          onChange={(e) => handleInputChange('min_lat', Number(e.target.value))}
        
        />
        <Input
          label="W"
          value={String(bbox?.min_lon) || ''}
          type="number"
          placeholder={" 12.54 (min_lon)"}
          onChange={(e) => handleInputChange('min_lon', Number(e.target.value))}
        
        />
        <Input
          label="E"
          value={String(bbox?.max_lon) || ''}
          type="number"
          placeholder={" 12.541 (max_lon)"}
          onChange={(e) => handleInputChange('max_lon', Number(e.target.value))}
        
        />
      </div>
      <div className="mt-2 flex items-center justify-end gap-2">
        <Button onClick={handleSubmit} disabled={!isValidBox(bbox)}>Submit</Button>
        <Tooltip
          message={
            <span>
              You need to give <strong>bbox</strong> values. (North,South,East,West).
              For give an example, I've filled the inputs for you. Don't forget, the maximum bbox size is <strong>0.25.</strong> It's simple right?
            </span>
          }
        >
          <Button onClick={handleFill}>Help?</Button>
        </Tooltip>
        <Tooltip
          message="Generate random bbox value."
        >
          <Button onClick={handleRandomBBox}>Random</Button>
        </Tooltip>
      </div>
    </div>
  );
};

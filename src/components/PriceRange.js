// Import Packages
import React, { useState } from "react";
import { Range, getTrackBackground } from "react-range";

const MIN = 0;
const MAX = 500;

const PriceRange = ({ setFetchRangeValues }) => {
  const [rangeValues, setRangeValues] = useState([10, 100]);

  return (
    <Range
      step={5} // Step range
      min={MIN} // Min price
      max={MAX} // Max price
      values={rangeValues} // An array of numbers. It controls the position of thumbs on the track. values.length equals to the number of rendered thumbs.
      onChange={(values) => setRangeValues(values)} // Called when a thumb is moved, provides new values.
      onFinalChange={(values) => {
        setFetchRangeValues(values);
      }} // Called when a change is finished (mouse/touch up, or keyup), provides current values. Use this event when you have to make for example ajax request with new values.
      //   props - this needs to be spread over the root track element, it connects mouse and touch events, adds a ref and some necessary styling
      //   children - the rendered thumbs, thumb structure should be specified in a different prop - renderThumb

      renderTrack={({ props, children }) => (
        <div
          style={{
            ...props.style,
            height: "36px",
            display: "flex",
            width: "25%",
          }}
        >
          <div
            ref={props.ref}
            style={{
              height: "5px",
              width: "100%",
              borderRadius: "4px",
              background: getTrackBackground({
                values: rangeValues,
                colors: ["#ccc", " #2cb1ba", "#ccc"],
                min: MIN,
                max: MAX,
              }),
              alignSelf: "center",
            }}
          >
            {children}
          </div>
        </div>
      )}
      // props - it has multiple props that you need to spread over your thumb element
      // index - the thumb index (order)
      // isDragged - true if the thumb is dragged, great for styling purposes

      renderThumb={({ index, props, isDragged }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "10px",
            width: "10px",
            borderRadius: "50%",
            border: isDragged ? "" : "1px solid white",
            backgroundColor: "#2cb1ba",
            outline: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-24px",
              color: "#fff",
              fontSize: "10px",
              padding: "4px",
              borderRadius: "4px",
              backgroundColor: "#2cb1ba",
            }}
          >
            {rangeValues[index]}€
          </div>
        </div>
      )}
    />
  );
};

export default PriceRange;

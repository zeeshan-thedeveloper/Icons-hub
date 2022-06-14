import { listOfDesigns, listOfIllustrations } from "./TestData";
const hexToRgb = (hex) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};
export default hexToRgb;

export const FetchAllIllustrations = async () => {
  return fetch("/api/FrontEnd_api/load_all_illustrations_api", {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(
      (resp) => {
        return resp.json();
      },
      (error) => {
        console.log(error);
      }
    )
    .then((data) => {
      //console.log(data);
      if (data.responseCode === 1) {
        return data.responsePayload;
      }
    });
};

export const FetchAllDesigns = () => {
  return fetch("/api/FrontEnd_api/load_all_designs_api", {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(
      (resp) => {
        return resp.json();
      },
      (error) => {
        console.log(error);
      }
    )
    .then((data) => {
      if (data.responseCode === 1) {
        return data.responsePayload;
      }
    });
};

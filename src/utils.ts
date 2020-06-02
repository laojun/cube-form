import React from "react";
import { get, map } from "lodash";

export const isPromise = (obj: any) => {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
};

export const useMount = fn => {
  React.useEffect(() => {
    fn();
  }, []);
};

export const getData = ({ api, query, dataPath, valueKey, nameKey }) => {
  const mockData = {
    data: {
      list: [
        { name1: "opt1", value1: 1 },
        { name1: "opt2", value1: 2 },
        { name1: "opt3", value1: 3 },
        { name1: "opt4", value1: 4 }
      ]
    }
  };
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        map(get(mockData, `${dataPath}`), item => {
          return {
            ...item,
            name: get(item, `${nameKey}`),
            value: get(item, `${valueKey}`)
          };
        })
      );
    }, 2000);
  });
};

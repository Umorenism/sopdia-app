// import React,{createContext,useState} from "react"
// import {useRouter} from "next/router";

// const RouteContext= createContext();
// const {Provider}=RouteContext

//  const RouteProvider=({children})=>{
//     const [routeState,setRouteState]=useState({location:""})

//      let location = undefined
//      if (typeof window !== 'undefined') {
//          location = localStorage.getItem('location')
//      }
//      const setRouterInfo=(location)=>{
//          setRouterInfo({location:location})
//      }
//      const isRouterInfo = () => {
//          if (!routeState.location) {
//              return false;
//          }
//      };
//      return (
//          <Provider value={
//              {
//                  routeState,
//                  setRouteState:((routerInfo)=>setRouterInfo(routerInfo)),
//                  isRouterInfo
//              }
//          }>
//              {children}
//          </Provider>
//      )

//  }

// export {RouteContext,RouteProvider}





import React, { createContext, useState, useEffect } from "react";

const RouteContext = createContext();
const { Provider } = RouteContext;

const RouteProvider = ({ children }) => {
  const [routeState, setRouteState] = useState({ location: "" });

  // Load location from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLocation = localStorage.getItem("location");
      if (savedLocation) {
        setRouteState({ location: savedLocation });
      }
    }
  }, []);

  // Update both state and localStorage
  const setRouterInfo = (location) => {
    setRouteState({ location });
    if (typeof window !== "undefined") {
      localStorage.setItem("location", location);
    }
  };

  // Check if location exists
  const isRouterInfo = () => {
    return Boolean(routeState.location);
  };

  return (
    <Provider
      value={{
        routeState,
        setRouteState: setRouterInfo,
        isRouterInfo,
      }}
    >
      {children}
    </Provider>
  );
};

export { RouteContext, RouteProvider };

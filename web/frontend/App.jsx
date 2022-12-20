import { BrowserRouter } from "react-router-dom";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";
import { useEffect } from "react";
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider, Page, Card, Button } from "@shopify/polaris";
import Geolocation from './components/geolocation/geolocation';
import ChoiceGeoCountries from './components/choice-list/choice-list';

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
          console.log('Latitude is', position.coords.latitude)
          console.log('Longitude is', position.coords.longitude)
        },
        function(error) {
          console.error("Error code - " + error.code + ':' + error.message)
        })
        console.log('Available')
      } else {
        console.log('Not Available');
      }
  }, [])
  
  function geoFindMe() {
      const status = document.querySelector('#status');
      const mapLink = document.querySelector('#map-link');
  
      mapLink.href = '';
      mapLink.textContent = '';
  
      function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.latitude;
  
        status.textContent = '';
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.textContent = `latitude: ${latitude} °, longitude: ${longitude} °`;
      }
  
      function error() {
        status.textContent = 'Cannot receive your location';
      }
  
      if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supporting by your browser';
      } else {
        status.textContent = 'Receiving geolocation...';
        navigator.geolocation.getCurrentPosition(success, error);
      }
  }

  return (
    <AppProvider i18n={enTranslations}>

      <Page title="Geolocation settings">
        <Geolocation></Geolocation>

        <Card sectioned>
          <ChoiceGeoCountries></ChoiceGeoCountries>
        </Card>
        
        <Card>
          <div>
            <button id="find-me" onClick={geoFindMe}>Show my location</button>
            <p id="status"></p>
            <a id="map-link" target="_blank"></a>
          </div>
        </Card>
      </Page>
    </AppProvider>
  );
}

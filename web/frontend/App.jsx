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

  return (
    <AppProvider i18n={enTranslations}>

      <Page title="Geolocation settings">
        <Geolocation></Geolocation>

        <Card sectioned>
          <ChoiceGeoCountries></ChoiceGeoCountries>
        </Card>
      </Page>
    </AppProvider>
  );
}

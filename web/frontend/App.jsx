import { BrowserRouter } from "react-router-dom";
import { NavigationMenu, Provider, ContextualSaveBar } from "@shopify/app-bridge-react";
import Routes from "./Routes";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider, Page } from "@shopify/polaris";
import Geolocation from './components/geolocation/geolocation';
import { useEffect, useState } from "react";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  const appBridgeConfig = {
    apiKey: '498c10eeb8ddcb4e18fd9e3e6e6d3827',
    host: new URLSearchParams(location.search).get("host"),
    forceRedirect: true,
  }

  const saveAction = {
    disabled: false,
    loading: false,
    onAction: () => console.log('On save action')
  }

  const discardAction = {
    disabled: false,
    loading: false,
    discardConfirmationModal: true,
    onAction: () => console.log('On discard action')
  }

  return (
    <Provider config={appBridgeConfig}>
      <ContextualSaveBar
        saveAction={saveAction}
        discardAction={discardAction}
        fullWidth
        leaveConfirmationDisable
        visible
      />

      <AppProvider i18n={enTranslations}>
        <Page title="Geolocation settings">
          <Geolocation></Geolocation>
        </Page>
      </AppProvider>
    </Provider>
  );
}

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavigationMenu, Provider, ContextualSaveBar } from "@shopify/app-bridge-react";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider, Page, Pagination } from "@shopify/polaris";
import Main from "./pages/geo";
import Privacy from './pages/privacy';


export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");


  const appBridgeConfig = {
    apiKey: '498c10eeb8ddcb4e18fd9e3e6e6d3827',
    host: new URLSearchParams(location.search).get("host"),
    forceRedirect: true,
  }

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <Provider config={appBridgeConfig}>
                <NavigationMenu 
                  navigationLinks={[
                    {
                      label: 'Geolocation settings',
                      destination: '/geo',
                    },
                    {
                      label: 'Privacy policy',
                      destination: '/privacy',
                    },
                  ]}/>
                <AppProvider i18n={enTranslations}>
                  <Routes>
                    <Route path="/geo" element={<Main />}/>
                    <Route path="/privacy" element={<Privacy />}/>
                  </Routes>
                </AppProvider>
              </Provider>
            </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
    
  );
}

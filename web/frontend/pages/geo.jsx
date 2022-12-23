import React, {useState} from "react";
import { Page } from "@shopify/polaris";
import Geolocation from "../components/geolocation/geolocation";
import { ContextualSaveBar } from "@shopify/app-bridge-react";

import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export default function Main() {
  const {
    data,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/settings",
    reactQueryOptions: {},
  });

  console.log(data)

  const [geolocation, setGeolocation] = useState(false);
  const [countries, setCountries] = useState([]);

  const updateSettings = async () => {
    const data = geolocation ? countries : [];

    const req = await fetch("/api/settings", data)
    console.log(req);
  }

  const discardChanges = () => {
    const data = fetch("/api/products/create")

    setGeolocation(data.geolocation);
    setCountries(data.countries);
  }

  const saveAction = {
    disabled: false,
    loading: false,
    onAction: () => updateSettings()
  }

  const discardAction = {
    disabled: false,
    loading: false,
    discardConfirmationModal: true,
    onAction: () => console.log('On discard action')
  }

  return (
    <>
      <ContextualSaveBar
          saveAction={saveAction}
          discardAction={discardAction}
          fullWidth
          leaveConfirmationDisable
          visible
        />

      <Page title="Geolocation settings">
        <Geolocation 
          geolocation={geolocation} 
          setGeolocation={setGeolocation}
          countries={countries}
          setCountries={setCountries}>
        </Geolocation>
      </Page>
    </> 
  )
}
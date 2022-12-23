import {SettingToggle, Card} from '@shopify/polaris';
import {useState, useCallback, useEffect} from 'react';
import ChoiceGeoCountries from '../choice-geo-countries/choice-geo-countries';

export default function Geolocation({geolocation, setGeolocation, countries, setCountries}) {
  const [active, setActive] = useState(geolocation);

  const handleToggle = () => {
    setGeolocation(!geolocation)
    setActive(!geolocation)
  };

  const contentStatus = active ? 'Deactivate' : 'Activate';
  const textStatus = active ? 'activated' : 'deactivated';

  return (
    <>
      <SettingToggle
        action={{
        content: contentStatus,
        onAction: handleToggle,
        }}
        enabled={active}
      >
      Checking geolocation: <b>{textStatus}</b>
      .
      </SettingToggle>

      {active && 
      <Card sectioned>
        <ChoiceGeoCountries countries={countries} setCountries={setCountries}></ChoiceGeoCountries>
      </Card>}
    </>
  );
}
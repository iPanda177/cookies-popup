import {SettingToggle, Card} from '@shopify/polaris';
import {useState, useCallback, useEffect} from 'react';
import ChoiceGeoCountries from '../choice-geo-countries/choice-geo-countries';

export default function Geolocation() {
  const [active, setActive] = useState(false);

  const handleToggle = useCallback(() => setActive((active) => !active), []);

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
      Checking geolocation: {textStatus}
      .
      </SettingToggle>

      {active && 
      <Card sectioned>
        <ChoiceGeoCountries></ChoiceGeoCountries>
      </Card>}
    </>
    


  );
}
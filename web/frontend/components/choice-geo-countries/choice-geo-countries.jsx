import {ChoiceList} from '@shopify/polaris';
import {useState, useCallback, useEffect} from 'react';

import CountryList from '../country-list/country-list';

export default function ChoiceGeoCountries() {
  const [selected, setSelected] = useState(['hidden']);

  const handleChange = useCallback((value) => setSelected(value), []);

    if (selected.includes('all')) {
      window.localStorage.setItem('GEOLOCATION_OPTION', JSON.stringify('all'));
    }

    if (selected.includes('optional')) {
      window.localStorage.setItem('GEOLOCATION_OPTION', JSON.stringify([]))
    }

  return (
    <>
      <ChoiceList
      title="Select countries:"
      choices={[
        {label: 'All', value: 'all'},
        {label: 'Optional', value: 'optional'},
      ]}
      selected={selected}
      onChange={handleChange}
    />

    <br></br>

    {selected.includes('optional') && 
      <CountryList></CountryList>
    }
    </>
  );
}
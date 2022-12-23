import {ChoiceList} from '@shopify/polaris';
import {useState, useCallback, useEffect} from 'react';

import CountryList from '../country-list/country-list';

export default function ChoiceGeoCountries({countries, setCountries}) {
  const [selected, setSelected] = useState(['hidden']);

  const handleChange = (value) => {
    setSelected(value)
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
      <CountryList countries={countries} setCountries={setCountries}></CountryList>
    }
    </>
  );
}
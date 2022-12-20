import {ChoiceList} from '@shopify/polaris';
import {useState, useCallback} from 'react';

export default function ChoiceGeoCountries() {
  const [selected, setSelected] = useState(['hidden']);

  const handleChange = useCallback((value) => setSelected(value), []);

  return (
    <ChoiceList
      title="Select countries:"
      choices={[
        {label: 'All', value: 'all'},
        {label: 'Optional', value: 'optional'},
      ]}
      selected={selected}
      onChange={handleChange}
    />
  );
}
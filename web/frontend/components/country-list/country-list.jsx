import {Stack, Tag, Autocomplete} from '@shopify/polaris';
import {useState, useCallback, useMemo, useEffect} from 'react';

export default function CountryList() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  const getCountries = async () => {
    let list = await fetch('https://restcountries.com/v3.1/all')
      .then((response) => {
      return response.json();
    })
      .then((data) => {
        let countries = [];

        for (const country of data) {
          countries.push({
            value: country.name.common,
            label: country.flag + ' ' + country.name.common,
          })
        }

        return countries;
    });

    return list;
  }

  let deselectedOptions = useMemo(
      () => [],
      [],
    );

  useEffect(() => {
    getCountries()
      .then(data => {
        deselectedOptions = data;
        setOptions(deselectedOptions)
      })
      .catch(error => alert(error))
  }, [deselectedOptions])

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      let endIndex = resultOptions.length - 1;
      if (resultOptions.length === 0) {
        endIndex = 0;
      }
      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const removeTag = useCallback(
    (tag) => () => {
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      setSelectedOptions(options);
    },
    [selectedOptions],
  );

  const verticalContentMarkup =
    selectedOptions.length > 0 ? (
      <Stack spacing="extraTight" alignment="center">
        {selectedOptions.map((option) => {
          let tagLabel = '';
          tagLabel = option.replace('_', ' ');
          tagLabel = titleCase(tagLabel);
          return (
            <Tag key={`option${option}`} onRemove={removeTag(option)}>
              {tagLabel}
            </Tag>
          );
        })}
      </Stack>
    ) : null;

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Tags"
      value={inputValue}
      placeholder="Ukraine, Germany, Italy"
      verticalContent={verticalContentMarkup}
    />
  );

  return (
    <div style={{height: '325px'}}>
      <Autocomplete
        allowMultiple
        options={options}
        selected={selectedOptions}
        textField={textField}
        onSelect={setSelectedOptions}
        listTitle="Suggested Countries"
      />
    </div>
  );

  function titleCase(string) {
    return string
      .toLowerCase()
      .split(' ')
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join('');
  }
}
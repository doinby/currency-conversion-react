/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import CurrencyInput from './CurrencyInput';

const baseUrl =
  'https://v6.exchangerate-api.com/v6/9f68f70f705cfe734fe1e1a9/latest/USD';

export default function Main() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('AUD');
  const [toCurrency, setToCurrency] = useState('USD');

  useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => {
        const currencies = Object.keys(data.conversion_rates);

        setCurrencyOptions(currencies);
      });
  }, []);

  function handleChangedOption(event) {
    const changedCurrency = event.target.value;
    return changedCurrency;
  }

  return (
    <main>
      <form className='converter-form'>
        <CurrencyInput
          name='from'
          onChangeOption={handleChangedOption}
          defaultValue={fromCurrency}
          currencyOptions={currencyOptions}
        />
        <CurrencyInput
          name='to'
          onChangeOption={handleChangedOption}
          defaultValue={toCurrency}
          currencyOptions={currencyOptions}
        />
      </form>
    </main>
  );
}

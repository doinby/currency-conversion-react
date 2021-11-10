/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import CurrencyInput from './CurrencyInput';

const baseUrl = 'https://v6.exchangerate-api.com/v6/597474abcfb6e5296c3f3d8a';

// Pair Conversion Format:
// https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP

export default function Main() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  // const [currencyCodes, setCurrencyCodes] = useState([]);

  const [fromCurrency, setFromCurrency] = useState('AUD');
  const [toCurrency, setToCurrency] = useState('USD');

  const [fromCurrencyName, setFromName] = useState('');
  const [toCurrencyName, setToName] = useState('');

  const [fromInput, setFromInput] = useState(0);
  const [toInput, setToInput] = useState(0);

  const [rate, setRate] = useState(0);

  function getConversionRate() {
    fetch(`${baseUrl}/pair/${fromCurrency}/${toCurrency}`)
      .then((response) => response.json())
      .then((data) => setRate(data.conversion_rate));
  }

  useEffect(() => {
    // Get currency data from API
    fetch(`${baseUrl}/codes`)
      .then((response) => response.json())
      .then((data) => {
        // Get a list of all available currencies for conversion
        // and convert it into an array
        // console.log(data.supported_codes);
        setCurrencyOptions(data.supported_codes);
        // const currencies = Object.keys(
        // setCurrencyOptions(currencies);
      });

    getConversionRate();

    setToInput(fromInput * rate);
  }, [fromInput]);

  function handleOptionChange(event) {
    const changedCurrency = event.target.value;

    // Register from/to currency change to from/to state
    const isFrom = event.target.name === 'from-options';
    if (isFrom) {
      setFromCurrency(changedCurrency);
    } else setToCurrency(changedCurrency);

    // Fetch new rate for each new currency change
    getConversionRate();

    // Display changed option on <selector>
    return changedCurrency;
  }

  function handleInputChange(event) {
    const changedInput = Number(event.target.value);

    // Register input change to from/to input state
    const isFrom = event.target.name === 'from-input';
    if (isFrom) {
      setFromInput(changedInput);
    } else setToInput(changedInput);
  }

  return (
    <main>
      <form className='converter-form'>
        <CurrencyInput
          name='from'
          selectedCurrency={'AUD'}
          currencyOptions={currencyOptions}
          inputValue={fromInput}
          onChangeOption={handleOptionChange}
          onChangeInput={handleInputChange}
        />
        <CurrencyInput
          name='to'
          selectedCurrency={'USD'}
          currencyOptions={currencyOptions}
          inputValue={toInput}
          onChangeOption={handleOptionChange}
          onChangeInput={handleInputChange}
        />
      </form>
    </main>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import Button from './Button';
import CurrencyInput from './CurrencyInput';
import {reverseArrow} from './icons';

const baseUrl = 'https://v6.exchangerate-api.com/v6/597474abcfb6e5296c3f3d8a';
const defaultCurrencyCodes = ['AUD', 'NZD'];

// Pair Conversion Format:
// https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP

export default function Main() {
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const [fromCurrency, setFromCurrency] = useState(defaultCurrencyCodes[0]);
  const [toCurrency, setToCurrency] = useState(defaultCurrencyCodes[1]);

  const [fromInput, setFromInput] = useState(0);
  const [toInput, setToInput] = useState(0);

  const [rate, setRate] = useState(0);

  function getConversionRate() {
    fetch(`${baseUrl}/pair/${fromCurrency}/${toCurrency}`)
      .then((response) => response.json())
      .then((data) => setRate(data.conversion_rate));
  }

  function getCurrencyName(currencyCode) {
    // Run thru all currencyOptions arrays to
    // match 3-character currency code with currency name
    // which normally would be referred to
    // example of array: [['AUD', 'Australian Dollar'], etc...]
    for (let i in currencyOptions) {
      const code = 0; // code is stored first in the array
      const name = 1; // name is stored second in the array

      if (currencyOptions[i][code] === currencyCode)
        return currencyOptions[i][name];
    }
  }

  useEffect(() => {
    // Get currency data from API
    fetch(`${baseUrl}/codes`)
      .then((response) => response.json())
      .then((data) => {
        setCurrencyOptions(data.supported_codes);
      });

    getConversionRate();

    // Display conversion result in 'TO:' input field
    setToInput(fromInput * rate);
  }, [rate, fromInput, fromCurrency]);

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

  function handleOnClick(event) {
    event.preventDefault();

    // Swap selected currencies
    let currentFrom = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(currentFrom);

    // displayNewResult();
    // Fetch new rate for each new currency change
    getConversionRate();
    setToInput(fromInput * rate);
  }

  return (
    <main>
      <form className='converter-form'>
        <CurrencyInput
          name='from'
          currencyName={getCurrencyName(fromCurrency)}
          selectedCurrency={fromCurrency}
          currencyOptions={currencyOptions}
          inputValue={fromInput}
          onChangeOption={handleOptionChange}
          onChangeInput={handleInputChange}
        />
        <Button
          className='reverse-btn'
          displayName={<>{reverseArrow} Switch</>}
          onClick={handleOnClick}
        />
        <CurrencyInput
          name='to'
          currencyName={getCurrencyName(toCurrency)}
          selectedCurrency={toCurrency}
          currencyOptions={currencyOptions}
          inputValue={toInput}
          onChangeOption={handleOptionChange}
          onChangeInput={handleInputChange}
        />
      </form>
    </main>
  );
}

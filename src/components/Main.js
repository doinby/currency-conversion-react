/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import CurrencyInput from './CurrencyInput';

const baseUrl = 'https://v6.exchangerate-api.com/v6/9f68f70f705cfe734fe1e1a9';

// Pair Conversion Format:
// https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP

export default function Main() {
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const [fromCurrency, setFromCurrency] = useState('AUD');
  const [toCurrency, setToCurrency] = useState('USD');

  const [fromInput, setFromInput] = useState(0);
  const [toInput, setToInput] = useState(0);

  const [rate, setRate] = useState(null);

  function getConversionRate() {
    fetch(`${baseUrl}/pair/${fromCurrency}/${toCurrency}`)
      .then((response) => response.json())
      .then((data) => setRate(data.conversion_rate));
  }

  useEffect(() => {
    // Get currency data from API
    fetch(baseUrl + '/latest/USD')
      .then((response) => response.json())
      .then((data) => {
        // Get a list of all available currencies for conversion
        const currencies = Object.keys(data.conversion_rates);

        setCurrencyOptions(currencies);
      });

    getConversionRate();

    // if (fromInput > 0 || toInput > 0) {
    //   console.log('start converting...');
    // }
  }, []);

  function handleOptionChange(event) {
    const changedCurrency = Number(event.target.value);

    // Register from/to currency change to from/to state
    const isFrom = event.target.name === 'from-options';
    if (isFrom) {
      setFromCurrency(changedCurrency);
    } else setToCurrency(changedCurrency);

    getConversionRate();
    return changedCurrency;
  }

  function handleInputChange(event) {
    const changedInput = event.target.value;

    // Register from/to input change to from/to state
    const isFrom = event.target.name === 'from-input';
    if (isFrom) {
      setFromInput(changedInput);
      const conversionResult = document.querySelector('input[name="to-input"]');
      // console.log(conversionResult.value);

      console.log(rate);
      // if (rate === null) {
      //   console.log('Loading...');
      // } else console.log(rate);

      // const fetchResult = async () => {
      //   const response = await fetch(
      //     `${baseUrl}/pair/${fromCurrency}/${toCurrency}`
      //   );
      //   const data = await response.json();
      //   console.log(data.conversion_rates);
      //   // setRate(data.conversion_rates);
      // };
    } else setToInput(changedInput);
  }

  return (
    <main>
      <form className='converter-form'>
        <CurrencyInput
          name='from'
          defaultCurrency={fromCurrency}
          currencyOptions={currencyOptions}
          inputValue={fromInput}
          onChangeOption={handleOptionChange}
          onChangeInput={handleInputChange}
        />
        <CurrencyInput
          name='to'
          defaultCurrency={toCurrency}
          currencyOptions={currencyOptions}
          inputValue={toInput}
          onChangeOption={handleOptionChange}
          onChangeInput={handleInputChange}
        />
      </form>
    </main>
  );
}

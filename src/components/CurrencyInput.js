/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React from 'react';

export default function CurrencyInput({
  name,
  selectedCurrency,
  currencyOptions,
  inputValue,
  onChangeOption,
  onChangeInput,
}) {
  let currencyName = '';

  for (let i in currencyOptions) {
    if (currencyOptions[i][0] === selectedCurrency)
      // console.log(currencyOptions[i][1]);
      currencyName = currencyOptions[i][1];
  }

  return (
    <div className='input-container'>
      <label>
        Convert {name}: <span>{currencyName}</span>
      </label>
      <br />
      <input
        type='number'
        name={name + '-input'}
        onChange={onChangeInput}
        value={inputValue}
      />
      <select name={name + '-options'} onChange={onChangeOption}>
        {/* Render default currency at the top */}
        <option value={selectedCurrency}>{selectedCurrency}</option>
        {currencyOptions.map(([code, name], index) => {
          // Render other currency that is NOT default currency
          if (code !== selectedCurrency) {
            return (
              <option key={index + '_' + name} value={code}>
                {code}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
}

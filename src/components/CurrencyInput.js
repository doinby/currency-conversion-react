/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React from 'react';

export default function CurrencyInput({
  name,
  currencyName,
  selectedCurrency,
  currencyOptions,
  inputValue,
  onChangeOption,
  onChangeInput,
}) {
  return (
    <div className='input-container'>
      <label>
        {name.toUpperCase()}: <span>{currencyName}</span>
      </label>
      <input
        type='number'
        name={name + '-input'}
        onChange={onChangeInput}
        value={inputValue}
      />
      <select name={name + '-options'} onChange={onChangeOption}>
        {/* Render default currency at the top */}
        <option key={'default'} value={selectedCurrency}>
          {selectedCurrency}
        </option>
        {currencyOptions.map(([code, name], index) => {
          // Render other currencies that are NOT default currency
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

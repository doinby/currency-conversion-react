import React from 'react';

export default function CurrencyInput({
  name,
  defaultCurrency,
  currencyOptions,
  inputValue,
  onChangeOption,
  onChangeInput,
}) {
  const defaultIndex = currencyOptions.indexOf(defaultCurrency);

  return (
    <div className='input-container'>
      <label>Convert {name}:</label>
      <br />
      <input
        type='number'
        name={name + '-input'}
        onChange={onChangeInput}
        value={inputValue}
      />
      <select name={name + '-options'} onChange={onChangeOption}>
        {/* Render default currency */}
        <option key={defaultIndex} value={defaultCurrency}>
          {defaultCurrency}
        </option>
        {currencyOptions.map((option, index) => {
          // Render other currency that is NOT default currency
          if (index !== defaultIndex) {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          } else return null;
        })}
      </select>
    </div>
  );
}

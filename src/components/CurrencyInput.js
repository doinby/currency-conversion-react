import React from 'react';

export default function CurrencyInput({
  name,
  defaultValue,
  onChangeOption,
  currencyOptions,
}) {
  const defaultIndex = currencyOptions.indexOf(defaultValue);

  return (
    <div className='input-container'>
      <label>Convert {name}:</label>
      <br />
      <input type='text' name={name} />
      <select name={name} onChange={onChangeOption}>
        <option key={defaultIndex} value={defaultValue}>
          {defaultValue}
        </option>
        {currencyOptions.map((option, index) => {
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

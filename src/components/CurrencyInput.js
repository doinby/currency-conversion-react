import React from 'react';

export default function CurrencyInput(props) {
  return (
    <div>
      <label>Convert {props.name}:</label>
      <br />
      <input type='text' name={props.name} />
      <select>
        <option value='currency 1'>currency 1</option>
        <option value='currency 2'>currency 2</option>
        <option value='currency 3'>currency 3</option>
      </select>
    </div>
  );
}

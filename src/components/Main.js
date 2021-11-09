/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import CurrencyInput from './CurrencyInput';

const baseUrl =
  'https://v6.exchangerate-api.com/v6/9f68f70f705cfe734fe1e1a9/latest/USD';

export default function Main() {
  useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <main>
      <form className='converter'>
        <CurrencyInput name='from' />
        <CurrencyInput name='to' />
      </form>
    </main>
  );
}

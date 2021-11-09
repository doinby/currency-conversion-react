/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header';

const baseUrl =
  'https://v6.exchangerate-api.com/v6/9f68f70f705cfe734fe1e1a9/latest/USD';

export default function App() {
  useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <>
      <Header />
    </>
  );
}

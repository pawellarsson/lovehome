import React, { useEffect, useState } from 'react';
import fetchCurrencyRates from './service/currencyRates';
import * as xmljs from "xml-js";

const CurrencyConverter = () => {
  const [currencyRates, setCurrencyRates] = useState(null);

  const getCurrRates = async () => {
    await fetchCurrencyRates()
      .then(data => xmljs.xml2json(data, {compact: true, spaces: 4}))
      .then(data => JSON.parse(data))
      .then(data => setCurrencyRates(data['gesmes:Envelope'].Cube.Cube.Cube));
  };

  const calculateRates = (firstCurrency, secondCurrency) => {
    let fCurr, sCurr;

    for (let i = 0; i < currencyRates.length; i++) {
      if (firstCurrency === currencyRates[i]._attributes.currency) fCurr = currencyRates[i]._attributes;
      if (secondCurrency === currencyRates[i]._attributes.currency) sCurr = currencyRates[i]._attributes;
    }

    console.log(10, fCurr.currency, 10 * fCurr.rate)
    console.log(10, sCurr.currency, 10 * sCurr.rate)
  };

  const handleChange = (e) => {
    let firstCurrency = currencyRates[0]._attributes.currency;
    let secondCurrency = currencyRates[0]._attributes.currency;

    if (e.target.className === 'first-dropdown') firstCurrency = e.target.value;
    if (e.target.className === 'second-dropdown') secondCurrency = e.target.value;

    calculateRates(firstCurrency, secondCurrency);
  };

  useEffect(() => {
    getCurrRates();
  }, []);

  return (
    <div className="currency-converter">
      <select className="first-dropdown" onChange={e => handleChange(e)}>
        {currencyRates && currencyRates.map(item => (
          <option key={item._attributes.currency} value={item._attributes.currency}>
            {item._attributes.currency}
          </option>
        ))}
      </select>

      <span>=</span>

      <select className="second-dropdown" onChange={e => handleChange(e)}>
        {currencyRates && currencyRates.map(item => (
          <option key={item._attributes.currency} value={item._attributes.currency}>
            {item._attributes.currency}
          </option>
        ))}
      </select>
    </div>
  )
};

export default CurrencyConverter;

const currUrl = 'https://cors-anywhere.herokuapp.com/https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';

const fetchCurrencyRates = () => {
  try {
    return fetch(currUrl, {
      headers : {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/xml'
      },
      //mode: 'no-cors'
    })
    .then(response => response.text())
    //.then(str => (new window.DOMParser()).parseFromString(str, 'text/xml'))
    .then(data => data);
  }
  catch (err) { console.warn(err) }
};

export default fetchCurrencyRates;

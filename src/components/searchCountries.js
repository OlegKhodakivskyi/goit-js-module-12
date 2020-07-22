import { debounce } from 'debounce';
import PNotify from 'pnotify/dist/es/PNotify.js';
import 'pnotify/dist/PNotifyBrightTheme.css';
import templateName from '../templates/list.hbs';
import templateInfo from '../templates/listCountries.hbs';

export const axios = require('axios').default;
const contentRef = document.querySelector('.content');

let result = '';

const searchRef = document.querySelector('.search');

searchRef.addEventListener(
  'input',
  debounce(function (e) {
    result = e.target.value;
    if (result !== '') {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${result}`)
        .then(function (response) {
          const data = response.data;
          const dataName = templateName(data.map(element => element.name));
          const dataInfo = templateInfo(data[0]);
          //   console.log(dataInfo);
          //   console.log(data[0]);
          data.length > 10 && PNotify.alert('Make your search more specific');
          data.length < 10 && (contentRef.innerHTML = dataName);
          data.length === 1 && (contentRef.innerHTML = dataInfo);
        })
        .catch(function (error) {
          PNotify.error({
            title: 'Oh No!',
            text: 'Something terrible happened.',
          });
        })
        .finally(function () {
          // always executed
        });
    }
  }, 500),
);

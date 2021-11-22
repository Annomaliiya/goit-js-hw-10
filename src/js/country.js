'use strict';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import { DEBOUNCE_DELAY } from '../index.js';
import debounce from 'lodash.debounce';
import countryCardTemplate from '../templates/country-card.hbs';
import countryListTemplate from '../templates/country-list-item.hbs';

const inputValue = document.querySelector('#search-box');
const countryCardsWrapperEl = document.querySelector('.country-info');

const renderCountryCard = countryData => {
    countryCardsWrapperEl.innerHTML = countryCardTemplate(countryData[0]);
};
const renderCountryList = countryData => {
    countryCardsWrapperEl.innerHTML = countryListTemplate(countryData);
};

const onInput = (event) => {
    const country = document.querySelector('#search-box').value.trim();
    if (country) {
        fetchCountries(country)
            .then(countryData => {
                if (countryData.length > 10) {
                    Notify.info("Too many matches found. Please enter a more specific name.");
                }
                else if (countryData.length >= 2) {
                    renderCountryList(countryData);
                } else {
                    renderCountryCard(countryData);
                }
            })
            .catch(error => {
                Notify.failure("Oops, there is no country with that name");
            })
    }
    else {
        countryCardsWrapperEl.innerHTML = "";
    }
};
const doYourThingDebounced = debounce(onInput, DEBOUNCE_DELAY);
inputValue.addEventListener('input', doYourThingDebounced);


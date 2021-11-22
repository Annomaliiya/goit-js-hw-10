'use strict';
const BASE_URL = 'https://restcountries.com/v3.1/name/';
const PARAMS = '?fields=name,capital,population,flags,languages';

export const fetchCountries = (country) => {
    return fetch(`${BASE_URL}${country}${PARAMS}`).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }

        return response.json();
    });
};


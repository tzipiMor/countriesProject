import { hideLoading ,showLoading} from "./appCountries.js";
import CountriesClass from "./countriesClass.js";

let ar_allCountries = [];
let fiveCountries = [
    "israel",
    "united states",
    "thailand",
    "france",
    "united kingdom"
];

export const createCountries = (inputCountry, inputSort = "name.common") => {
    document.querySelector("#id_row").innerHTML = "";
    showLoading();
    let _arCountries = ar_allCountries.filter(item =>
        item.name.common.toLowerCase().includes(inputCountry.toLowerCase()));
        console.log(_arCountries);
        _arCountries = _.sortBy(_arCountries, inputSort);
        hideLoading();
    if (_arCountries.length > 0) {
        _arCountries.forEach(item => {
            let country = new CountriesClass("#id_row", item, getCountryByCode, createCountryByCode, showFiveCountries);
            country.previewRender();
        });
    }
    else {
        document.querySelector("#id_row").innerHTML = `<h2 class="text-warning">Country ${inputCountry} is not found</h2>`;
    }
}

export const createCountryByCode = (inputCountry) => {
    document.querySelector("#id_row").innerHTML = "";
    let countryItems = ar_allCountries.filter(item => 
        item.cca3.toLowerCase().includes(inputCountry.toLowerCase()));
    console.log(countryItems);
    if (countryItems.length > 0) {
        countryItems.forEach(item => {
            let countryItem = new CountriesClass("#id_row", item, getCountryByCode, createCountryByCode, showFiveCountries);
            countryItem.render();
        });
    } else {
        document.querySelector("#id_row").innerHTML = `<h2>Country ${inputCountry.countryName} is not found</h2>`;
    }
}

export const getCountries = (data) => {
    hideLoading();
    ar_allCountries = data;
}


export const getCountryByCode = async (code) => {
    let urlCode = `https://restcountries.com/v3.1/alpha/${code}`;
    let resp = await fetch(urlCode);
    let data = await resp.json();
    return data[0].name.common; // returns the name of a country by getting the country code.
}

export const showFiveCountries = () => {
    let tempFiveCountries = [];
    tempFiveCountries = ar_allCountries.filter(item => 
        fiveCountries.includes(item.name.common.toLowerCase()));
        console.log(tempFiveCountries);

    tempFiveCountries.forEach((item) => {
        let country = new CountriesClass("#id_row", item, getCountryByCode, createCountryByCode, showFiveCountries);
        country.previewRender();
    });
}

export const fillSelectBox = () => {
    let select = document.querySelector("#id_select");
    ar_allCountries.forEach(item => {
        select.innerHTML += `
        <option value="${item.name.common}">${item.name.common}</option>`;    
    });
}



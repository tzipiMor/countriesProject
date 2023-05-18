import { fillSelectBox, getCountries, showFiveCountries } from "./contriesManager.js";
import { declareEvents } from "./declareEvents.js";

const init = () => {
    doApi();
    declareEvents();
}
export  const showLoading = () => {
    document.querySelector("#id_loading").style.display = "block";
    document.querySelector("#id_row").style.display = "none";
}

export const hideLoading = () => {
    document.querySelector("#id_loading").style.display = "none";
    document.querySelector("#id_row").style.display = "flex";
}
const doApi = async() => {
    showLoading();
    let url = `https://restcountries.com/v3.1/all`;
    let resp  = await fetch(url);
    let data = await resp.json();
    console.log(data);
    getCountries(data);
    showFiveCountries();
    fillSelectBox();
}


init();


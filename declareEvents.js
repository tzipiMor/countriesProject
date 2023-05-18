import { createCountries, createCountryByCode, showFiveCountries } from "./contriesManager.js";

export const declareEvents = () => {

    let form = document.querySelector("#id_form");
    let input = document.querySelector("#id_input_country");
    let sort = document.querySelector("#sort_id");
    let select = document.querySelector("#id_select")
    let burger_btn = document.querySelector("#burger_btn");
    let nav_open = document.querySelector("#nav_open");
    let allCountries = document.querySelector("#all_id");
    let israel = document.querySelector("#israel_id");
    let usa = document.querySelector("#usa_id");
    let thailand = document.querySelector("#thailand_id");
    let uk = document.querySelector("#uk_id");
    let france = document.querySelector("#france_id");
    let row = document.querySelector("#id_row");

    allCountries.addEventListener("click", () => {
        createCountries("");
    })

    israel.addEventListener("click", () => {
        createCountryByCode("isr");
    })

    usa.addEventListener("click", () => {
        createCountryByCode("USA");
    })

    thailand.addEventListener("click", () => {
        createCountryByCode("tha");
    })

    uk.addEventListener("click", () => {
        createCountryByCode("gbr");
    })

    france.addEventListener("click", () => {
        createCountryByCode("fra");
    })

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        createCountries(input.value);
    })

    sort.addEventListener("change", () => {
        createCountries(input.value, sort.value);
    })

    burger_btn.addEventListener("click", () => {
        (nav_open.style.display != "block") ? nav_open.style.display = "block" : nav_open.style.display = "none";
    })

    select.addEventListener("change", () => {
        if (select.value != 0) {
            row.innerHTML = "";
            createCountries(select.value);
            input.value = select.value;
        }
    })
}
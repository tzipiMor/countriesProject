export default class CountriesClass {
    constructor(_parent, _item, getCountryByCode, createCountryByCode, showFiveCountries) {
        this.getCountryByCode = getCountryByCode;
        this.createCountryByCode = createCountryByCode;
        this.showFiveCountries = showFiveCountries;

        this.parent = _parent;
        this.countryName = _item.name.common;
        this.pop =  (Math.floor((_item.population / 1000000) * 100) / 100).toLocaleString();
        this.capital = _item.capital ? _item.capital : "none";
        this.flag = _item.flags.png;
        this.lat = _item.latlng[0];
        this.lon = _item.latlng[1];
        this.language = _item.languages ? Object.values(_item.languages).join() : "none";
        this.borders = _item.borders;
        this.code = _item.cca3;
        this.region = _item.region;
        this.coin = _item.currencies ? Object.keys(_item.currencies).join() : "none";
    }

    previewRender() {
        
    
        let div = document.createElement("div");
        div.className = "col-md-4 justify-content-beetween my-4";
        div.innerHTML = `
        <div class="mx-auto card d-lg-flex text-center h-100 w-75" id="card_id"> 
        <img class="p-2 overflow-hidden" src=${this.flag} width="100%" height="200px" alt="${this.countryName}">
        <h2>${this.countryName}</h2>
        <p>population: ${this.pop} M</p>
        <p>region: ${this.region}</p>
        <button class="btn btnRender ">press for more information</button>
        </div>`;
        div.querySelector("#card_id").addEventListener("click", () => {
            document.querySelector("#id_row").innerHTML = "";
            this.render();
        });
        document.querySelector(this.parent).append(div);
    }

    render() {
        let div = document.createElement("div");
        div.className = "container row justify-content-around";
        div.innerHTML = `
        <img src=${this.flag} class="float-start col-5 m-4" alt="${this.countryName}">
        <div class="col-md-6">
            <h1 class= "text-center m-2">${this.countryName}</h1>
            <table>
                <tr>
                    <td>population: </td>
                    <td> ${this.pop} M </td>
                </tr>
                <tr>
                    <td>region: </td>
                    <td>${this.region}</td>
                </tr>
                <tr>
                    <td>Languages: </td>
                    <td>${this.language}</td>
                </tr>
                <tr>
                    <td>Coins: </td>
                    <td>${this.coin}</td>
                </tr>
                <tr>
                    <td>Capital: </td>
                    <td>${this.capital}</td>
                </tr>
                <tr>
                    <td>States with borders: </td>
                    <td id="id_border"></td>
                </tr>

            </table>
            <button id="id_back" class="m-2 align-items-center">Back</button>
        </div>
        <iframe class="m-5 col-12" height="400"
            src="https://maps.google.com/maps?q=${this.lat},${this.lon}&z=7&ie=UTF8&iwloc=&output=embed" frameborder="0"
            scrolling="no" marginheight="0" marginwidth="0"></iframe>
            `;

        div.querySelector("#id_back").addEventListener("click", () => {
            document.querySelector("#id_row").innerHTML = "";
            this.showFiveCountries();
        });

        if (this.borders) {
            this.borders.forEach(async(item) => {
                let nameOfCountry = await this.getCountryByCode(item);
                let span = document.createElement("span");
                span.className = "lank p-2";
                span.innerHTML = ` ${nameOfCountry}`;
                document.querySelector("#id_border").append(span);
                span.addEventListener("click", () => {
                    this.createCountryByCode(item);
                })
            });
        }
        else {
            div.querySelector("#id_border").innerHTML += "no borders exist";

        }
        document.querySelector(this.parent).append(div);
    }
}
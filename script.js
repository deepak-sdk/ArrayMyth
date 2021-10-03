const allCountries = () => {
  const xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    "https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json"
  );

  xhr.responseType = "json";

  xhr.onload = () => {
    const allcountrieshere = xhr.response;


    // a.   Get all the countries from Asia continent /region using Filter function

    var Asia = allcountrieshere.filter((country) => country.region == "Asia");
    console.log(Asia);

    // for (let key in Asia) {
    //   console.log(Asia[key].name);
    // }

    // b.   Get all the countries with a population of less than 2 lakhs using Filter function

    var Population = allcountrieshere.filter(
      (country) => country.population < 200000
    );
    console.log(Population);

    // for(let key in Population){
    //     console.log(Population[key].name)
    // }

    // c.   Print the following details name, capital, flag using forEach function

    Object.entries(allcountrieshere).forEach((entry) => {
      const [key, value] = entry;
      console.log("Name of the country : "+ value.name);
      console.log("Capital of the country : "+ value.capital);
      console.log("Flag of the country : "+ value.flag);
    });

    // d.   Print the total population of countries using reduce function

    var TotalPopulation = allcountrieshere.reduce(
      (a, { population: b }) => (a += b),
      0
    );
    console.log("Total population of countries : " + TotalPopulation);

    // function TotalPopulation(allcountrieshere) {
    //     return allcountrieshere.map(x => x.population).reduce((acc, y) => acc + y)
    // }
    // console.log(TotalPopulation())

    // e.   Print the country which uses US Dollars as currency.

    var USDollar = allcountrieshere.filter(
    (country) => country.currencies[0].code === "USD"
    );
    console.log(USDollar);
    
     for( countries in allcountrieshere){
      let name = allcountrieshere[countries].name;

      let lat = allcountrieshere[countries].latlng[0];
      // console.log(lat);
      let lng = allcountrieshere[countries].latlng[1];
      // console.log(lng)
      let URL_Link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=0fc028fb793762c36fa57dd9422be937`;
      temperature(name, URL_Link);
    
    }
  };

  xhr.send();
};

function temperature(name, URL_Link) {
  var req = new XMLHttpRequest();

  req.open("POST", URL_Link, true);
  req.send();
  req.onload = function () {
    try {
      var country_details = JSON.parse(this.response);
      console.log(`${name} : ${country_details.main.temp}`);
    } catch (e) {
      console.log("Error : " + e);
    }
  };
}
allCountries();

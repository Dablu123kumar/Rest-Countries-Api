const contriesContainer = document.querySelector('.countries_container')
const filterByRegion = document.querySelector('.filter')
const searchInput = document.querySelector('.search-container input')
const DarkMode = document.querySelector('.theme-changer')
const LightMode = document.querySelector('.theme-changer1')
let allCountriesData 

fetch('https://restcountries.com/v3.1/all')
.then((res) => res.json())
// .then(renderContries)   //1st method
.then((data) => { 
     console.log(data)   //2nd method
     renderContries(data)
     allCountriesData = data
}) 

filterByRegion.addEventListener('change',(e) => {
     
fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
.then((res) => res.json())
// .then(renderContries)     //1st method
.then((data) => {
     renderContries(data)   //2nd method
}) 
})

function renderContries(data){
     contriesContainer.innerHTML = ''
     data.forEach((country) => {
         //console.log(country)
         const countryCard = document.createElement('a')
         countryCard.classList.add('conuntrycard')
         countryCard.href =`./country.html?name=${country.name.common}`
 
         countryCard.innerHTML = `
              <img src="${country.flags.svg}" alt="${country.name.common}">
                <div class="cardText">
                     <h3>${country.name.common}</h3>
                     <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                     <p><b>region: </b>${country.region}</p>
                     <p><b>Capital: </b>${country.capital}</p>
                </div>
           `
           contriesContainer.append(countryCard)
     });
}

searchInput.addEventListener('input',(e) => {

     const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
     renderContries(filteredCountries)
})

DarkMode.addEventListener('click',() => {
     document.body.classList.add('dark')
     DarkMode.classList.add('darkM')
     LightMode.classList.add('light')
     
})

LightMode.addEventListener('click',() => {
     document.body.classList.remove('dark')
     DarkMode.classList.remove('darkM')
     LightMode.classList.remove('light')
    
     
})



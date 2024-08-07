
const DarkMode = document.querySelector('.theme-changer')
const LightMode = document.querySelector('.theme-changer1')
 const countryName = new URLSearchParams(window.location.search).get(`name`)
 const flagImage = document.querySelector('.details-container img')
 const countryNameH1 = document.querySelector('.details h2')
 const nativeName = document.querySelector('.native-name')
 const population = document.querySelector('.population')
 const Region = document.querySelector('.region')
 const subRegion = document.querySelector('.sub-region')
 const Capital = document.querySelector('.capital')
 const TLDomain = document.querySelector('.tld')
 const Currencies = document.querySelector('.currencies')
 const Languages = document.querySelector('.languages')
 const borderContries = document.querySelector('.border-countries')
//  console.log(countryName)
 fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
 .then((res) => res.json())
 .then(([country]) => {
   flagImage.src = country.flags.svg
   countryNameH1.innerText = country.name.common
   population.innerText = country.population.toLocaleString('en-IN')
   Region.innerText = country.region 
    
   
   TLDomain.innerText = country.tld.join(', ')
   if(country.capital){
      Capital.innerText = country.capital?.[0]
   }
   if(country.subregion){
      subRegion.innerText =country.subregion
   }
   if(country.name.nativeName){
      nativeName.innerText = Object.values(country.name.nativeName)[0].common
   }
   else{
      nativeName.innerText= country.name.common
   }
   if(country.currencies){
      Currencies.innerText = Object.values(country.currencies).map((currency) => currency.name)
   }
   if(country.languages){
      Languages.innerText = Object.values(country.languages).join(', ')
   }

   if(country.borders){
      country.borders.forEach((border) => {
         // console.log(border)
         fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res) => res.json())
         .then(([borderContry]) => {
            const borderCountriesTag = document.createElement('a')
            borderCountriesTag.innerText = borderContry.name.common
            borderCountriesTag.href =`./country.html?name=${borderContry.name.common}`

            borderContries.append(borderCountriesTag)
            
         })
      })
   }
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




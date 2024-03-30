const addCommasToInteger =(number) =>
    {
        let str = number.toString();
        str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return str;
    }

    if (window.location.pathname === '/index.html') 
{

const loadCountries = async () => 
{
    try 
    {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        
        const countriesGrid = document.querySelector('.countries-grid');

        data.forEach(country =>     
        {
            if (country.name.common!='Palestine')
            {
            const countryElement = document.createElement('a');
            countryElement.href = "details.html?data="+country.name.common.toString();
            countryElement.classList.add('country', 'scale-effect');
            countryElement.dataset.countryName = country.name.common;
            countryElement.dataset.countryRegion = country.region;

            countryElement.innerHTML = 
            `<div class="country-flag">
                    <img src="${country.flags.svg}" alt="${country.name.common} Flag">
                </div>
                <div class="country-info">
                    <h2 class="country-title">${country.name.common}</h2>
                    <ul class="country-brief">
                        <li><strong>Population: </strong>${addCommasToInteger(country.population)}</li>
                        <li><strong>Region: </strong>${country.region}</li>
                        <li><strong>Capital: </strong>${country.capital}</li>
                    </ul>
                </div>`;
 
                countriesGrid.appendChild(countryElement);
            }
        });

    }
    catch (error)
    {
        alert(error);
    }
}

loadCountries();

let filterFlag=0;

document.addEventListener('DOMContentLoaded', function () {
    
    const regionFilterHeader = document.querySelector('.dropdown-header');
    const regionDropdown = document.querySelector('.dropdown-body');

    regionFilterHeader.addEventListener('click', function () 
    {
        if (filterFlag == 0)
        {
            regionDropdown.style.opacity = '1';
            filterFlag=1;
        }
        else
        {
            regionDropdown.style.opacity = '0';
            filterFlag=0;
        }
    });

    const allRegion = document.getElementById('all');
    const africaRegion = document.getElementById('africa');
    const americasRegion = document.getElementById('america');
    const asiaRegion = document.getElementById('asia');
    const europeRegion = document.getElementById('europe');
    const oceaniaRegion = document.getElementById('oceania');
   
    allRegion.addEventListener('click', function () 
    {
        if(regionDropdown.style.opacity==='1')
        {
            showAll();
        }
    });

    africaRegion.addEventListener('click', function () 
    {
        if(regionDropdown.style.opacity==='1')
        {
            filterCountriesByRegion('africa');
        }
    });

    americasRegion.addEventListener('click', function () 
    {
        if(regionDropdown.style.opacity==='1')
        {
            filterCountriesByRegion('americas');
        }
    });

    asiaRegion.addEventListener('click', function () 
    {
        if(regionDropdown.style.opacity==='1')
        {
            filterCountriesByRegion('asia');
        }
    });
    
    europeRegion.addEventListener('click', function () 
    {
        if(regionDropdown.style.opacity==='1')
        {
            filterCountriesByRegion('europe');
        }
    });

    oceaniaRegion.addEventListener('click', function () 
    {
        if(regionDropdown.style.opacity==='1')
        {
            filterCountriesByRegion('oceania');
        }
    });

    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();
        filterCountries(searchTerm);
    });
});

filterCountries = (searchTerm) => {
    const countries = document.querySelectorAll('.country');
    countries.forEach(function (country) {
        const countryName = country.dataset.countryName.toLowerCase();
        if (countryName.includes(searchTerm)) {
            country.style.display = 'block';
        } else {
            country.style.display = 'none';
        }
    });
}

filterCountriesByRegion = (region) =>{
    const countries = document.querySelectorAll('.country');
    countries.forEach(function (country) {
        const countryReg = country.dataset.countryRegion.toLowerCase();
        if (countryReg === region) 
        {
            country.style.display = 'block';
        } else {
            country.style.display = 'none';
        }
    });
}
 
showAll = () =>
{
    const countries = document.querySelectorAll('.country');
    
    countries.forEach(function (country) 
    {
        country.style.display = 'block';
    });
}

}//end of the main page javascript

if (window.location.pathname === '/details.html') 
{
const queryParams = new URLSearchParams(window.location.search);
const countryName = queryParams.get('data');

const getCountry = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();

        const countryDetails = document.querySelector('.main');

        countries.forEach(country => {
            
            if (countryName===country.name.common)
            {
                const CountryHtml = document.createElement('div');
                CountryHtml.classList.add('container');

                let commonName;
                //geting the common name of the country
                if (country.name.common!='Israel')
                {
                    for (let language in country.name.nativeName)
                    {
                    commonName = country.name.nativeName[language].common;
                    break;
                    }
                }
                else//i wanted the hebrew name!
                {
                    commonName= country.name.nativeName.heb.common;
                }

                let currencyName;
                //geting the currency name of the country
                for (let currencyCode in country.currencies) {
                    currencyName = country.currencies[currencyCode].name;
                    break;
                }
                
                CountryHtml.innerHTML = 
                    `<div class="flag-container">
                    <img src="${country.flags.svg}" alt="${country.name.common} Flag" class="flag">
                    </div>
                    <div class="details-container">
                        <h1 class="title">${country.name.common}</h1>
                        <ul class="details">
                            <li><strong>Native Name: </strong>${commonName}</li>
                            <li><strong>Population: </strong>${addCommasToInteger(country.population)}</li>
                            <li><strong>Region: </strong>${country.region}</li>
                            <li><strong>Sub Region: </strong>${country.subregion}</li>
                            <li><strong>Capital: </strong>${country.capital}</li>
                            <li><strong>Top Level Domain: </strong>${country.tld.join(', ')}</li>
                            <li><strong>Currencies: </strong>${currencyName}</li>
                            <li><strong>Languages: </strong>${Object.values(country.languages)}</li>
                            </ul>
                            </div>`;
 
                countryDetails.appendChild(CountryHtml);
            }
        });
    } catch (error) {
        alert(error);
    }
}

getCountry();


}

















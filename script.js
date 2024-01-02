document.addEventListener('DOMContentLoaded', function () {
    // Fetch countries data and create cards
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(countries => {
        const countryCardContainer = document.getElementById('countryCardContainer');
  
        countries.forEach(country => {
          const card = createCountryCard(country);
          countryCardContainer.appendChild(card);
        });
      })
      .catch(error => console.error('Error fetching countries:', error));
  
    // Function to create a country card
    function createCountryCard(country) {
      const { name, flags, capital, region, languages, alpha2Code } = country;
      const card = document.createElement('div');
      card.className = 'card mb-3';
  
      const header = document.createElement('div');
      header.className = 'card-header';
      header.innerText = name.common;
  
      const body = document.createElement('div');
      body.className = 'card-body';
  
      const flagImg = document.createElement('img');
      flagImg.className = 'card-img-top';
      flagImg.src = flags.svg;
      flagImg.alt = `${name.common} flag`;
  
      const capitalInfo = createCardInfoElement('Capital', capital[0]);
      const regionInfo = createCardInfoElement('Region', region);
      const languageInfo = createCardInfoElement('Language', Object.values(languages).join(', '));
      const codeInfo = createCardInfoElement('Country Code', alpha2Code);
  
      const weatherButton = createWeatherButton(alpha2Code);
  
      body.appendChild(flagImg);
      body.appendChild(capitalInfo);
      body.appendChild(regionInfo);
      body.appendChild(languageInfo);
      body.appendChild(codeInfo);
      body.appendChild(weatherButton);
  
      card.appendChild(header);
      card.appendChild(body);
  
      return card;
    }
  
    // Function to create card info element
    function createCardInfoElement(label, value) {
      const infoElement = document.createElement('p');
      infoElement.className = 'card-text';
      infoElement.innerHTML = `<strong>${label}:</strong> ${value}`;
      return infoElement;
    }
  
    // Function to create weather button
    function createWeatherButton(countryCode) {
      const button = document.createElement('button');
      button.className = 'btn btn-primary';
      button.innerText = 'Click for Weather';
      button.addEventListener('click', () => {
        // Fetch weather data and display it (you need to replace 'YOUR_OPENWEATHER_API_KEY' with your actual API key)
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryCode}&appid=YOUR_OPENWEATHER_API_KEY`)
          .then(response => response.json())
          .then(weatherData => {
            // Process and display weather data as needed
            console.log('Weather Data:', weatherData);
          })
          .catch(error => console.error('Error fetching weather data:', error));
      });
      return button;
    }
  });
  
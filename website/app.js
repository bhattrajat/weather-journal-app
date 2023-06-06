/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

const apiKey = '5f34b76a845e82eff4f80c95aecf47a2';

const serverUrl = 'http://127.0.0.1:3000';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const getWeatherData = async () => {
  const zip = document.getElementById('zip').value;
  const res = await fetch(`${baseURL}?zip=${zip},&appid=${apiKey}`);
  const weatherData = await res.json();
  console.log(weatherData);
  return weatherData;
};

const postData = async (path, postPayload) => {
  await fetch(`${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: postPayload,
  });
};

const renderUI = async () => {
  const res = await fetch(`${serverUrl}/recent`);
  const data = await res.json();
  document.getElementById('date').innerHTML = data.newDate;
  document.getElementById('temp').innerHTML = data.temp + ' Kelvin';
  document.getElementById('content').innerHTML = data.userResponse;
  return data;
};

const generateButton = document.getElementById('generate');
generateButton.addEventListener('click', async () => {
  const weatherData = await getWeatherData();
  const userResponse = document.getElementById('feelings').value;
  const {
    main: { temp },
  } = weatherData;
  const postPayload = JSON.stringify({ temp, newDate, userResponse });
  const path = `${serverUrl}/addData`;
  await postData(path, postPayload);
  await renderUI();
});

const form = document.querySelector("form");
const input = document.querySelector("input");
const result1 = document.querySelector(".result1");
const result2 = document.querySelector(".result2");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const search = input.value;
  result1.innerHTML = "";
  result2.innerHTML = "Loading...";
  fetch(`/weather?address=${search}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        result2.innerHTML = "";
        result1.innerHTML = `${data.error}`;
        input.value = "";
      } else {
        manageData(data);
      }
    });
});

function manageData({ location, forecast } = {}) {
  result2.innerHTML = `<span>Location</span> : ${location} <br/> <span>Weather Description</span> : ${forecast.weather_description}<br/>
  <span>Current Temperature</span> : ${forecast.current}<br/>
  <span>FeelsLike</span> : ${forecast.feelslike}`;
  input.value = "";
}

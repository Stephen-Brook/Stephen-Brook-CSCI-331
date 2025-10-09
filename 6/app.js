// js/app.js
const getBtn = document.getElementById("getBtn");
const apiData = document.getElementById("apiData");

let url = "https://randomuser.me/api";

getBtn.addEventListener("click", getUser);

// fetch first user on load
getUser();

function getUser() {
    fetch(url).then(decodeData).then(success, fail);
}

function decodeData(response) {
    if (response.ok) {
        apiData.innerHTML = "response is " + response.status;
        return response.json();
    } else {
        throw response.status;
    }
}

function success(userData) {
    const u = userData.results[0];

    // show a quick card
    apiData.innerHTML = `
    <img class="user" src="${u.picture.large}" alt="random user">
    <h2 class="user">Meet ${u.name.first} ${u.name.last}</h2>
    <p class="meta">
      <strong>From:</strong> ${u.location.city}, ${u.location.country}<br>
      <strong>Email:</strong> ${u.email}<br>
      <strong>Age:</strong> ${u.dob.age}
    </p>
  `;

    // build hidden form fields for PHP add.php
    const apiform = document.querySelector("form");
    apiform.innerHTML = `
    <input type="hidden" name="first" value="${u.name.first}"/>
    <input type="hidden" name="last" value="${u.name.last}"/>
    <input type="hidden" name="country" value="${u.location.country}"/>
    <input type="hidden" name="city" value="${u.location.city}"/>
    <input type="hidden" name="email" value="${u.email}"/>
    <input type="hidden" name="age" value="${u.dob.age}"/>
    <input type="hidden" name="picture" value="${u.picture.large}"/>
    <input type="submit" id="addBtn" class="btn" value="Add This One">
  `;
}

function fail(error) {
    apiData.innerHTML = "Something went wrong with parsing JSON.";
    const mdnCodes = "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status";
    apiData.innerHTML += `<br>The problem: <a href="${mdnCodes}">${error} Error</a>`;
}
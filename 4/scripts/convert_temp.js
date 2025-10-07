window.addEventListener("DOMContentLoaded", domLoaded);

// When the DOM has finished loading, add the event listeners.
function domLoaded() {
   // TODO: Use addEventListener() to register a click event handler for the convert button.
   // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#add_a_simple_listener

   // Add event listeners to handle clearing the box that WAS NOT clicked,
   // e.g., the element C_in listens for 'input', with a callback fn to
   // execute after that event does happen. 
   // You don't send arguments to the event handler function.
   // So, if you want the event handler to call another function that
   // DOES take arguments, you can send that other function as a callback.
   // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#event_listener_with_anonymous_function
   // Here is an example of anonymous event handler fn that calls alert with an argument:
   // document.getElementById("weatherIcon").addEventListener("click", function() {alert("You clicked the icon.")})

   const button = document.getElementById("convertButton");
   const fIn = document.getElementById("F_in");
   const cIn = document.getElementById("C_in");
   const message = document.getElementById("message");

   button.addEventListener("click", conversion);

   //if the user enters a temperature in the C box, reset the F value
   cIn.addEventListener("input", function () {
      fIn.value = "";
      message.textContent = "";
   });
   
   //if the user enters a temperature in the F box, reset the C value
   fIn.addEventListener("input", function () {
      cIn.value = "";
      message.textContent = "";
   });

}

function conversion() {
   const fIn = document.getElementById("F_in");
   const cIn = document.getElementById("C_in");
   const message = document.getElementById("message");

   const fString = fIn.value.trim();
   const cString = cIn.value.trim();

   const hasF = fString != "";
   const hasC = cString != "";

   //if the user has a temperature in C and F (this likely means they just hit the button)
   if (hasF && hasC) {
      fIn.value="";
      cIn.value="";
      updateWeatherIcon(null);
   }

   //if the user has not entered a temperature
   if (!hasF && !hasC) {
      message.textContent = "Enter a temperature to convert";
      updateWeatherIcon(null);
   }

   //if the user has entered a temperature in one field or the other
   if (hasC) {
      const C = parseFloat(cString);
      //check that the temperature is valid, update message and icon accordingly
      if (isNaN(C)) {
         message.textContent = "Please enter a valid number";
         updateWeatherIcon(null);
         return;
      }
      //convert the temperature, display the conversion, and update the icon
      const F = convertCtoF(C);
      fIn.value = F;
      message.textContent = `${C} °C = ${F} °F`;
      updateWeatherIcon(F);
      return;
   }

   if (hasF) {
      const F = parseFloat(fString);
      //check that the temperature is valid, update the message and icon accordingly
      if (isNaN(F)) {
         message.textContent = "Please enter a valid number";
         updateWeatherIcon(null);
         return;
      }
      //convert the temperature, display the conversion, and update the icon
      
      const C = convertFtoC(F);
      cIn.value = C;
      message.textContent = `${F} °F = ${C} °C`;
      updateWeatherIcon(F);
      return;
   }
}
// TODO: (Part of the above is to write the functions to be executed when the event handlers are invoked.)

function convertCtoF(C) {
   // TODO: Return temp in °F. 
   // °F = °C * 9/5 + 32
   return C * 9 / 5 + 32;
}

function convertFtoC(F) {
   // TODO: Return temp in °C. 
   // °C = (°F - 32) * 5/9
   return (F - 32) * 5 / 9;
}

// TODO: write a fn that can be called with every temp conversion
// to display the correct weather icon.
// Based on degrees Fahrenheit:
// 32 or less, but above -200: cold
// 90 or more, but below 200: hot
// between hot and cold: cool
// 200 or more, -200 or less: dead
// both input fields are blank: C-F

//this funciton will only work with F, so we have to make sure to pass F
function updateWeatherIcon(temperature) {
   const icon = document.getElementById("weatherIcon");

   if (temperature === null || temperature === undefined || isNaN(temperature)) {
      icon.src = "images/C-F.png";
      icon.alt = "C and F";
      return;
   }

   if (temperature >= 200 || temperature <= -200) {
      icon.src = "images/dead.png";
      icon.alt = "dead";
   }
   else if (temperature <= 32) {
      icon.src = "images/cold.png";
      icon.alt = "cold";
   }
   else if (temperature >= 90) {
      icon.src = "images/hot.png";
      icon.alt = "hot";
   }
   else {
      icon.src = "images/cool.png";
      icon.alt = "cool";
   }
}
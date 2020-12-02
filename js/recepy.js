const BASE_SERVER_URL =
  "http://gruppe-49.developerakademie.com/sebastian/";

  let infoRecepy = [];


function showRecepyInfo(){

  for(let i = 0; i<infoRecepy.length; i++){

    RecepyInfo = createRecepyInfo(

      infoRecepy[i].image,
      infoRecepy[i].recepy,
      infoRecepy[i].category,
      infoRecepy[i].preperation_time,
      infoRecepy[i].calories,
      infoRecepy[i].difficulty,
      infoRecepy[i].price,
      i


    );

     document
       .getElementById("category")
       .insertAdjacentHTML("beforeend", RecepyInfo);


  }



}  


function createRecepyInfo(
  picture_url,
  recepy_name,
  category,
  preperation_time,
  calories,
  difficulty,
  price,
  i
) {
 

  let RecepyInfo = `<div class="recepy">
     <img src =${picture_url}>
     <h3>${recepy_name}</h3>
     <h6>${category}</h6>
     <hr class="hr-recepy">
     <div class="recepy-child">
      <p><img class="img-icon" src="img/clock.png" >${preperation_time}</p>
      <p><img class="img-icon" src="img/calories-calculator.png">${calories}</p>
     </div>
     <div class="recepy-child">
       <p><img class="img-icon" src="img/levels.png" alt="">${difficulty}</p>
       <p><img class="img-icon" src="img/euro.png">${price}/3</p>
     </div>
     <hr class="hr-recepy">
     <button onclick="openRecepy(${i})" type="button" class="btn btn-success">Rezept öffnen</button>
  </div>`;
  

  return RecepyInfo;
}


function load() {
  loadJSONFromServer()
    .then(function (result) {
      //then(function (variable vom server))
      console.log("Laden erfolgreich!", result);
      infoRecepy = JSON.parse(result);
      showRecepyInfo();
    })
    .catch(function (error) {
      // Fehler
      console.error("Fehler beim laden!", error);
    });
}





function loadJSONFromServer() {
  return new Promise(function (resolve, reject) {
    let xhttp = new XMLHttpRequest();
    let proxy = determineProxySettings();
    let serverURL = proxy + BASE_SERVER_URL +"recepy.json";
    xhttp.open("GET", serverURL);

    xhttp.onreadystatechange = function (oEvent) {
      if (xhttp.readyState === 4) {
        //let response = JSON.parse(xhttp.responseText);
        if (xhttp.status >= 200 || xhttp.status <= 399) {
          resolve(xhttp.responseText);
        } else {
          reject(xhttp.statusText);
        }
      
      }
    };

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send();
  });
}



function determineProxySettings() {
  if (window.location.href.indexOf(".developerakademie.com") > -1) {
    return "";
  } else {
    return "https://cors-anywhere.herokuapp.com/";
  }
}







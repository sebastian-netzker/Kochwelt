



function loadRecepyList() {
  const urlParams = new URLSearchParams(window.location.search);

  const id = urlParams.get("recepy");

  loadJSONFromServer()
    .then(function (result) {
      //then(function (variable vom server))
      console.log("Laden erfolgreich!", result);
      infoRecepy = JSON.parse(result); 
      showRecepyListInfo(id);
    })
    .catch(function (error) {
      // Fehler
      console.error("Fehler beim laden!", error);
    });
}



function openRecepy(id) {
  window.location.href = "./recepy-list.html?recepy=" + id;
}





function showRecepyListInfo(id){

    let RecepyListInfo = createRecepyListInfo( infoRecepy[id].recepy,
    infoRecepy[id].image,
    infoRecepy[id].preperation_time,
    infoRecepy[id].difficulty,
    infoRecepy[id].calories,
    infoRecepy[id].price,
    infoRecepy[id].creator,


    );


    document
      .getElementById("addRecepy-List")
      .insertAdjacentHTML("beforeend", RecepyListInfo);





}








function createRecepyListInfo(
    recepy_name,
    picture_url,
    preperation_time,
    difficulty,
    calories,
    price,
    creator

){


    let RecepyListInfo = `<h1 class="h1-recepylist">${recepy_name}</h1>
    
    <div> 

    <img class="img-recepylist" src="${picture_url}" >

     <div class="recepylist-child">

            <p class="p-recepylist"> <img class="img-icon-recepylist" src="img/clock.png" alt=""> ${preperation_time}  min</p>
            <p class="p-recepylist"><img class="img-icon-recepylist" src="img/levels.png" alt="">${difficulty}</p>
            <p class="p-recepylist"> <img class="img-icon-recepylist" src="img/calories-calculator.png" alt="">${calories}</p>
            <p class="p-recepylist"><img class="img-icon-recepylist" src="img/euro.png" alt=""> ${price}/3</p>

        </div>

         <hr class="hr-recepy">


        <div class="div-number-ingridient">

            <p class="p-number-ingridient1"> Zutaten für  <button type="button" class="btn btn-recepylist btn-outline-success">+</button> 4 <button type="button" class="btn btn-recepylist btn-outline-success">-</button>  </p>
          <p class="p-number-ingridient2">Personen</p>

        </div> 

        <div id="div-ingridient" class="div-ingridient">
           
        </div>


        <hr class="hr-recepy">

        <div>

        <h3 class="h3-recepylist">Zubereitung</h3>


        <div class="div-preperation">

        </div>

        <hr class="hr-recepy">


         <div class="div-createrecepy">


             <h3 class="h3-recepylist">Rezept erstellt von </h3>

             <div class="div-flexbox">
             <img class="img-profile" src="img/profile.png" alt="">

             <h3 class="h3-creatorrecepy">${creator}</h3>
          </div>





        </div>
                          
    
    </div>`;

    return RecepyListInfo;
}



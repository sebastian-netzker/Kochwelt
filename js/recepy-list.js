

let number_portion = 4;

let new_portion = 1;




/**
 * This function load the recepy JSON from the Server
 */

function loadRecepyList() {
  const urlParams = new URLSearchParams(window.location.search);

  const id = urlParams.get("recepy");

  loadJSONFromServer()
    .then(function (result) {
      //then(function (variable vom server))
      console.log("Laden erfolgreich!", result);
      infoRecepy = JSON.parse(result);
      showRecepyListInfo(id);
      showIngridientsList(id);
      showPreparation(id);
      showRecepyCreator(id);
    })
    .catch(function (error) {
      // Fehler
      console.error("Fehler beim laden!", error);
    });
}





/**
 * This function create a new URL for each recepy
 * @param {number} id - This number show each id for the different recepy 
 */

function openRecepy(id) {
  window.location.href = "./recepy-list.html?recepy=" + id;
}


/**
 * This function show the recepy list info
 * @param {number} id - This number is the id for respective recepy
 */
function showRecepyListInfo(id) {
  let RecepyListInfo = createRecepyListInfo(
    infoRecepy[id].recepy,
    infoRecepy[id].image,
    infoRecepy[id].preperation_time,
    infoRecepy[id].difficulty,
    infoRecepy[id].calories,
    infoRecepy[id].price,
    infoRecepy[id].creator
  );

  document
    .getElementById("addRecepy-List")
    .insertAdjacentHTML("beforeend", RecepyListInfo);
}


/**
 * This function show the ingridients list
 * @param {number} id  - This number is the id for respective recepy
 */

function showIngridientsList(id) {
  for (let i = 0; i < infoRecepy[id].ingredients.length; i++) {
    if (i % 2 == 0) {
      IngridientsInfo = createIngridientsList1(
        infoRecepy[id].ingredients[i].name,
        infoRecepy[id].ingredients[i].portion ,
        infoRecepy[id].ingredients[i].unit
      );
    } else if (i % 2 != 0) {
      IngridientsInfo = createIngridientsList2(
        infoRecepy[id].ingredients[i].name,
        infoRecepy[id].ingredients[i].portion ,
        infoRecepy[id].ingredients[i].unit 
      );
    }

    document
      .getElementById("div-ingridient")
      .insertAdjacentHTML("beforeend", IngridientsInfo);
  }
}




/**
 * This function show the ingridients list when a button is clicked
 * @param {number} id - This number is the id for respective recepy 
 */

function showIngridientsListButton(id) {
  for (let i = 0; i < infoRecepy[id].ingredients.length; i++) {
    if (i % 2 == 0) {
      IngridientsInfo = createIngridientsList1(
        infoRecepy[id].ingredients[i].name,
        (infoRecepy[id].ingredients[i].portion) *new_portion,
        infoRecepy[id].ingredients[i].unit,
        i
      );
    } else if (i % 2 != 0) {
      IngridientsInfo = createIngridientsList2(
        infoRecepy[id].ingredients[i].name,
        (infoRecepy[id].ingredients[i].portion)*new_portion,
        infoRecepy[id].ingredients[i].unit,
        i
      );
    }

    

    document
      .getElementById("div-ingridient")
      .insertAdjacentHTML("beforeend", IngridientsInfo);
  }
}








/**
 * This function show the preperation
 * @param {number} id  - This number is the id for respective recepy 
 */


function showPreparation(id) {

  for(let i =0; i <infoRecepy[id].preperation.length; i++){
  
    Preparation = createPreparation(infoRecepy[id].preperation[i].preperation_step);

    document
      .getElementById("div-preparation")
      .insertAdjacentHTML("beforeend", Preparation);
  }
}


/**
 * This function show the recepy creator
 * @param {number} id  - This number is the id for respective recepy
 */


function showRecepyCreator(id) {
  
    Recepy_Creator = createRecepyCreator(
      infoRecepy[id].creator
    );

    document
      .getElementById("div-creator")
      .insertAdjacentHTML("beforeend",Recepy_Creator);
  
}


/**
 * This function create the recepy creator 
 * @param {string} creator - This string show the creator from the recepy
 */

function createRecepyCreator(creator) {

  let Recepy_Creator =  `<hr class="hr-recepy">

   <div class="div-createrecepy">

       <h3 class="h3-recepylist">Rezept erstellt von </h3>

      <div class="div-flexbox">
       <img class="img-profile" src="img/profile.png" alt="">

       <h3 class="h3-creatorrecepy">${creator}</h3>
     </div>`;

     return Recepy_Creator;




}

/**
 * This function create the preperation for the recepy
 * @param {string} preperation_step - This string show the different preperation steps
 */

function createPreparation(preperation_step) {
  let Preparation = `<p class="p-preperation"> ${preperation_step} </p>`;

  return Preparation;
}


/**
 * This function create the ingridients list for the even ingridient
 * @param {string} ingridient_even - This string show the name 
 * @param {number} ingridient_portion -  This number show the portion
 * @param {string} ingridient_unit  - This string show the unit
 */

function createIngridientsList1(
  ingridient_even,
  ingridient_portion,
  ingridient_unit
) {
  let IngridientsInfo = `
                        <span   class="span-white">${ingridient_portion } ${ingridient_unit}  ${ingridient_even}</span>`;

  return IngridientsInfo;
}

/**
 * This function create the ingridients list for the odd ingridient
 * @param {string} ingridient_odd - This string show the name
 * @param {number} ingridient_portion - This number show the portion
 * @param {string} ingridient_unit  - This string show the unit
 */

function createIngridientsList2(
  ingridient_odd,
  ingridient_portion,
  ingridient_unit
) {
  let IngridientsInfo = `<span   class="span-grey"> ${ingridient_portion } ${ingridient_unit}   ${ingridient_odd}</span>`;

  return IngridientsInfo;
}

/**
 * This function create the recepy list info 
 * @param {string} recepy_name - This string show the name
 * @param {string} picture_url - This string show the url fromt he pictures
 * @param {number} preperation_time - This number show the preperation time
 * @param {string} difficulty - This string show the difficulty
 * @param {number} calories - This number show the calories
 * @param {number} price - This number show the price
 */

function createRecepyListInfo(
  recepy_name,
  picture_url,
  preperation_time,
  difficulty,
  calories,
  price
) {
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

        <div class="div-number-ingridient-child">

            <p class="p-number-ingridient1"> Anzahl der Portionen: <p class="number_portion" id ="number_portion">  ${number_portion}</p> </p>

            </div>

            <div class="div-number-ingridient-child">

            <button onclick="increaseNumber()" type="button" class="btn btn-recepylist btn-outline-success">+</button>

             <button onclick="decreaseNumber()" type="button" class="btn btn-recepylist btn-outline-success">-</button> 

             </div>

            
            
          

        </div> 

       

        </div>`;

       // <button onclick="increaseNumber()" type="button" class="btn btn-recepylist btn-outline-success">+<///button><p class="number_portion" id="number_portion"> ${number_portion}<p> <button onclick="decreaseNumber()//" type="button" class="btn btn-recepylist btn-outline-success">-</button> 


             
         // <p class="p-number-ingridient2">Personen</p>

 

  return RecepyListInfo;
}


/**
 * This function increase the number of portions 
 */

function increaseNumber() {

  document.getElementById('div-ingridient').innerHTML = '';
  number_portion++;
  document.getElementById('number_portion').innerHTML = number_portion;

  new_portion = number_portion - 3;

  const urlParams = new URLSearchParams(window.location.search);

  const id = urlParams.get("recepy");

 showIngridientsListButton(id);

 


  if(number_portion > 12 ){

    number_portion = 12;
    document.getElementById("number_portion").innerHTML = number_portion;
  } 
  

}



/**
 * This function decrease the number of portions
 */

function decreaseNumber() {

   document.getElementById("div-ingridient").innerHTML = "";
  number_portion--;
  document.getElementById("number_portion").innerHTML = number_portion;


    new_portion = number_portion - 2;

    const urlParams = new URLSearchParams(window.location.search);

    const id = urlParams.get("recepy");

    showIngridientsListButton(id);



   if (number_portion < 4) {
     number_portion = 4;
     document.getElementById("number_portion").innerHTML = number_portion;
   } 
  

    
}


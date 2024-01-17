


async function getGame(category){

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd7d3706fd2msh4f83c413bdd8100p115ebejsn03ed39db83a9',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }

}

    var api= await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?platform=browser&category=${category}&sort-by=release-date`,options);
    var response= await api.json();
    // console.log(response);






    var cols ="";
 for ( var i = 0; i < response.length ; i++ ){

    // console.log(response[i].thumbnail);
    
;

    cols+=`

<div class="col-md-3 mb-5" id="card-content">
<div class="card h-100" style="width: 18rem;"  onclick=handleCardClick(event) ">
  <figure class="">
    <img class="card-img-top object-fit-cover h-100" data-game-id="${response[i].id}" src="${response[i].thumbnail}" alt="...">
  </figure>

  <div class="card-body">
    <figcaption class="mb-4">
      <div class= "hstack justify-content-between">
        <h6 class="small card-title">${response[i].title}</h6>
        <span class="badge text-bg-primary p-2">Free</span></div>
    </figcaption>
      
    <p class="card-text text-center">${response[i].short_description}</p>
  </div>
   <footer class="custom-border p-3 d-flex justify-content-between">
    <span class="badge bagdge-color">${response[i].gener}</span>
    <span class="badge badge-color">${response[i].platform}</span>
    
  </footer>
</div>
</div>`


}


document.getElementById("gameData").innerHTML= cols;
}



// Function to load the default category on page load
async function loadDefaultCategory() {
    const defaultCategory = 'mmorpg';
    await getGame(defaultCategory);
}

// Call the function to load the default category on page load
loadDefaultCategory();
var navElement= document.querySelectorAll("li a");

for(var i =0 ; i< navElement.length; i++){

  navElement[i].addEventListener("click",function(e){
console.log(e.target.getAttribute("data-category"));

var category= e.target.getAttribute("data-category");
getGame(category);

let activNav = document.querySelector(".active")

activNav.classList.remove("active")
e.target.classList.add("active")

             })
}



// <<<<<<<<<<<<<<<second api  >>>>>>>>>>>>>>>>>>>>

// var cardSelect = document.getElementsByClassName("card");

// console.log(cardSelect);
// for(var i =0 ; i< cardSelect.length; i++){

//     cardSelect[i].addEventListener("click", function(e){

//         if (e.target.classList.contains("card")) {
//             console.log("hi");
//         }
//     })
// }


// Function to handle card click
async function handleCardClick(e) {
  
document.querySelector("#lighboxcontainer").style.display ="flex";
//  console.log("Clicked element data-game-id:", e.target.getAttribute("data-game-id"));
var gameId = e.target.getAttribute("data-game-id");



    // Get Details for the Game card
    var detailResponse = await getDetails(gameId);

document.querySelector("#lightboxitem").innerHTML = `
<i id="close" onclick="closeButton()" class="fa-regular fa-circle-xmark"></i>

<div class="row">
  <div class="col-md-4">

    <h1 class="text-center h3 py-4">${detailResponse.title}</h1>
    <img class=" displayImag"  src="${detailResponse.thumbnail}" alt="">

  </div>
<div class="col-md-8">

  <div>
    <h3>Title: ${detailResponse.title}</h3>
    <p>Category: <span class="badge text-bg-info">${detailResponse.genre} </span> </p>
    <p>Platform: <span class="badge text-bg-info"> ${detailResponse.platform}</span> </p>
    <p>Status: <span class="badge text-bg-info"> ${detailResponse.status}</span> </p>
    <p class="small">${detailResponse.description}</p>

      <a class="btn btn-outline-warning" target="_blank" href="${detailResponse.game_url}">Show Game</a>

  </div>
</div> 


</div> `

//  console.log("Clicked element data-game-id:", e.target.getAttribute("data-game-id"));


}



// Close Buttone code 

function closeButton(){
  var closeButton = document.getElementById("close");
    // console.log("Close button clicked");
    document.querySelector("#lighboxcontainer").style.display ="none";
}
/*
closeButton.addEventListener("click", function(){
    console.log("Close button clicked");
    document.querySelector("#lighboxcontainer").style.display ="none";
});

*/


// Get Details for the Game card
async function getDetails(gameId){

  const options2 = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd7d3706fd2msh4f83c413bdd8100p115ebejsn03ed39db83a9',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };
    var api2= await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`,options2);
  var detailResponse= await api2.json();
  console.log(detailResponse);
  return detailResponse;


}



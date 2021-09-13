const tabItems = document.querySelectorAll('.tab-item');
const tabContentItems = document.querySelectorAll('.tab-content-item');

// Select tab content item
function selectItem(e) {
	// Remove all show and border classes
	removeBorder();
	removeShow();
	// Add border to current tab item
	this.classList.add('tab-border');
	// Grab content item from DOM
	const tabContentItem = document.querySelector(`#${this.id}-content`);
	// Add show class
	tabContentItem.classList.add('show');
}
// Remove bottom borders from all tab items
function removeBorder() {
	tabItems.forEach(item => {
	item.classList.remove('tab-border');});}

// Remove show class from all content items
function removeShow() {
	tabContentItems.forEach(item => {
	item.classList.remove('show');});}

// Listen for tab item click
tabItems.forEach(item => {
	item.addEventListener('click', selectItem);});

// Fetching

fetch('../last_added.json')
	.then(data => data.json())
	.then(success => lastAddedTab(success));

fetch('../favorite.json')
	.then(data => data.json())
	.then(success => favoriteTab(success));

fetch('../movies.json')
	.then(data => data.json())
	.then(success =>allMovies(success));
// ------Function for fetched info-------

// function for adding content to last added tab
function lastAddedTab(success){
		for (let i in success) {

		let unit = success[i];

		let name = unit["name"];
		let url_img = unit["url_img"];
		let year = unit["year"];
		let imdb = unit["imdb"];
		let category = unit["category"];
		let primary = category["primary"];


		let div = document.createElement("div")

		div.innerHTML = `<div>
			<div style="background-image: url('${url_img}');" class=" black-widow">
				<div class="dimmed-bg">
				<p class="text-center"><button onclick="favBtnFunction(this.id)" class="favBtn" id="${name}"><i  class="fa fa-heart-o fa-2x"></i></button></p>
				<p  class="text-center text-md">${imdb}/10</p>
				<p  class="text-center text-md">${primary}</p>
				<button onclick="window.location.href='./about.html'" id="${name}" class="btn m-auto text-md">Detaljnije</button>
				</div>
				</div>
				<p>${name}</p>
				<p class="text-secondary">${year}</p>
			</div>
			`
		let tab1 = document.querySelector("#tab1");

		tab1.appendChild(div);
		}
}
// Function for adding content to most popular tab
function favoriteTab(success){
	for (let i in success) {

		let unit = success[i];

		let name = unit["name"];
		let url_img = unit["url_img"];
		let year = unit["year"];
		let imdb = unit["imdb"];
		let category = unit["category"];
		let primary = category["primary"];

		let div = document.createElement("div")

		div.innerHTML = `<div>
				<div style="background-image: url('${url_img}');" class=" black-widow">
				<div class="dimmed-bg">
				<p class="text-center"><button onclick="favBtnFunction(this.id)" class="favBtn" id="${name}"><i  class="fa fa-heart-o fa-2x"></i></button></p>
				<p  class="text-center text-md">${imdb}/10</p>
				<p  class="text-center text-md">${primary}</p>
				<button onclick="window.location.href='./about.html'" id="${name}" class="btn m-auto text-md">Detaljnije</button>
				</div>
				</div>
				<p>${name}</p>
				<p class="text-secondary">${year}</p>
				</div>
				`
		let tab2 = document.querySelector("#tab2");

		tab2.appendChild(div);
}}
//SEARCH

// making movie names arr 
function allMovies(success){
	let name = [];
	let i =0;
		while (i < success.length ) {
		
			let unit = success[i];	 
			let x = unit["name"];
			name.push(x);

			i++;} 

	let movies = name; //movie names
	
	//making list for searching
	
	movies.forEach(eachFunction)

		function eachFunction(item, index, arr){
			let x =item;
			let id = index;
			let li = document.createElement('li');
			
			li.innerHTML = `<a class="text-light bg-dark" href="./about.html" id="${id}">${x}</a>`
			document.querySelector("#myUL").appendChild(li);
			document.getElementById('myUL').style.visibility= "hidden";//hidding list
		}
	
	// comparing movie names with search input
	
	document.getElementById("searchBar").addEventListener("keyup", (e) => {
	document.getElementById('myUL').style.visibility= "visible"; //reveal list	
	
	let tekst = document.getElementById("searchBar").value;
	
	movies.forEach(eachFunction)	
	function eachFunction(item, index, arr){
	
		let searchText = tekst.toLowerCase();
		let movieTitle = item.toLowerCase();
		
		let str = movieTitle; 
		let n = str.search(searchText);
		
		if(n != -1){
			document.getElementById(index).parentElement.style.display= "block";}
		else{
			document.getElementById(index).parentElement.style.display= "none";}}
		
	// hidding list if search bar is empty
	if (tekst === ""){
	document.getElementById('myUL').style.visibility= "hidden";}});
	}
	
// Function for filtering action movies for window.html (onclick from genre list)
document.getElementById("genre-ul").addEventListener("click", (e) => {

	let target = e.target.id;

	localStorage.setItem("storageName", target);
});

// Switch for filtering movie genres and putting filtered movies to window.html page
let m = localStorage.getItem("storageName");
switch(m) {
case "action":

let tabw = document.getElementById("tabw");

fetch('../movies.json')
.then(data => data.json())
.then(success =>action(success));

function action(success){
	let i =0;
	while (i < success.length) {

		let unit = success[i];
				
		let name = unit["name"];
		let url_img = unit["url_img"];
		let year = unit["year"];
		let imdb = unit["imdb"];
		let category = unit["category"];
		let primary = category["primary"];

		document.getElementById("h1-window").innerHTML="Akcioni filmovi:"

		if(primary === "Akcija"){
			let div = document.createElement("div")

			div.innerHTML = `<div>
			<div style="background-image: url('${url_img}');" class=" black-widow">
			<div class="dimmed-bg">
			<p class="text-center"><button onclick="favBtnFunction(this.id)" class="favBtn" id="${name}"><i  class="fa fa-heart-o fa-2x"></i></button></p>
			<p  class="text-center text-md">${imdb}/10</p>
			<p  class="text-center text-md">${primary}</p>
			<button onclick="window.location.href='./about.html'" id="${name}" class="btn m-auto text-md">Detaljnije</button>
			</div>
			</div>
			<p>${name}</p>
			<p class="text-secondary">${year}</p>
			</div>`

			tabw.appendChild(div);}
			else{ }
			i++
	}
}

break;
case "documentary":

let tabw2 = document.getElementById("tabw");

fetch('../movies.json')
.then(data => data.json())
.then(success => documentary(success));

function documentary(success){
let i =0;
	while (i < success.length) {

		let unit = success[i];
				
		let name = unit["name"];
		let url_img = unit["url_img"];
		let year = unit["year"];
		let imdb = unit["imdb"];
		let category = unit["category"];
		let primary = category["primary"];

		document.getElementById("h1-window").innerHTML="Dokumentarci:"

		if(primary === "Dokumentarac"){
			let div = document.createElement("div")

			div.innerHTML = `<div>
				<div style="background-image: url('${url_img}');" class=" black-widow">
					<div class="dimmed-bg">
					<p class="text-center"><button onclick="favBtnFunction(this.id)" class="favBtn" id="${name}"><i  class="fa fa-heart-o fa-2x"></i></button></p>
					<p  class="text-center text-md">${imdb}/10</p>
					<p  class="text-center text-md">${primary}</p>
					<button onclick="window.location.href='./about.html'" id="${name}" class="btn m-auto text-md">Detaljnije</button>
					</div>
					</div>
					<p>${name}</p>
					<p class="text-secondary">${year}</p>
				</div>
				`
			tabw2.appendChild(div);
		}
		else{}
		i++
	}
}
break;
case "comedy":

let tabw3 = document.getElementById("tabw");

fetch('../movies.json')
.then(data => data.json())
.then(success =>comedy(success));

function comedy(success){
	let i =0;
	while (i < success.length) {

		let unit = success[i];
					
		let name = unit["name"];
		let url_img = unit["url_img"];
		let year = unit["year"];
		let imdb = unit["imdb"];
		let category = unit["category"];
		let primary = category["primary"];

		document.getElementById("h1-window").innerHTML="Komedije:"

		if(primary === "Komedija"){
			let div = document.createElement("div")

			div.innerHTML = `<div>
				<div style="background-image: url('${url_img}');" class=" black-widow">
					<div class="dimmed-bg">
					<p class="text-center"><button onclick="favBtnFunction(this.id)" class="favBtn" id="${name}"><i  class="fa fa-heart-o fa-2x"></i></button></p>
					<p  class="text-center text-md">${imdb}/10</p>
					<p  class="text-center text-md">${primary}</p>
					<button onclick="window.location.href='./about.html'" id="${name}" class="btn m-auto text-md">Detaljnije</button>
					</div>
					</div>
					<p>${name}</p>
					<p class="text-secondary">${year}</p>
				</div>
			`
			tabw3.appendChild(div);
		}
		else{ }
		i++
	}
}
break;
case "drama":

let tabw4 = document.getElementById("tabw");

fetch('../movies.json')
.then(data => data.json())
.then(success =>drama(success));

function drama(success){
	let i =0;
	while (i < success.length) {

		let unit = success[i];
					
		let name = unit["name"];
		let url_img = unit["url_img"];
		let year = unit["year"];
		let imdb = unit["imdb"];
		let category = unit["category"];
		let primary = category["primary"];

		document.getElementById("h1-window").innerHTML="Drame:"

		if(primary === "Drama"){
			let div = document.createElement("div")

			div.innerHTML = `<div>
				<div style="background-image: url('${url_img}');" class=" black-widow">
					<div class="dimmed-bg">
					<p class="text-center"><button onclick="favBtnFunction(this.id)" class="favBtn" id="${name}"><i  class="fa fa-heart-o fa-2x"></i></button></p>
					<p  class="text-center text-md">${imdb}/10</p>
					<p  class="text-center text-md">${primary}</p>
					<button onclick="window.location.href='./about.html'" id="${name}" class="btn m-auto text-md">Detaljnije</button>
					</div>
					</div>
					<p>${name}</p>
					<p class="text-secondary">${year}</p>
				</div>
			`
			tabw4.appendChild(div);
		}
		else{}
		i++
	}
}
break;
}
// Listener for search list clicked movie
document.getElementById("myUL").addEventListener("click", (e) => {
	let target = e.target.innerHTML
	
	localStorage.setItem("storageName-myUL", target);});

// listener for window.html clicked movie
document.getElementById("tabw").addEventListener("click", (e) => {
	let target = e.target.id
	if(target != ""){
		localStorage.setItem("storageName-myUL", target);
	}});

// listener for window.html clicked movie
document.getElementById("tab1").addEventListener("click", (e) => {
	let target = e.target.id
	
	localStorage.setItem("storageName-myUL", target);});

document.getElementById("tab2").addEventListener("click", (e) => {
	
	let target = e.target.id
		
	localStorage.setItem("storageName-myUL", target);});
		
// puting image and about info in about.html page

let f = localStorage.getItem("storageName-myUL");

fetch('../movies.json')
.then(data => data.json())
.then(success =>movies(success));

function movies(success){
	
	for (i = 0;i < success.length; i++) {
		
		let unit = success[i];
						
		let name = unit["name"];
		let url_img = unit["url_img"];
		let year = unit["year"];
		let imdb = unit["imdb"];
		let category = unit["category"];
		let primary = category["primary"];
		let url = unit["url"]

		let director = unit["director"];
		let first = director["first"];

		let cast = unit["casts"];
		let first1 = cast["first"];
		let second = cast["second"];
		let third = cast["third"];
			
		if(name === f){
			let div = document.createElement("div")

			div.innerHTML = `
				<div style="background-image: url('${url_img}');" class=" imageAbout"><div>	
			`
			let imageAbout = document.querySelector("#imageAbout");
			if(imageAbout !== null){	
			imageAbout.appendChild(div);}

			let div2 = document.createElement("div")

			div2.innerHTML = `
				<h2>${name}</h2><hr>
				<h5>${primary}</h5>
				<h5>${year}</h5>
				<h5 style="display: flex;align-items: center;"><i style="color: yellow" class="fa fa-imdb fa-2x pe-2" aria-hidden="true"></i> ${imdb}/10</h5>
				<a href="${url}"><h5 style="display: flex;align-items: center;"><i style="color: red" class="fa fa-youtube fa-2x pe-2" aria-hidden="true"></i> Pogledaj na YT</h5></a>
				<p><button onclick="favBtnFunction(this.id)" class="favBtn" id="${name}"><i  class="fa fa-heart-o fa-2x"></i></button> Dodaj u omiljene</p>
				<hr>`
			let nameAbout = document.querySelector("#nameAbout");
			if(imageAbout !== null){	
			nameAbout.appendChild(div2);}

			let div3 = document.createElement("div")

			div3.innerHTML = `
				<h4>Direktor</h4>
				<h5>${first}</h5>
				<hr>
				<h4>U glavnim ulogama</h4>
				<h5>${first1}</h5>
				<h5>${second}</h5>
				<h5>${third}</h5>
				<hr>
			`
			let directorAbout = document.querySelector("#directorAbout");
			if(imageAbout !== null){		
			directorAbout.appendChild(div3);}
		}
			else{}
	}
}
// Functions for favorite dropdown list and hanfling local storage for favorite movies
	
// putting favorite movies into localStorage
if(localStorage.getItem('favMovies') === null) {
	let favMovies;
	favMovies = [];
	localStorage.setItem('favMovies', JSON.stringify(favMovies));
}
function favBtnFunction(movie){
	if(JSON.parse(localStorage.getItem('favMovies').indexOf(movie)) === -1){

		let	favMovies = JSON.parse(localStorage.getItem('favMovies'));
		favMovies.push(movie);
		localStorage.setItem('favMovies', JSON.stringify(favMovies));
	}
	else{
		favMovies = JSON.parse(localStorage.getItem('favMovies'));
		favMovies.splice(favMovies.indexOf(movie), 1);

		localStorage.setItem('favMovies', JSON.stringify(favMovies));
	}
}
// Puting fav movies into list
function favList(){
	if(JSON.parse(localStorage.getItem('favMovies')).length > 5){

		document.querySelector("#favList").innerHTML = "";

		let favMov = JSON.parse(localStorage.getItem('favMovies')).slice((JSON.parse(localStorage.getItem('favMovies')).length - 5), JSON.parse(localStorage.getItem('favMovies')).length);

		favMov.forEach(myFun);

		function myFun(item) {
			let li = document.createElement('li');
			li.classList.add("d-flex");
			li.classList.add("align-items-center");
			li.classList.add("justify-content-center");

			li.innerHTML = `<a href="./about.html" class="dropdown-item text-wrap" id="${item}">${item}</a> <button id="${item}" type="button" class="btn btn-danger btn-sm delete ps-2 pe-2 pt-1 pb-1 m-1">X</button>` 
			document.querySelector("#favList").appendChild(li);
		}
	}
	else{
	document.querySelector("#favList").innerHTML = "";

	let favMov = JSON.parse(localStorage.getItem('favMovies'));

	favMov.forEach(myFun);

		function myFun(item) {
			let li = document.createElement('li');
			li.classList.add("d-flex");
			li.classList.add("align-items-center");
			li.classList.add("justify-content-center");

			li.innerHTML = `<a href="./about.html" class="dropdown-item text-wrap" id="${item}">${item}</a> <button id="${item}" type="button" class="btn btn-danger btn-sm delete ps-2 pe-2 pt-1 pb-1 m-1">X</button>`
			
			document.querySelector("#favList").appendChild(li);
		}
	}			
}
// Setting storageName-myUL to target (clicked movie name from favList)
document.getElementById("favList").addEventListener("click", (e) => {
	let target = e.target.id;
	localStorage.setItem("storageName-myUL", target);
});
// Deleting fav movie from storageName-myUL when X is clicked
document.getElementById("favList").addEventListener("click", (e) => {
    if( e.target.classList.contains('delete')){
		
		let target = e.target.id;
		let favMovies;

		favMovies = JSON.parse(localStorage.getItem('favMovies'));
		favMovies.splice(favMovies.indexOf(target), 1);
		
		localStorage.setItem('favMovies', JSON.stringify(favMovies));
	}	
});
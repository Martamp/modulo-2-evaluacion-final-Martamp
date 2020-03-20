'use strict';
let userSearch = document.querySelector('.js-input');
const button = document.querySelector('.js-button');

let listOfFilms = [];
let favoriteList = [];
function getDataApi() {
  fetch(`http://api.tvmaze.com/search/shows?q=${userSearch.value}`)
    .then(response => response.json())
    .then(data => {
      listOfFilms = data;
      console.log(listOfFilms);
      paintFilmList();
      listenFilms();
    })
    .catch(function(err) {
      console.log('Error al traer los datos del servidor', err);
    });
}
button.addEventListener('click', getDataApi);

//declaramos donde va metido el codigo HTML
const sectionList = document.querySelector('.film--list');
//conseguimos la imagen por defecto
const defaultImg = './images/TV-image.jpg';
//pintamos la lista de peliculas

function paintFilmList() {
  let HTMLCode = '';
  //recorremos el array para elegir la pelicula que pintamos

  for (let i = 0; i < listOfFilms.length; i++) {
    const isFavoriteClicked = favoriteList[i] !== -1;

    if (isFavoriteClicked === true) {
      HTMLCode += `<li class="film--container container fav--film">`;
    } else {
      HTMLCode += `<li class="film--container container">`;
    }
    if (listOfFilms[i].show.image === null) {
      HTMLCode += `<img src="${defaultImg}" alt="${listOfFilms[i].show.name}" class="film--image"/>`;
    } else {
      HTMLCode += `<img src="${listOfFilms[i].show.image.medium}" alt="${listOfFilms[i].show.name}" class="film--image" id="${[i]}" />`;
    }
    HTMLCode += `<h3>${listOfFilms[i].show.name}</h3>`;

    HTMLCode += `</li>`;
  }

  sectionList.innerHTML += HTMLCode;
}

function addFavorites(ev) {
  // const isClicked = ev.target.id;
  // const
  favoriteList.push(parseInt(ev.target.id));
  // ev.target.classList.add('fav--film');
  console.log('click', ev.target.id);
}

function listenFilms() {
  const listenFilmList = document.querySelectorAll('.js-list-of-films');
  for (let listenFilm of listenFilmList) {
    listenFilm.addEventListener('click', addFavorites);
  }
}

// function listenFilms() {
//   //hacer document query selector all para identificar la futura pelicula clickada por id
//   //creamos una constante que recoja esa clase comun
//   //hacer FOR OF para recorrer ese document ...ALL
//   //meter addEventListener dentro del for??? si, porque tengo distintas y luego as identificare en mi otra funcion
// }

// function identifyFilm(ev) {
//   // ev.target.id la meto en otro array con push
//   //ACORDARSE DE CREAR OTRO ARRAY DONDE METER FAV
//   //PINTAR mis FILMS
// }
// //HACER LA FUNCION CON SUPER CHICHA QUE NO SE COMO VOY A HACER

// function addFilm (ev){
//     const clickedFilmId = ev.target.id ;
//     for (mis films aqui){
// if (film.id es igual que clickedFilmId){
//     metemos en el array nuevo la peli y ponemos la clase al div de la pelicula
//     //mirar esto bien, otra opcion: con los indices de las films, sease esta mi pelicula en en array de fav? si es tru no hacemos nada y si es false la metemos
// }
//     }
// }

import { videos } from "../data/data.js"

document.getElementById('reproductor').src="https://www.youtube.com/embed/KTNni-6kujM";

const printVideos = (listVideos, container) => {
  container.innerHTML = '';
  listVideos.forEach(video => {
    const article = document.createElement('article');
    article.classList.add('main__card');
    article.innerHTML = `
    <figure class="card__image">
      <img src=${video.miniatura} alt="mineatura video">
        </figure>
        <h4 class="card__title">${video.titulo}</h4>
        <h4 class="card__name">${video.canal}</h4>
        <h4 class="card__info">${video.info}</h4>
    `
    container.appendChild(article);
  });
};


const main = document.querySelector('.main');

const contenedorCards = document.getElementById('contenedorCards');

document.addEventListener('DOMContentLoaded',()=>{
  let miniaturas = sessionStorage.getItem('miniaturas')? JSON.parse(sessionStorage.getItem("miniaturas")): [];
  if(miniaturas.length === 0) {
    sessionStorage.setItem('miniaturas', JSON.stringify(videos));
    miniaturas = JSON.parse(sessionStorage.getItem('miniaturas'));
  }

  printVideos(miniaturas, contenedorCards);
})

const idVideoStr = sessionStorage.getItem("videoPlayer")? JSON.parse(sessionStorage.getItem("videoPlayer")): null;

const idVideo = idVideoStr ? parseInt(idVideoStr) : null;

console.log(idVideo);

const miniaturas = sessionStorage.getItem('miniaturas')? JSON.parse(sessionStorage.getItem("miniaturas")): [];

const video = idVideo? miniaturas.find((vid) => vid.id === idVideo): {};

console.log(video);

document.getElementById('reproductor').src=video.link;

//cambiar el texto

const title = document.getElementById("player__titulo");
title.innerHTML = video.titulo;

const informacion = document.getElementById("player__info");
informacion.innerHTML = video.info;


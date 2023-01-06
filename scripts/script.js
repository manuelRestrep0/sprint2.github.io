import { videos } from "../data/data.js"

const printVideos = (listVideos, container) => {
  container.innerHTML = '';
  listVideos.forEach(video => {
    const article = document.createElement('article');
    article.classList.add('main__card');
    article.innerHTML = `
    <figure class="card__image">
      <img src=${video.miniatura} alt="mineatura video" class="card__img" id=${video.id}>
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


// filtro botones
const botonALL = document.getElementById('all');
const botonJuegos = document.getElementById('juegos');
const botonNoticias = document.getElementById('noticias');
const botonDocumental = document.getElementById('documentales');

const filterButtons = [botonALL, botonJuegos, botonDocumental, botonNoticias];

filterButtons.forEach(button => {
  button.addEventListener("click",(event) =>{
    let videosFiltrados = [];
    if(button.id === "all") {
      videosFiltrados = videos;
    }
    else {
      videosFiltrados = videos.filter(video => video.categoria === button.id);
    }
    console.log(videosFiltrados);
    printVideos(videosFiltrados, contenedorCards);
  });
});

// abrir video 

document.addEventListener("click", (event) => {

  const { target } = event;

  if(target.classList.contains("card__img")){
    console.log(target.id);
    sessionStorage.setItem("videoPlayer", JSON.stringify(target.id));
    window.location.href = "./pages/videoPlayer.html";
  }
});
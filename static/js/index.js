// import { request } from "./data/request.js";
import services from "./modules/carouselServices.js";
import work from "./modules/carouselWork.js";
import modal from "./components/modal.js";
// import createServices from "./components/sectionServices.js";
services();
work()

document.addEventListener('DOMContentLoaded', () => {
  modal();
});
// document.addEventListener("DOMContentLoaded", () => {

//   // Requisição de serviços
//   request().then(data => {
//     createServices(data);
//   }).catch(error => {
//     console.error('Error:', error);
//   });
// });

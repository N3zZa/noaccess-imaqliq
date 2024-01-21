require("dotenv").config(); // Config file
const fs = require("fs");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const _ = undefined;
// API BAZON_TOKEN
const API_TOKEN = process.env.ALLOHA_TOKEN;
const ALLOHAVIDEO_TOKEN = process.env.ALLOHAVIDEO_TOKEN;

const yourIp = "178.121.24.77"; // ваш айпи

// ССЫЛКА НА АПИ ДЛЯ ЗАПРОСА НА ВИДЕОФАЙЛЫ
const APIFILM_URL = `https://api.apbugall.org/?token=${API_TOKEN}&`;
const APIVIDEO_URL = `https://away.as.newplayjj.com:9443/link_file.php?secret_token=${ALLOHAVIDEO_TOKEN}&ip=${yourIp}&`;



// импортирую все функции из папки requests в методы
// добавил setTimeout'ы для задержки(чтобы базон не блочил)
module.exports = {
  // премьеры
  getPremieres: new Promise(function (resolve, reject) {
    require("../requests/premiereRequest.js").then((elem) => {
      resolve(elem);
    });
  }),
  // фильмы
  getFilms: new Promise(function (resolve, reject) {
    setTimeout(() => {
      require("../requests/filmRequest.js").then((elem) => {
        resolve(elem);
      });
    }, 0);
  }),
  // сериалы
  getSerials: new Promise(function (resolve, reject) {
    setTimeout(() => {
      require("../requests/serialRequest.js").then((elem) => {
        resolve(elem);
      });
    }, 100);
  }),
  // аниме
  getAnime: new Promise(function (resolve, reject) {
    setTimeout(() => {
      require("../requests/animeRequest.js").then((elem) => {
        resolve(elem);
      });
    }, 200);
  }),
};

const express = require("express");
const app = express();
const userModel = require("./src/domain/model.js")
const path = require("path");
const fs = require("fs");


app.set('views', path.join(__dirname, '/public/views')); // указываю путь для views
app.use(express.urlencoded({ extended: false })); // для mvc подхода, чтобы все было корректно
app.use(express.static(__dirname + '/public')); // делаю public директорию основной



// чтобы получить html разметку элементов создаю файлы с ними, который с помощью шаблонизатора вывожу на основной странице, также создаю файл с информацией о фильме
// все методы из /src/domain/model.js

// премьеры
userModel.getPremieres.then((data) => {
    // создание html элементов на главную страницу
    fs.writeFileSync('./public/views/elements/premieres.ejs', data.join('').toString())
})
// фильмы
userModel.getFilms.then((data) => {
  // создание html элементов на главную страницу
  fs.writeFileSync(
    "./public/views/elements/films.ejs",
    data.toString()
  );
});

// сериалы
userModel.getSerials.then((data) => {
  // создание html элементов на главную страницу
  fs.writeFileSync(
    "./public/views/elements/serials.ejs",
    data.toString()
  );
});

// аниме
userModel.getAnime.then((data) => {
  // создание html элементов на главную страницу
  fs.writeFileSync(
    "./public/views/elements/anime.ejs",
    data.toString()
  );
});



// -----------------------------------------------------------------------------------------------------------------------

// страницы
app.get('/', (req, res) => {
    res.render('mainPage.ejs')
})



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`))
module.exports = app

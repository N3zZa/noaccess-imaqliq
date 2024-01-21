require("dotenv").config(); // Config file
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const API_TOKEN = process.env.ALLOHA_TOKEN;

const APISERIALS_URL = `https://api.apbugall.org/?token=${API_TOKEN}&list=serial&order=year&poster=1&description=1&rating_kp=1`;

// функция для задержки
function sleeper(ms) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}

module.exports = new Promise(function(resolve, reject){
   try {
      // Timeout для базона
      setTimeout(() => {
      fetch(APISERIALS_URL).then((response) => {
    return response.json()
}).then(data =>  {
  
   // из полученных данных создаю массив с html блоками
    const item = data.data.map((elem, index) => {
      return `
        <div id="serial${index}" class="item serialItem nav-item">
        <div class="filmsItemBg" style="background: url('http://st.kp.yandex.net/images/film_iphone/iphone360_${
          elem.id_kp
        }.jpg'); background-repeat:no-repeat;  background-size:cover;background-size: 100% 100%;" >
        </div>
         <div class="text filmsItemText">
        <p>${elem.name.substring(0, 20).replace(/('|")/g, ``)}</p>
        <h1>(${elem.year})</h1>
        </div>
        </div>
        <script type="text/javascript">
            var _elem${
              elem.id_kp.toString() + index
            } = document.getElementById("serial${index}")
            _elem${
              elem.id_kp.toString() + index
            }.addEventListener("click", function (event) {$('.errorMessage').show(); $$nav.on('.errorMessage_inner')});
        </script>
        `;
    });
    resolve(item) // отдаю массив с подмассивами
   }, 0)
})
   } catch (error) {
        console.log('fetchErrorSerial', error) // обработка ошибки
   }
});


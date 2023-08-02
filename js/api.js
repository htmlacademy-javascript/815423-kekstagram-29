const BASE_URL = 'https://29.javascript.pages.academy/kekstagram'; //адрес удаленного сервера
const Route = { //путь
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = { //метод отправки
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = { //текст ошибки
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

/**
 * функция загрузки данных
 * @param {string} route путь
 * @param {string} errorText текст ошибки
 * @param {string} method метод отправки
 * @param {any} body полезные данне (null-когда отправляем данные не нужны)
 * @returns результат ф-ии fetch - промис
 */
const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body }) //передается путь, аргумент настроек
    .then((response) => { //объект ответа
      if (!response.ok) { //сервер ответил кодом, кот не является положительным
        throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json(); //данные кот вернул сервер
    })
    .catch(() => { //если промис не разрешился, произошла ошибка
      throw new Error(errorText);
    });

/**
 * получение данных с сервера
 * даные получаем GET и если, что не так текст ошибки
 * @returns
 */
const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

/**
 * отправка данных на сервер, форму отправляем POST
 * @param {*} body полезые данные-отправка формы
 * @returns
 */
const sendData = (body) =>
  load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body); //путь, текст ошибки, метод

export { getData, sendData };

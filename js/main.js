import { renderThumbnails } from './thumbnails.js';
import { setOnFormSubmit, closeUserOverlay} from './form-upload-user.js';
import { getData, sendData } from './api.js';
import { showAlert } from './alert.js';
import { showSuccessMessage, showErrorMessage } from './massage.js';
import { debounce } from './util.js';
import { showingFilteredPhotos } from './filter-photos.js';

//функция отправка формы
setOnFormSubmit(async (data) =>{
  try {
    await sendData(data); //отправляем данные
    closeUserOverlay(); //закрываем подложку
    showSuccessMessage(); //сообщение об успехе
  } catch {
    showErrorMessage(); //сообщение об неудаче
  }
});


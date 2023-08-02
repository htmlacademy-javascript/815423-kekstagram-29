import { renderThumbnails } from './thumbnails.js';
import { setOnFormSubmit, closeUserOverlay} from './form-upload-user.js';
import { getData, sendData } from './api.js';
import { showAlert } from './alert.js';
import { showSuccessMessage, showErrorMessage } from './massage.js';
import { debounce } from './util.js';
import { showingFilteredPhotos } from './filter-photos.js';

setOnFormSubmit(async (data) =>{
  try {
    await sendData(data);
    closeUserOverlay();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debouncedRenderThumbnails = debounce(renderThumbnails);
  renderThumbnails(data);
  showingFilteredPhotos(data, debouncedRenderThumbnails);
} catch (error) {
  showAlert(error.message);
}

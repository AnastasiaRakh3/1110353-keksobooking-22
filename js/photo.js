'use strict';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const fileAvatarChooser = document.querySelector('.ad-form__field .ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const fileAdPhotosChooser = document.querySelector('.ad-form__upload .ad-form__input');
const adPhotosContainer = document.querySelector('.ad-form__photo-container');
const adPhotoWrapper = document.querySelector('.ad-form__photo');

fileAvatarChooser.addEventListener('change', () => {
  const file = fileAvatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

fileAdPhotosChooser.addEventListener('change', () => {

  const chosenFiles = fileAdPhotosChooser.files;

  for (let i = 0; i < chosenFiles.length; i++) {
    const currentFile = chosenFiles[i];
    const fileName = currentFile.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        adPhotoWrapper.remove();

        const newPhoto = document.createElement('img');
        const adPhotoWrapperNew = document.createElement('div');
        newPhoto.src = reader.result;
        newPhoto.alt = 'Фото жилья';
        // newPhoto.width = '70';
        // newPhoto.height = '70';
        adPhotoWrapperNew.classList.add('ad-form__photo');

        adPhotoWrapperNew.appendChild(newPhoto);
        adPhotosContainer.appendChild(adPhotoWrapperNew);
      });
      reader.readAsDataURL(currentFile);
    }
  }
});


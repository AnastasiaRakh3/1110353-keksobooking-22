'use strict';

const RoomTypes = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
};
const cardTemplate = document.querySelector('#card').content;
const newCardTemplate = cardTemplate.querySelector('.popup');
const successTemplate = document.querySelector('#success').content;
const newSuccessTemplate = successTemplate.querySelector('.success');
const errorTemplate = document.querySelector('#error').content;
const newErrorTemplate = errorTemplate.querySelector('.error');
const main = document.querySelector('main');

/** Функция, преобразующая название ключа в нужный формат и возвращая значение ключа */
const translateType = (ad) => {
  return RoomTypes[ad.offer.type.toUpperCase()];
};

/** Функции, создающие хранилище для созданных удобств и фото */
const getFeatures = (features) => {
  const featuresFragment = document.createDocumentFragment();

  features.forEach((value) => {
    const newFeatureElement = document.createElement('li');
    newFeatureElement.classList.add('popup__feature');
    let newFeatureClass = 'popup__feature--';
    newFeatureClass += value;
    newFeatureElement.classList.add(newFeatureClass);

    featuresFragment.appendChild(newFeatureElement);
  });
  return featuresFragment;
};

const getPhotos = (photos) => {
  const photosFragment = document.createDocumentFragment();

  photos.forEach((value) => {
    const newPhotoElement = document.createElement('img');
    newPhotoElement.classList.add('popup__photo');
    newPhotoElement.width = '45';
    newPhotoElement.height = '40';
    newPhotoElement.alt = 'Фотография жилья';
    newPhotoElement.src = value;

    photosFragment.appendChild(newPhotoElement);
  });
  return photosFragment;
};

/** Фукнция, создания карточки объявления */
const createCard = (ad) => {
  const cardOffer = newCardTemplate.cloneNode(true);

  const titleCardOffer = cardOffer.querySelector('.popup__title');
  const addressCardOffer = cardOffer.querySelector('.popup__text--address');
  const priceCardOffer = cardOffer.querySelector('.popup__text--price');
  const typeCardOffer = cardOffer.querySelector('.popup__type');
  const capacityCardOffer = cardOffer.querySelector('.popup__text--capacity');
  const timeCardOffer = cardOffer.querySelector('.popup__text--time');
  const descriptionCardOffer = cardOffer.querySelector('.popup__description');
  const avatarCardOffer = cardOffer.querySelector('.popup__avatar');
  const featuresListCardOffer = cardOffer.querySelector('.popup__features');
  const photosCardOffer = cardOffer.querySelector('.popup__photos');

  titleCardOffer.textContent = ad.offer.title;
  addressCardOffer.textContent = ad.offer.address;
  priceCardOffer.textContent = `${ad.offer.price} `;
  priceCardOffer.innerHTML += '<span>₽/ночь</span>';
  typeCardOffer.textContent = translateType(ad);
  capacityCardOffer.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  timeCardOffer.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  descriptionCardOffer.textContent = ad.offer.description;
  avatarCardOffer.src = ad.author.avatar;

  if (ad.offer.features.length === 0) {
    featuresListCardOffer.remove();
  } else {
    featuresListCardOffer.innerHTML = '';
    featuresListCardOffer.appendChild(getFeatures(ad.offer.features));
  }

  if (ad.offer.photos.length === 0) {
    photosCardOffer.remove();
  } else {
    photosCardOffer.innerHTML = '';
    photosCardOffer.appendChild(getPhotos(ad.offer.photos));
  }

  return cardOffer;
};

/** Фукнции, выводящие блоки с удачным выполнением и с ошибкой при отправке формы */
const closeBlock = (block) => {
  block.addEventListener('click', () => {
    block.remove();
  });

  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      block.remove();
    }
  });
};

const showSuccessBlock = () => {
  const successBlock = newSuccessTemplate.cloneNode(true);
  successBlock.style.zIndex = 400;
  main.append(successBlock);
  closeBlock(successBlock);
};

const showErrorBlock = () => {
  const errorBlock = newErrorTemplate.cloneNode(true);
  errorBlock.style.zIndex = 400;
  main.append(errorBlock);
  closeBlock(errorBlock);
};

/** Фукнция, выводящая блок с ошибкой при запросе на получение данных с сервера */
const showErrorBlockGetData = () => {
  const errorBlock = newErrorTemplate.cloneNode(true);
  const errorMessage = errorBlock.querySelector('.error__message');
  const errorButton = errorBlock.querySelector('.error__button');
  errorButton.remove();
  errorMessage.textContent = 'Упс, что-то пошло не так :( Попробуй проверить соединение';
  errorBlock.style.zIndex = 400;

  main.append(errorBlock);
  closeBlock(errorBlock);
};

export { createCard, showSuccessBlock, showErrorBlock, showErrorBlockGetData };

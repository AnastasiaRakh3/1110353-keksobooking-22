// import { createAdvertising } from './data.js';
export {createCard};

// const firstAd = createAdvertising();
const cardTemplate = document.querySelector('#card').content;
const newCardTemplate = cardTemplate.querySelector('.popup');

const RoomTypes = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
};

const translateType = function (ad) {
  return RoomTypes[ad.offer.type.toUpperCase()];
};

const getFeatures = function (array) {
  const featuresFragment = document.createDocumentFragment();

  array.forEach((value) => {
    const newFeatureElement = document.createElement('li');
    newFeatureElement.classList.add('popup__feature');
    let newFeatureClass = 'popup__feature--';
    newFeatureClass += value;
    newFeatureElement.classList.add(newFeatureClass);

    featuresFragment.appendChild(newFeatureElement);
  });
  return featuresFragment;
};

const getPhotos = function (array) {
  const photosFragment = document.createDocumentFragment();

  array.forEach((value) => {
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

const createCard = function (ad) {
  const cardOffer = newCardTemplate.cloneNode(true);

  const titleCardOffer = cardOffer.querySelector('.popup__title');
  const addressCardOffer = cardOffer.querySelector('.popup__text--address');
  const priceCardOffer = cardOffer.querySelector('.popup__text--price');
  const typeCardOffer = cardOffer.querySelector('.popup__type');
  const capacityCardOffer = cardOffer.querySelector('.popup__text--capacity');
  const timeCardOffer = cardOffer.querySelector('.popup__text--time');
  const descriptionCardOffer = cardOffer.querySelector('.popup__description');
  const avatarCardOffer = cardOffer.querySelector('.popup__avatar');

  titleCardOffer.textContent = ad.offer.title;
  addressCardOffer.textContent = ad.offer.address;
  priceCardOffer.textContent = `${ad.offer.price} `;
  priceCardOffer.innerHTML += '<span>₽/ночь</span>';
  typeCardOffer.textContent = translateType(ad);
  capacityCardOffer.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  timeCardOffer.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  descriptionCardOffer.textContent = ad.offer.description;
  avatarCardOffer.src = ad.author.avatar;

  const featuresListCardOffer = cardOffer.querySelector('.popup__features');
  featuresListCardOffer.innerHTML = '';
  const photosCardOffer = cardOffer.querySelector('.popup__photos');
  photosCardOffer.innerHTML = '';
  featuresListCardOffer.appendChild(getFeatures(ad.offer.features));
  photosCardOffer.appendChild(getPhotos(ad.offer.photos));

  return cardOffer;
};



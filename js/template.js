import {createAdvertising} from './data.js';

const firstAd = createAdvertising();

const translateType = function (ad) {
  if (ad.offer.type === 'flat') {
    return 'Квартира';
  } else if (ad.offer.type === 'bungalow') {
    return 'Бунгало';
  } else if (ad.offer.type === 'house') {
    return 'Дом';
  }
  return 'Дворец';
};

const createCard = function (ad) {
  const cardTemplate = document.querySelector('#card').content;
  const newCardTemplate = cardTemplate.querySelector('.popup');
  const cardOffer = newCardTemplate.cloneNode(true);

  const titleCardOffer = cardOffer.querySelector('.popup__title');
  const addressCardOffer = cardOffer.querySelector('.popup__text--address');
  const priceCardOffer = cardOffer.querySelector('.popup__text--price');
  const typeCardOffer = cardOffer.querySelector('.popup__type');
  const capacityCardOffer = cardOffer.querySelector('.popup__text--capacity');
  const timeCardOffer = cardOffer.querySelector('.popup__text--time');
  const featuresCardOffer = cardOffer.querySelector('.popup__features');
  const descriptionCardOffer = cardOffer.querySelector('.popup__description');
  const photosCardOffer = cardOffer.querySelector('.popup__photos');
  const avatarCardOffer = cardOffer.querySelector('.popup__avatar');

  titleCardOffer.textContent = ad.offer.title;
  addressCardOffer.textContent = ad.offer.address;
  priceCardOffer.textContent = '${ad.offer.price} <span>₽/ночь</span>';
  typeCardOffer.textContent = translateType(ad);
  capacityCardOffer.textContent = '${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей';
  timeCardOffer.textContent = 'Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}';
  featuresCardOffer.textContent = ad.offer.address;
  descriptionCardOffer.textContent = ad.offer.description;
  photosCardOffer.textContent = ad.offer.photos;
  avatarCardOffer.src = ad.offer.author;
  return cardOffer;
};

const firstAdCard = createCard(firstAd);

const mapCanvas = document.querySelector('#map__canvas');
mapCanvas.appendChild(firstAdCard);



export const utilService = {
  delay,
  getRandomInt,
  makeId,
  saveToStorage,
  loadFromStorage,
  getIcon,
  sortByDate,
};
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}

function delay(ms = 1500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
function sortByDate(items) {
  if (!items) return [];
  return items.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}

function makeId(length = 5) {
  var txt = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function getIcon(amenity) {
  switch (amenity) {
    case 'Kitchen':
      return 'utensils';
    case 'Wifi':
      return 'wifi';
    case 'TV':
      return 'tv';
    case 'Crib':
      return 'baby-carriage';
    case 'Smoking allowed':
      return 'smoking';
    case 'No smoking':
      return 'smoking-ban';
    case 'Pets allowed':
      return 'paw';
    case 'Cooking basics':
      return 'blender';
    case 'Air conditioning':
      return 'snowflake';
    case 'Refrigerator':
      return 'fa-regular fa-refrigerator';

    case 'Free parking':
      return 'parking';
    case 'Hottub':
      return 'hot-tub';

    case 'Elevator':
      return 'fa-solid fa-elevator';
    case 'Iron':
      return 'iron';
    case 'Heating':
      return 'temperature-high';
    case 'Pool':
      return 'swimming-pool';
    case 'Spa':
      return 'spa';
    case 'Bathtub':
      return 'bath';
    case 'Accessible':
      return 'wheelchair';
    case 'Beach access – Beachfront':
      return 'umbrella-beach';
    case 'Long term stays allowed':
      return 'calendar-alt';
    case 'Coffee':
      return 'coffee';
    case 'Private gym in building':
      return 'dumbbell';
    default:
      break;
  }
}

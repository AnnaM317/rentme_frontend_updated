import { httpService } from './http.service';

export const stayService = {
  query,
  getById,
  remove,
  save,
  getEmptyStay,
  getHostStays,
  getCitiesList,
  getPropertyTypesList,
  getAmenitiesList,
  getInitialFilterBy,
  getEmptyReview,
};

function _getUrl(id = '') {
  const BASE_URL =
    process.env.NODE_ENV !== 'development'
      ? '/api/rentme'
      : '//localhost:3000/api/rentme';
  return `${BASE_URL}/${id}`;
}

async function query(filterBy) {
  return await httpService.get(`stay`, filterBy);
}
async function getHostStays(hostId) {
  const host = hostId ? `?hostId=${hostId}` : '';
  query = `${host}`;
  return await httpService.get(`stay${query}`);
}

async function getById(stayId) {
  return await httpService.get(`stay/${stayId}`);
}

async function remove(stayId) {
  return await httpService.delete(`stay/${stayId}`);
}

async function save(stay) {
  return stay._id
    ? await httpService.put('stay/' + stay._id, stay)
    : await httpService.post('stay/', stay);
}

function getEmptyStay() {
  return {
    name: '',
    price: 15,
    summary: '',
    imgUrls: [],
    type: '',
    capacity: 0,
    amenities: [],
    avgRate: 0,
    loc: {
      country: '',
      countryCode: '',
      address: '',
      lat: 0,
      lng: 0,
    },
    reviews: [],
    likedByUsers: [],
  };
}

function getEmptyReview() {
  return {
    createdAt: '',
    txt: '',
    rate: 3,
    categories: {
      Cleanliness: 0,
      Communication: 0,
      'Check-in': 0,
      Accuracy: 0,
      Location: 0,
      Accessibility: 0,
    },
    by: {
      _id: 'u111',
      fullName: 'Guest',
      imgUrl: '',
    },
  };
}

function getInitialFilterBy() {
  return {
    hostId: '',
    city: '',
    guests: '',
    dates: {
      checkInDate: '',
      checkOutDate: '',
    },
    guests: { adults: 0, children: 0, infants: 0, pets: 0 },
    totalGuests: 0,
    priceRange: [15, 850],
    amenities: [],
    propertyType: '',
  };
}
function getCitiesList() {
  const cities = [
    {
      name: 'London',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638609791/travel%20posters/itl.cat_london-iphone-wallpaper_248104_tueo1k.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1639404739/travel%20posters/london1_u0cqhx.jpg',
      ],
    },
    {
      name: 'Tel Aviv',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638700827/tel-aviv/wp6537669_pa56s3.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1639404955/travel%20posters/3t_h2o25l.jpg',
      ],
    },
    {
      name: 'Hong Kong',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638618156/travel%20posters/mark-billante-vtuVWgtSYzo-unsplash_noeiqn.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1639404955/travel%20posters/2h_ldod24.jpg',
      ],
    },
    {
      name: 'Rome',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638609793/travel%20posters/itl.cat_rome-wallpaper_2989992_fxkntx.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1639404041/travel%20posters/roma_veffst.jpg',
      ],
    },
    {
      name: 'flexible',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1639404040/travel%20posters/flex_o4lqla.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1639404040/travel%20posters/flex_o4lqla.jpg',
      ],
    },
  ];
  return cities;
}

function getPropertyTypesList() {
  return [
    'Entire home',
    'Entire condo',
    'Entire rental unit',
    'Entire loft',
    'Entire bungalow',
    'Private Room',
    'Private room in rental unit',
  ];
}

function getAmenitiesList() {
  return [
    'Kitchen',
    'Wifi',
    'TV',
    'Coffee',
    'Crib',
    'Smoking allowed',
    'No smoking',
    'Pets allowed',
    'Cooking basics',
    'Air conditioning',
    'Refrigerator',
    'Free parking',
    'Bathub',
    'Heating',
    'Pool',
    'Accessible',
    'Long term stays allowed',
  ];
}

import { httpService } from './http.service';

export const orderService = {
  query,
  getById,
  remove,
  save,
  getEmptyOrder,
};

function _getUrl(id = '') {
  const BASE_URL =
    process.env.NODE_ENV !== 'development'
      ? '/api/rentme'
      : '//localhost:3000/api/rentme';
  return `${BASE_URL}/${id}`;
}

async function query({ userId, userType }) {
  return await httpService.get('order', { params: { userId, userType } });
}

async function getById(orderId) {
  return httpService.get(`order/${orderId}`);
}

async function remove(orderId) {
  return httpService.delete(`order/${orderId}`);
}

async function save(order) {
  if (order._id) {
    const savedOrder = await httpService.put(`order/${order._id}`, order);
    return savedOrder;
  } else {
    const savedOrder = await httpService.post(`order`, order);
    return savedOrder;
  }
}

function getEmptyOrder() {
  return {
    hostId: '',
    createdAt: Date.now(),
    buyer: {
      _id: '',
      fullname: '',
      imgUrl: '',
    },
    totalPrice: 0,
    dates: {},
    totalNights: 0,
    totalGuests: {},
    stay: {
      _id: '',
      name: '',
      price: 0,
    },
    status: 'pending',
  };
}

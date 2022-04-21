import io from 'socket.io-client';

export const SOCKET_EVENT_ORDER_ADDED = 'order-added';
export const SOCKET_EVENT_ORDER_UPDATED = 'order-updated';

const baseUrl = process.env.NODE_ENV === 'production' ? '' : '//localhost:3030';
export const socketService = createSocketService();

window.socketService = socketService;

function _getUrl(id = '') {
  const BASE_URL =
    process.env.NODE_ENV !== 'development'
      ? '/api/rentme'
      : '//localhost:3000/api/rentme';
  return `${BASE_URL}/${id}`;
}

// var socketIsReady = false;
socketService.setup();

function createSocketService() {
  var socket = null;
  const socketService = {
    async setup() {
      socket = io(baseUrl);
    },
    on(eventName, cb) {
      socket.on(eventName, cb);
    },
    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName);
      else socket.off(eventName, cb);
    },
    emit(eventName, data) {
      socket.emit(eventName, data);
    },
    terminate() {
      socket = null;
    },
  };
  return socketService;
}


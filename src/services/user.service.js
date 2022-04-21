import { httpService } from './http.service';
import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service';

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';

export const userService = {
  login,
  logout,
  signup,
  getLoggedInUser,
  getUsers,
  getById,
  remove,
  update,
};

function _getUrl(id = '') {
  const BASE_URL =
    process.env.NODE_ENV !== 'development'
      ? '/api/rentme'
      : '//localhost:3000/api/rentme';
  return `${BASE_URL}/${id}`;
}

// Debug technique
window.userService = userService;

function getUsers() {
  return httpService.get(`user`);
}

async function getById(userId) {
  const user = await httpService.get(`user/${userId}`);
  return user;
}
function remove(userId) {
  return httpService.delete(`user/${userId}`);
}

async function update(user) {
  // Handle case in which admin updates other user's details
  if (getLoggedInUser()._id === user._id) _saveLocalUser(user);
  return await httpService.put(`user/${user._id}`, user);
}

async function login(userCred) {
  const user = await httpService.post('auth/login', userCred);
  socketService.emit('set-user-socket', user._id);
  if (user) return _saveLocalUser(user);
}
async function signup(userCred) {
  const user = await httpService.post('auth/signup', userCred);
  socketService.emit('set-user-socket', user._id);
  return _saveLocalUser(user);
}
async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
  socketService.emit('unset-user-socket');
  return await httpService.post('auth/logout');
}

function _saveLocalUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}

function getLoggedInUser() {
  return JSON.parse(
    sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null'
  );
}

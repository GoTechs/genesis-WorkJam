/**
 *
 * all the authetification, actions that localstorage handle (set, get and clear)
 *
 */

import { isEmpty } from "lodash";

const TOKEN_KEY = "jwtToken";
const USER_INFO = "userInfo";
const USER_EXIST = "userExist";
const IS_LOGIN = "userLogin";
const USER_UID = "userUID";
const USER_ID = "userId";
const TICKET_ID = "ticketId";
const USER_CAN_REG = "userCanReg";
const VERIFY_WRISTBAND = "verifyWristband";
const parse = JSON.parse;
const stringify = JSON.stringify;

const auth = {
  /**
   * Remove an item from the used storage
   * @param  {String} key [description]
   */
  clear(key) {
    if (localStorage && localStorage.getItem(key)) {
      return localStorage.removeItem(key);
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return sessionStorage.removeItem(key);
    }

    return null;
  },

  /**
   * Clear all app storage
   */
  clearAppStorage() {
    if (localStorage) {
      localStorage.clear();
    }

    if (sessionStorage) {
      sessionStorage.clear();
    }
  },

  clearToken(tokenKey = TOKEN_KEY) {
    return auth.clear(tokenKey);
  },

  clearUserInfo(userInfo = USER_INFO) {
    return auth.clear(userInfo);
  },

  /**
   * Returns data from storage
   * @param  {String} key Item to get from the storage
   * @return {String|Object}     Data from the storage
   */
  get(key) {
    if (localStorage && localStorage.getItem(key)) {
      return parse(localStorage.getItem(key)) || null;
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return parse(sessionStorage.getItem(key)) || null;
    }

    return null;
  },

  getToken(tokenKey = TOKEN_KEY) {
    return auth.get(tokenKey);
  },

  getUserInfo(userInfo = USER_INFO) {
    return auth.get(userInfo);
  },

  /**
   * Set data in storage
   * @param {String|Object}  value    The data to store
   * @param {String}  key
   * @param {Boolean} isLocalStorage  Defines if we need to store in localStorage or sessionStorage
   */
  set(value, key, isLocalStorage) {
    if (isLocalStorage && localStorage) {
      return localStorage.setItem(key, stringify(value));
    }

    if (sessionStorage) {
      return sessionStorage.setItem(key, stringify(value));
    }

    return null;
  },

  setToken(value = "", isLocalStorage = false, tokenKey = TOKEN_KEY) {
    return auth.set(value, tokenKey, isLocalStorage);
  },

  setUserInfo(value = "", isLocalStorage = false, userInfo = USER_INFO) {
    return auth.set(value, userInfo, isLocalStorage);
  },

  setUserExistense(value = "", isLocalStorage = true, userExist = USER_EXIST) {
    return auth.set(value, userExist, isLocalStorage);
  },
  getUserExistense(userExist = USER_EXIST) {
    return auth.get(userExist);
  },
  setUSerAuth(value = "", isLocalStorage = true, userAuth = IS_LOGIN) {
    return auth.set(value, userAuth, isLocalStorage);
  },
  getUserAuth(userAuth = IS_LOGIN) {
    return auth.get(userAuth);
  },
  setUID(value = "", isLocalStorage = true, uid = USER_UID) {
    return auth.set(value, uid, isLocalStorage);
  },
  getUID(uid = USER_UID) {
    return auth.get(uid);
  },
  setUserId(value = "", isLocalStorage = true, id = USER_ID) {
    return auth.set(value, id, isLocalStorage);
  },
  getUserId(id = USER_ID) {
    return auth.get(id);
  },
  setCanUserRegister(
    value = "",
    isLocalStorage = true,
    userCanReg = USER_CAN_REG
  ) {
    return auth.set(value, userCanReg, isLocalStorage);
  },
  getCanUserRegister(userCanReg = USER_CAN_REG) {
    return auth.get(userCanReg);
  },
  setTicketId(value = "", isLocalStorage = true, ticketId = TICKET_ID) {
    return auth.set(value, ticketId, isLocalStorage);
  },
  getTicketId(ticketId = TICKET_ID) {
    return auth.get(ticketId);
  },
  setVerifyWristband(
    value = "",
    isLocalStorage = true,
    verifyWristband = VERIFY_WRISTBAND
  ) {
    return auth.set(value, verifyWristband, isLocalStorage);
  },
  getVerifyWristband(verifyWristband = VERIFY_WRISTBAND) {
    return auth.get(verifyWristband);
  }
};

export default auth;

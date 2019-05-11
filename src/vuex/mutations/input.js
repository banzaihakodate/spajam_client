import {
  REQUEST_INPUT,
  SUCCESS_INPUT,
  FAILED_INPUT,
  REQUEST_USERS,
  SUCCESS_USERS,
  FAILED_USERS,
  REQUEST_ADD_EVIL, SUCCESS_ADD_EVIL, FAILED_ADD_EVIL, REQUEST_START_HOI, REQUEST_START_TRIGGER
} from "../actions/input";

export const input = {
  [REQUEST_INPUT] () {
  },
  [SUCCESS_INPUT] (state, data) {
    state.input.id = data.id;
    state.input.name = data.name;
    state.input.host = data.host;
  },
  [FAILED_INPUT] () {
  },
  [REQUEST_USERS] () {
  },
  [SUCCESS_USERS] (state, data) {
    state.input.users = data.users;
  },
  [FAILED_USERS] () {
  },
  [REQUEST_ADD_EVIL] () {
  },
  [SUCCESS_ADD_EVIL] (state, data) {
    state.input.evil = data.evil;
  },
  [FAILED_ADD_EVIL] () {
  },
  [REQUEST_START_HOI] () {
  },
  [REQUEST_START_TRIGGER] () {
  },


};

import { firestore } from 'firebase'
import router from '../../plugins/router'

export const REQUEST_INPUT = 'REQUEST_INPUT';
export const SUCCESS_INPUT = 'SUCCESS_INPUT';
export const FAILED_INPUT = 'FAILED_INPUT';

export const REQUEST_USERS = 'REQUEST_USERS';
export const SUCCESS_USERS = 'SUCCESS_USERS';
export const FAILED_USERS = 'FAILED_USERS';

export const REQUEST_ADD_EVIL = 'REQUEST_ADD_EVIL';
export const SUCCESS_ADD_EVIL = 'SUCCESS_ADD_EVIL';
export const FAILED_ADD_EVIL = 'FAILED_ADD_EVIL';

export const REQUEST_START_HOI = 'REQUEST_START_HOI';

export const REQUEST_START_TRIGGER = 'REQUEST_START_TRIGGER';

export const INIT_REQUEST = 'INIT_REQUEST';

let users = [];

export const input = {
  [REQUEST_INPUT] ({ commit }, data) {
    commit(REQUEST_INPUT);
    let host = false;
    firestore().collection("rooms").doc(data.id).get().then(function(doc) {
      if (doc.exists) {
        firestore().collection("rooms").doc(data.id).collection("users").doc(data.name).set({
          Gyro: null,
          IsEvil: false,
          IsHost: false,
        }).then(() => {
          commit(SUCCESS_INPUT, {name: data.name, id: data.id, host })
        });

      } else {
        firestore().collection("rooms").doc(data.id).set({
          IsCollected: false,
          IsHoi: false,
          IsStarted: false
        });

        firestore().collection("rooms").doc(data.id).collection("users").doc(data.name).set({
          Gyro: null,
          IsEvil: false,
          IsHost: true
        }).then(() => {
          host = true;
          commit(SUCCESS_INPUT, {name: data.name, id: data.id, host })
        });
      }
    });
  },
  [REQUEST_USERS] ({ commit }, data) {
    commit(REQUEST_USERS);
    const roomData = firestore().collection("rooms");
    roomData.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        if(doc.id === data.id) {
          firestore().collection("rooms").doc(data.id).collection("users").doc(data.name).get().then(function(doc) {
            commit(SUCCESS_ADD_EVIL, {evil: doc.data().IsEvil})
          });

          firestore().collection("rooms").doc(data.id).get().then(function(data) {
            if(data.data().IsCollected){
              router.push('oni')
            }
          })
        }
      });
      commit(SUCCESS_USERS, {users})
    });
    const userCollection = firestore().collection("rooms").doc(data.id).collection("users");
    userCollection.onSnapshot(querySnapshot => {
      users = [];
      querySnapshot.forEach(doc => {
        users.push({name: doc.id});
      });
      commit(SUCCESS_USERS, {users})
    });
  },
  [REQUEST_ADD_EVIL] ({ commit }, data) {
    commit(REQUEST_ADD_EVIL);
    firestore().collection("rooms").doc(data).collection("users").doc(users[0].name).update({
      IsEvil: true
    });
    firestore().collection("rooms").doc(data).update({
      IsCollected: true
    })
  },
  [REQUEST_START_HOI] ({ commit }, data) {
    commit(REQUEST_START_HOI);
    firestore().collection("rooms").doc(data).update({
      IsStarted: true
    })
  },
  [REQUEST_START_TRIGGER] ({ commit }, data) {
    commit(REQUEST_START_TRIGGER);
    const roomData = firestore().collection("rooms");
    roomData.onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        if(doc.id === data.id) {
          firestore().collection("rooms").doc(data.id).get().then(function(data) {
            if(data.data().IsStarted){
              router.push('hoi')
            }
          })
        }
      });
      commit(SUCCESS_USERS, {users})
    });
  },
  [INIT_REQUEST] ({ commit }) {
    commit(INIT_REQUEST);
  }
};

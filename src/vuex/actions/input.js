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

export const REQUEST_DONE_HOI = 'REQUEST_DONE_HOI'; //firebase上のIsHoiの値を更新する
export const REQUEST_IS_HOI = 'REQUEST_IS_HOI'; //firebaseからIsHoiの値を取得する
export const REQUEST_SET_GYRO = 'REQUEST_SET_GYRO'; //自身のジャイロの値をfirebase上に登録する

export const INIT_REQUEST = 'INIT_REQUEST';
export const REQUEST_GET_GYRO = 'REQUEST_GET_GYRO';
export const SUCCESS_GET_GYRO = 'SUCCESS_GET_GYRO';

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
            const flags = data.data()
            if(!flags.IsStarted && flags.IsCollected){
              router.push('oni');
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
        const fields = doc.data()
        users.push({name: doc.id, gyro: fields.Gyro, isEvil: fields.IsEvil, isHost: fields.IsHost});
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
            const flags = data.data()
            if(!flags.IsHoi && flags.IsStarted){
              router.push('hoi')
            }
          })
        }
      });
      commit(SUCCESS_USERS, {users})
    });
  },
  [REQUEST_IS_HOI] ({commit}, roomID) {
    const room = firestore().collection('rooms').doc(roomID)
    room.onSnapshot(doc => {
      commit(REQUEST_IS_HOI, doc.data().IsHoi)
    })
  },
  [REQUEST_DONE_HOI] ({commit}, roomID) {
    commit(REQUEST_DONE_HOI);
    const rooms = firestore().collection('rooms')
    rooms.doc(roomID).update({
      IsHoi: true
    })
  },
  [REQUEST_SET_GYRO] ({commit}, data) {
    commit(REQUEST_SET_GYRO)
    const {roomID, userID, gyro} = data
    const room = firestore().collection('rooms').doc(roomID)
    const user = room.collection('users').doc(userID)
    user.update({
      Gyro:gyro
    })
  },
  [INIT_REQUEST] ({ commit }, data) {
    firestore().collection("rooms").doc(data).get().then(function(doc) {
      if (doc.exists) {
        firestore().collection("rooms").doc(data).delete();
      }});
    commit(INIT_REQUEST);
  },
  [REQUEST_GET_GYRO] ({ commit }, data) {
    commit(REQUEST_GET_GYRO);
    const room = firestore().collection('rooms').doc(data.id);
    const user = room.collection('users').doc(data.name);
    user.get().then(function (doc) {
      commit(SUCCESS_GET_GYRO, doc.data().Gyro);
    });
  },
};

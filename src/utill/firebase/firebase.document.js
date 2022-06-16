import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
  addDoc,
  where,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase.config";

//방 새로이 만들기
export const createRoomDocuments = async (roomName, user) => {
  const roomDocRef = collection(db, "rooms");
  const { email, displayName, id } = user;

  console.log("roomDocRef ", roomDocRef);

  try {
    const timestamp = serverTimestamp();

    const newRoom = await addDoc(roomDocRef, {
      roomName,
      timestamp,
      userList: [{ email, displayName, id }],
    });

    return { id: newRoom.id, ...newRoom };
  } catch (error) {
    console.log("error occur from adding room ", error);
  }
};

// 방 id 입력해서 들어가기
// export const getRoomInfo = async (roomId) => {
//   const roomDocRef = doc(db, "rooms", roomId);
//   const RoomSnapshot = await getDoc(roomDocRef);

//   return RoomSnapshot.data();
// }; 랑 합치기
export const findRoomAndAddInfoDocuments = async (roomId, user) => {
  const { email, displayName, id } = user;

  const roomDocRef = doc(db, "rooms", roomId);
  const roomSnapshot = await getDoc(roomDocRef);

  console.log(roomSnapshot);

  if (!roomSnapshot.exists()) return alert("Try another room Id");
  try {
    // 합친부분
    if (
      roomSnapshot.data().userList.find((roomUser) => roomUser.id === user.id)
    ) {
    } else {
      await setDoc(
        roomDocRef,
        {
          userList: [
            ...roomSnapshot.data().userList,
            {
              email,
              displayName,
              id,
            },
          ],
        },
        { merge: true }
      );
    }
  } catch (error) {
    console.log("error occur from adding room ", error);
  }

  return { id: roomId, ...roomSnapshot.data() };
};

// user를 방에서 삭제하기
export const deleteUserRoom = async (roomId, user) => {
  const roomDocRef = doc(db, "rooms", roomId);
  const userRoomSnapshot = await getDoc(roomDocRef);

  const newUserList = userRoomSnapshot
    .data()
    .userList.filter((roomUser) => roomUser.id !== user.id);

  await updateDoc(roomDocRef, {
    userList: newUserList,
  });

  return userRoomSnapshot.data();
};

// user 가 있는 방 가져오기
export const getUserRoomArray = async (user) => {
  const roomDocRef = collection(db, "rooms");
  const userRoomSnapshot = await getDocs(roomDocRef);

  const myRoomSnapshot = userRoomSnapshot.docs.filter((roomDoc) =>
    roomDoc.data().userList.find((users) => users.id.includes(user.id))
  );

  return myRoomSnapshot;
};

// message 업로드 하는 기능 추가 room 안에서 message 교환하니까
// useparam으로 room id 가져와서 doc(db, "rooms", roomid)로 들어가서
// update message 하든 addDoc을 하던

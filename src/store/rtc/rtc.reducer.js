import { RTC_ACTION_TYPE } from "./rtc.type";

const RTC_INIT_STATE = {
  rtcUsers: [],
  localUser: {},
  share: false,
};

const rtcReducer = (state = RTC_INIT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case RTC_ACTION_TYPE.SET_RTC_USER:
      // const existingUser = state.rtcUsers.find(
      //   (rtcUser) => rtcUser.user.uid === payload.user.uid
      // );
      // if (existingUser) {
      //   const newRtcUsers = state.rtcUsers.map((rtcUser) =>
      //     rtcUser.user.uid === payload.user.uid
      //       ? { ...rtcUser, user: payload.user }
      //       : rtcUser
      //   );
      //   return {
      //     ...state,
      //     rtcUsers: newRtcUsers,
      //   };
      // }
      return {
        ...state,
        rtcUsers: payload,
      };
    case RTC_ACTION_TYPE.SET_LOCAL_USER:
      return {
        ...state,
        localUser: payload,
      };

    case RTC_ACTION_TYPE.CLEAR_RTC_USER:
      return {
        ...state,
        rtcUsers: [],
        localUser: {},
      };

    case RTC_ACTION_TYPE.TOGGLE_RTC_SHARE:
      return {
        ...state,
        share: payload.bool,
        rtcUsers: payload.newRtcUsers,
      };

    default:
      return state;
  }
};

export default rtcReducer;
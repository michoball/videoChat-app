import { createContext, useEffect, useReducer } from "react";
import { createAction } from "../utill/reducer/reducer.config";

// 임의로 만드는 message Uid
const messageUid = () => {
  return Math.floor(Math.random() * 100000 + Math.random() * 10000).toString();
};

export const USER_ACTION_TYPE = {
  SET_RTM_CLIENT: "SET_RTM_CLIENT",
  ADD_NEW_MESSAGE: "ADD_NEW_MESSAGE",
  CLEAR_MESSAGE: "CLEAR_MESSAGE",
  CLEAR_CLIENT_CHANNEL: "CLEAR_CLIENT_CHANNEL",
  SET_CHANNEL: "SET_LCHANNEL",
};

const rtmReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPE.ADD_NEW_MESSAGE:
      const messageuid = messageUid();
      return {
        ...state,
        messages: state.messages.concat({ ...payload, id: messageuid }),
      };
    case USER_ACTION_TYPE.CLEAR_MESSAGE:
      return {
        ...state,
        messages: [],
      };
    case USER_ACTION_TYPE.SET_CHANNEL:
      return {
        ...state,
        channel: payload,
      };
    case USER_ACTION_TYPE.SET_RTM_CLIENT:
      return {
        ...state,
        rtmClient: payload,
      };
    case USER_ACTION_TYPE.CLEAR_CLIENT_CHANNEL:
      return {
        ...state,
        rtmClient: null,
        channel: null,
      };
    default:
      return state;
  }
};

export const RtmContext = createContext({
  messages: [],
  rtmClient: null,
  channel: null,
  addMessages: (messageData) => null,
  clearMessages: () => null,
  setRtmClient: (rtmClientInfo) => null,
  setChannel: (channelInfo) => null,
  clearClientAndChannel: () => null,
});

const INIT_STATE = {
  messages: [],
  rtmClient: null,
  channel: null,
};

export const RtmProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rtmReducer, INIT_STATE);
  const { messages, channel, rtmClient } = state;
  console.log(messages);
  const addMessages = (messageData) => {
    dispatch(createAction(USER_ACTION_TYPE.ADD_NEW_MESSAGE, messageData));
  };

  const setChannel = (channelInfo) => {
    dispatch(createAction(USER_ACTION_TYPE.SET_CHANNEL, channelInfo));
  };

  const setRtmClient = (rtmClientInfo) => {
    dispatch(createAction(USER_ACTION_TYPE.SET_RTM_CLIENT, rtmClientInfo));
  };

  const clearMessages = () => {
    dispatch(createAction(USER_ACTION_TYPE.CLEAR_MESSAGE));
  };

  const clearClientAndChannel = () => {
    dispatch(createAction(USER_ACTION_TYPE.CLEAR_CLIENT_CHANNEL));
  };

  const value = {
    messages,
    channel,
    rtmClient,
    addMessages,
    setRtmClient,
    setChannel,
    clearMessages,
    clearClientAndChannel,
  };

  return <RtmContext.Provider value={value}>{children}</RtmContext.Provider>;
};

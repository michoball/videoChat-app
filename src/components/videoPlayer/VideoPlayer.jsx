import { useDispatch, useSelector } from "react-redux";
import { selectRtcShare, selectRtcUsers } from "../../store/rtc/rtc.selector";
import { toggleBig } from "../../store/rtc/rtc.action";

import {
  Video,
  BaseVideoContainer,
  SmallVideoContainer,
  ShareVideoContainer,
  LocalVideoContainer,
} from "./VideoPlayer.styles";
import { CamIcon } from "../../UI/Icons";

export const VIDEO_TYPE_CLASS = {
  base: "base",
  local: "local",
  share: "share",
  small: "small",
};

const getVideoType = (VideoType = VIDEO_TYPE_CLASS.base, share) =>
  ({
    [VIDEO_TYPE_CLASS.base]: share ? SmallVideoContainer : BaseVideoContainer,
    [VIDEO_TYPE_CLASS.local]: LocalVideoContainer,
    [VIDEO_TYPE_CLASS.share]: ShareVideoContainer,
    [VIDEO_TYPE_CLASS.small]: SmallVideoContainer,
  }[VideoType]);

function VideoPlayer({ rtcUser, track, videoType }) {
  const dispatch = useDispatch();
  const rtcUsers = useSelector(selectRtcUsers);
  const share = useSelector(selectRtcShare);

  const CustomVideoContainer = getVideoType(videoType, share);

  const toggleSizeHandler = () => {
    dispatch(toggleBig(rtcUsers, rtcUser));
  };

  return (
    <CustomVideoContainer
      onClick={
        !share && videoType !== VIDEO_TYPE_CLASS.local
          ? toggleSizeHandler
          : undefined
      }
    >
      {track || rtcUser.hasVideo ? <Video videoTrack={track} /> : <CamIcon />}
    </CustomVideoContainer>
  );
}

export default VideoPlayer;

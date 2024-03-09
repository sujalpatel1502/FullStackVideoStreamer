import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
// import ThhumbUpIcon from "@mui/icons-material/ThumbUpIcon"
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {dislike, fetchSucess, like} from "../redux/videoSlice"
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const VideoFrame=styled.video`
max-height:720px;
width:100%;
object-fit:cover;
`

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Video = () => {
  const {currentUser} =useSelector((state)=>state.user);
  const {currentVideo} =useSelector((state)=>state.video);

  const dispatch =useDispatch();
  const path=useLocation().pathname.split("/")[2];
  
  const [channel,setChannel]=useState({})
  useEffect(()=>{
    const fetchData=async()=>{
      console.log("goneeeeeeeeeeeeeee");
      try {
        const videoRes=await axios.get(`/videos/find/${path}`)
        const channelRes=await axios.get(`/users/find/${videoRes.data.userId}`)
        console.log("videoooooandchannelllll",videoRes,channelRes);
        setChannel(channelRes.data)
        dispatch(fetchSucess(videoRes.data))
      } catch (error) {
        console.log("error in main videooooo",error);
      }
    }
    fetchData();
  },[path,dispatch])
  const handleLike=async()=>{
    await axios.put(`/users/like/${currentVideo._id}`)
   dispatch(like(currentUser.user._id))
  }
  const handleDisLike=async()=>{
    await axios.put(`/users/dislike/${currentVideo._id}`)
    dispatch(dislike(currentUser.user._id))
  }
  const handleSubscribe=async()=>{
    console.log("channel",currentUser.user.subscribedUsers);
    currentUser.user.subscribedUsers.includes(channel._id)?
    await axios.put(`/users/unsub/${channel._id}`):
    await axios.put(`/users/sub/${channel._id}`)

    // dispatch(subscription(channel._id))
  }

  console.log("pathhhhhhh",path);
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} controls/>
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{currentVideo?.views} views • {format(currentVideo?.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>
             { currentVideo?.likes?.includes(currentUser.user._id)? <ThumbUpOutlinedIcon style={{color:"red"}}/>:<ThumbUpOutlinedIcon style={{color:"blue"}} /> }{currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDisLike}>
               <ThumbDownOffAltOutlinedIcon /> {currentVideo?.dislikes?.length}
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={currentVideo.imgUrl} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel?.subscribedUsers?.length} subscribers</ChannelCounter>
              <Description>
                {currentVideo?.desc}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSubscribe}>{currentUser.user.subscribedUsers?.includes(channel._id)? "SUBSCRIBED":"SUBSCRIBE"}</Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id}/>
      </Content>
      <Recommendation>
        {/* <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/> */}
      </Recommendation>
    </Container>
   
  );
};

export default Video;

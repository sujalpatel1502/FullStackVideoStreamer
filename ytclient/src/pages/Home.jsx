import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios"
import { useDispatch } from "react-redux";
// import { videoSucess } from "../redux/videoSlice";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {
  const[videos,setVideo]=useState([]);
  const dispatch=useDispatch();
  useEffect(()=>{
    const fetchVideo=async()=>{
      const res=await axios.get(`/videos/${type}`);
      console.log("responseeeeee",res.data);
      setVideo(res.data)
      // dispatch(videoSucess(res.data))
      
    }
    fetchVideo();
  },[type])
  return (
    <Container>
      {videos.map((video)=>{
        return(
          <Card key={video._id} video={video}/>
        )
      })

      }
      
    </Container>
  );
};

export default Home;

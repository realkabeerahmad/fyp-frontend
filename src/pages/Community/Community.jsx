import { AddCircle } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import Post from "../../components/Post/Post";
const Community = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    userId: user ? user._id : "",
    name: user ? user.firstName + " " + user.lastName : "",
    Image: user ? user.Image : "",
    content: "",
  });
  const handleChange = (value) => (e) => {
    setValues({ ...values, [value]: e.target.value });
  };
  const addPost = () => {
    setLoading(true)
    if (!user._id) {
      alert("Please Login");
      setLoading(false)
      return false;
    } else {
      axios
      .post("http://localhost:8000/community/addPost", values)
      .then((res) => {
        alert(res.data.message);
        fetchPosts();
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
        });
    }
  };
  const fetchPosts = () => {
    axios.get("http://localhost:8000/community/showAllPosts").then((res) => {
      if (res.data.status === "success") {
        setPosts(res.data.data);
      }
    });
  };
  useEffect(() => {
    fetchPosts();

    return () => {};
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 400,
          display: "flex",
          backgroundColor: "white",
          borderRadius: 2,
          p: 2,
          m: 1,
          boxShadow: "0 2px 4px #0000001a, 0 8px 16px #0000001a",
        }}
      >
        <TextField
          color="success"
          sx={{ width: "100%" }}
          placeholder="Add Post"
          value={values.content}
          onChange={handleChange("content")}
        />
        <LoadingButton
          color="success"
          variant="contained"
          // sx={{ ml: -5 }}
          onClick={addPost}
          disabled={!values.content ? true : false}
          loading={loading}
        >
          <AddCircle />
        </LoadingButton>
      </Box>
{/* Post */}
      <Post/>
    
    </Box>
  );
};

export default Community;

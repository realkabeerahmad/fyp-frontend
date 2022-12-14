import { Comment, Delete, MoreHoriz, Send, ThumbUp } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import * as React from "react";

const Post = ({ post, user }) => {
  const [comment, setComment] = React.useState({
    userId: user._id,
    _id: post._id,
    content: "",
  });
  const [first, setFirst] = React.useState(true);
  const [liked, setLiked] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setAcitve] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleActive = () => {
    if (active) {
      setAcitve(false);
    } else {
      setAcitve(true);
    }
  };
  const handleChange = (value) => (e) => {
    setComment({ ...comment, [value]: e.target.value });
  };
  if (post.likes.length > 0 && first) {
    for (let i = 0; i < post.likes.length; i++) {
      // const element = post.likes[i];
      if (post.likes[i].userId === user._id) {
        setLiked(true);
        setFirst(false);
        break;
      }
    }
  }
  // setLiked(Object.values(post.likes).includes(user._id));
  return (
    <>
      <Box
        sx={{
          width: 400,
          // height: 400,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: "0 2px 4px #0000001a, 0 8px 16px #0000001a",
          contain: "content",
          m: 1,
        }}
      >
        <Box
          sx={{
            p: 1,
            display: "flex",
            alignItems: "center",
            position: "relative",
            borderBottom: "1px solid #cfcfcf",
          }}
        >
          <Box
            sx={{
              width: 35,
              height: 35,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              contain: "content",
              marginRight: "5px",
              backgroundColor: "black",
            }}
          >
            <img
              src={post.user.Image}
              alt={post.user._id}
              style={{ height: 25 }}
            />
          </Box>
          <Box sx={{ ml: 1 }}>
            <h4>{post.user.name}</h4>
            <Box sx={{ fontSize: 14, m: 0, p: 0 }}>
              {post.createdAt.slice(0, 10)}
            </Box>
          </Box>

          <IconButton
            sx={{ position: "absolute", right: 10 }}
            onClick={handleClick}
          >
            <MoreHoriz />
          </IconButton>
        </Box>
        <Box sx={{ p: 1, textAlign: "justify" }}>{post.content}</Box>
        {post.Image ? (
          <Box
            sx={{
              width: "100%",
              height: 300,
              contain: "content",
              // borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={post.Image}
              alt={post._id}
              style={{
                height: "100%",
              }}
            />
          </Box>
        ) : (
          <></>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 1,
            borderTop: "1px solid #cfcfcf",
          }}
        >
          <Box>{post.likes_count} Likes</Box>
          <Box>{post.comments_count} Opinions</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            borderTop: "1px solid #cfcfcf",
            borderBottom: "1px solid #cfcfcf",
          }}
        >
          <Button sx={{ color: liked ? "#e92e4a" : "grey !important" }}>
            <ThumbUp sx={{ mr: 1, fontSize: 18 }} /> Like
          </Button>
          <Button onClick={handleActive} sx={{ color: "grey !important" }}>
            <Comment sx={{ mr: 1, fontSize: 18 }} /> Opinions
          </Button>
        </Box>
        {active ? (
          <>
            {post.comments.length > 0 ? (
              post.comments.map((comment) => {
                return (
                  <Box sx={{ p: 1, borderBottom: "1px solid #cfcfcf" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 25,
                          height: 25,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          contain: "content",
                          marginRight: "5px",
                          backgroundColor: "black",
                        }}
                      >
                        <img
                          src={comment.user.Image}
                          alt=""
                          style={{ height: 25 }}
                        />
                      </Box>
                      <Box sx={{ ml: 1 }}>
                        <h5>{comment.user.name}</h5>
                      </Box>
                      <Box sx={{ fontSize: 10, ml: 1 }}>
                        ({comment.createdAt.slice(0, 10)})
                      </Box>
                      <IconButton sx={{ position: "absolute", right: 10 }}>
                        <Delete sx={{ fontSize: 15 }} />
                      </IconButton>
                    </Box>
                    <Box sx={{ textAlign: "justify" }}>{comment.content}</Box>
                  </Box>
                );
              })
            ) : (
              <></>
            )}

            <Box
              sx={{
                p: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <TextField
                variant="standard"
                sx={{ width: "80%" }}
                color="error"
                placeholder="Share Your Oppinion on this"
                onChange={handleChange("content")}
                value={comment.content}
              />
              <Button disabled={!comment.content} color="error">
                <Send />
              </Button>
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>
      <Menu open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Delete Post</MenuItem>
      </Menu>
    </>
  );
};

export default Post;

import { Comment, MoreHoriz, Send, ThumbUp } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import * as React from "react";

const Post = () => {
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
            <img src={""} alt="" style={{ height: 25 }} />
          </Box>
          <Box sx={{ ml: 1 }}>
            <h4>Dummy</h4>
            <Box sx={{ fontSize: 14, m: 0, p: 0 }}>Date</Box>
          </Box>

          <IconButton
            sx={{ position: "absolute", right: 10 }}
            onClick={handleClick}
          >
            <MoreHoriz />
          </IconButton>
        </Box>
        <Box sx={{ p: 1 }}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, ut!
        </Box>
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
            src="https://dailytimes.com.pk/assets/uploads/2022/08/01/pets-3715733_1920.jpg"
            alt=""
            style={{
              height: "100%",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", px: 1 }}>
          <Box>{0} Like</Box>
          <Box>{0} Comment</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            borderTop: "1px solid #cfcfcf",
            borderBottom: "1px solid #cfcfcf",
          }}
        >
          <Button>
            <ThumbUp sx={{ mr: 1 }} /> Like
          </Button>
          <Button onClick={handleActive}>
            <Comment sx={{ mr: 1 }} /> Comment
          </Button>
        </Box>
        <Box sx={{ p: 1 }}>
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
              <img src={""} alt="" style={{ height: 25 }} />
            </Box>
            <Box sx={{ ml: 1 }}>
              <h5>Dummy</h5>
            </Box>
          </Box>
          <Box>Comment Content</Box>
        </Box>
        {active ? (
          <Box
            sx={{
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              borderTop: "1px solid #cfcfcf",
            }}
          >
            <TextField variant="standard" sx={{ width: "80%" }} />
            <Button variant="contained">
              <Send />
            </Button>
          </Box>
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

import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import axios from "axios";

import Avatar from "../UserList/avatar";

import "./styles.css";

/**
 * Define TopBar, a React component of CS142 Project 5.
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.uid,
      user: this.props.user,
      page: this.props.page,
      current_user: this.props.current_user,
      logout: this.props.logout,
    };
    this.logout = this.logout.bind(this);
  }

  static getDerivedStateFromProps(props) {
    return {
      uid: props.uid,
      user: props.user,
      page: props.page,
    };
  }

  logout() {
    axios.get("/admin/logout").then(() => {
      console.log(this);
      this.state.logout();
    }).catch((error) => {
      console.log(error);
    });
  }

  upload() {
    const input = document.querySelector('#uploader');
    input.click();
  }

  real_upload(event) {
    console.log(event.target.files);
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    axios.post('/photos/new', formData);
  }

  render() {
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar>
          <Avatar uid={this.state.uid} size={48} />
          <Typography variant="h5" color="inherit">
            {this.state.page==='detail'?this.state.user:'Photos of '+this.state.user}
          </Typography>

          <input
            type="file"
            id="uploader"
            style={{
              display: "none",
            }}
            onChange={this.real_upload}
            />
          <Button
            style={{
              marginLeft: "auto",
            }}
            variant="contained"
            onClick={this.upload}
            >
              Upload
          </Button>
          <Button
            style={{
              color: "white",
              marginLeft: "10px",
            }}
            variant="text"
            onClick={this.logout}
            >
              {this.state.current_user}, Logout
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;

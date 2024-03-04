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

  render() {
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar>
          <Avatar uid={this.state.uid} size={48} />
          <Typography variant="h5" color="inherit">
            {this.state.page==='detail'?this.state.user:'Photos of '+this.state.user}
          </Typography>
          <Button
            style={{
              color: "white",
              marginLeft: "auto",
            }}
            variant="text"
            onClick={this.logout}
            >
              Logout
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;

import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
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
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      uid: props.uid,
      user: props.user,
      page: props.page,
    };
  }

  render() {
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar>
          <Avatar uid={this.state.uid} size={48} />
          <Typography variant="h5" color="inherit">
            {this.state.page==='detail'?this.state.user:'Photos of '+this.state.user}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;

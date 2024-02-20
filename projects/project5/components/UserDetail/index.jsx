import React from "react";
import {Link} from 'react-router-dom';
import { Paper, Typography, Grid, Divider, Button } from "@mui/material";

import "./styles.css";
import Avatar from "../UserList/avatar";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component of CS142 Project 5.
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.match.params.userId,
      user: {},
      cb: this.props.update,
    };
    fetchModel(`/user/${this.state.uid}`).then(
      (user) => {
        this.setState({
          user: user
        });
        this.state.cb(this.state.uid, this.state.user.first_name+' '+this.state.user.last_name, 'detail');
      },
      console.log
    );
    UserDetail.instance = this;
  }

  // When the component is rendered for the second time, the constructor is not called again.
  // Before rendering, the caller will invoke this method to update the states.
  // Not sure if it's the best practise.
  static getDerivedStateFromProps(props) {
    const uid = props.match.params.userId;

    if (uid !== UserDetail.instance.state.uid) {
      fetchModel(`/user/${uid}`).then(
        (user) => {
          const name = user.first_name+' '+user.last_name;
          const old_name = UserDetail.instance.state.user.first_name + ' ' + UserDetail.instance.state.user.last_name;
          if (!old_name || (name !== old_name)) {
            props.update(uid, name, 'detail');
            UserDetail.instance.setState({
              uid: uid,
              user: user
            });
            UserDetail.instance.state.cb(uid, name, 'detail');
          }
        },
        console.log
      );
    }
    
    return {uid: uid};
  }

  render() {
    return (
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: 600,
          flexGrow: 1
        }}
        >
        <Grid container spacing={1} >
          <Grid item xs={6}>
            <Avatar uid={this.state.uid} size={144} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3" gutterBottom>{this.state.user.first_name + ' ' + this.state.user.last_name}</Typography>
            <Typography variant="h6" gutterBottom>{this.state.user.occupation}</Typography>
            {/* <Typography variant="body1" gutterBottom>{this.state.user.description}</Typography> */}
            <Typography variant="body2" gutterBottom>{this.state.user.location}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>{this.state.user.description}</Typography>
          </Grid>
          <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
            <Grid item xs={3}>
              <Link to={'/photos/' + this.state.uid} >
                <Button variant="contained" >Photos!</Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default UserDetail;

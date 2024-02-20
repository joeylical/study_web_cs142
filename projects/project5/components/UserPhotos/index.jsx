import React from "react";
import {Link} from 'react-router-dom';
import { Divider, ImageList, ImageListItem, Button, Typography } from "@mui/material";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserPhotos, a React component of CS142 Project 5.
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.match.params.userId,
      user: window.users.filter((user)=>user._id===this.props.match.params.userId)[0] || {},
      photos: [],
      cb: this.props.update,
    };
    fetchModel('/photosOfUser/'+this.state.uid).then(
      (photos) => {
        this.setState({
          user: window.users.filter((user)=>user._id===this.state.uid)[0] || {},
          photos: photos
        });
        this.state.cb(this.state.uid, this.state.user.first_name+' '+this.state.user.last_name, 'photo');
      },
      console.log
    );
    // this.state.cb(this.state.uid, this.state.user.first_name+' '+this.state.user.last_name, 'photo');
    UserPhotos.instance = this;
  }

  static getDerivedStateFromProps(props) {
    const uid = props.match.params.userId;
    if (uid !== UserPhotos.instance.state.uid) {
      fetchModel(`/photosOfUser/${uid}`).then(
        (photos) => {
          if (UserPhotos.instance.state.user._uid !== uid) {
            const user = 'users' in window?window.users.filter((u)=>u._id===uid)[0]:{};
            const name = user.first_name+' '+user.last_name;
            UserPhotos.instance.setState({
              user: user,
              photos: photos
            });
            props.update(uid, name, 'photo');
          }
        },
        console.log
      );
    }

    return {
      uid: uid,
    };
  }

  render() {
    return (
      <React.Fragment>
        <Link to={'/users/'+this.state.uid} >
          <Button variant="contained" >Back</Button>
        </Link>
        <ImageList sx={{ width: 500 }} cols={1} >
          {
            this.state.photos.map((photo) => (
              <ImageListItem key={photo.file_name}>
                <img className="photo" src={'/images/' + photo.file_name} />
                  {
                    'comments' in photo ? photo.comments.map((comment) => (
                      <div key={comment._id}>
                        <Typography variant="h6">
                          {comment.user.first_name + ' ' + comment.user.last_name}
                        </Typography>
                        <Typography variant="subtitle2">
                          {comment.date_time}
                        </Typography>
                        <Typography variant="body1" width="500px">
                          {comment.comment}
                        </Typography>
                        <Divider />
                      </div>
                    )) : <span />
                  }
              </ImageListItem>
            ))
          }
        </ImageList>
      </React.Fragment>
    );
  }
}

export default UserPhotos;

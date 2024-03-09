import React from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent, TextField, Button } from "@mui/material";
import axios from 'axios';

class CommentDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: false,
      photoId: this.props.photoId,
      comment: '',
      addComment: this.props.addComment,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const dialog = props.status;
    const photoId = props.photoId;
    // props is always get from parent
    if (dialog && dialog !== state.status) {
      return {
        dialog: true,
        photoId: photoId,
        status: dialog,
      };
    } else {
      return {};
    }
    
  }

  closeDialog() {
    this.setState({
      dialog: false,
    });
  }

  handleChange(event) {
    this.setState({
      comment: event.target.value,
    });
  }

  handleSubmit() {
    console.log(0 && this);
    // console.log(event.target.value);
    console.log(this.state.comment);
    axios.post("/commentsOfPhoto/"+this.state.photoId.toString(),{comment: this.state.comment}).then((response) => {
      console.log(response);
      //todo: add a new comment entry
      //      or refresh
      this.state.addComment(this.state.photoId, response.data);
    }).catch(console.log);
    this.setState({
      dialog: false,
      comment: ''
    });
  }

  render() {
    return (
      <Dialog
        open={this.state.dialog}
        onClose={this.closeDialog}
        style={{
          // width: "400px",
          flexFlow: "column",
        }}
        >
        <DialogTitle>New Comment</DialogTitle>
        <DialogContent>
          <TextField
            label="Comment"
            style={{
              width: "100%",
              margin: "10px 0px",
            }}
            multiline
            rows={5}
            value={this.state.comment}
            onChange={this.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            style={{
              marginBottom: "20px"
            }}
            onClick={this.handleSubmit}
            >
            Publish!
          </Button>
          <Button
            variant="contained"
            style={{
              marginBottom: "20px"
            }}
            onClick={()=>this.closeDialog()}
            >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default CommentDialog;
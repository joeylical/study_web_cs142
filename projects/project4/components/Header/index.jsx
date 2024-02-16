import React from "react";
import Avatar from "./avatar";
import "./styles.css";

/**
 * Define Banner for Q3
 */
class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
    <div className="banner">
      <Avatar user='test'></Avatar>
    </div>
    );
  }
}

export default Banner;

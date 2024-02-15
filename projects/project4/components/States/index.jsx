import React from "react";
import "./styles.css";

/**
 * Define States, a React component of CS142 Project 4, Problem 2. The model
 * data for this view (the state names) is available at
 * window.cs142models.statesModel().
 */
class States extends React.Component {
  constructor(props) {
    super(props);
    console.log(
      "window.cs142models.statesModel()",
      window.cs142models.statesModel()
    );
    this.state = {
      leading: '',
      states: window.cs142models.statesModel(),
      selectedStates: window.cs142models.statesModel(),
    };
  }

  updateLeading(event) {
    const leading = event.target.value;
    let r = this.state.states.filter(s => s.toLowerCase().startsWith(leading));
    if (r.length === 0) {
      r = [(
        <i key='nomatch'>No Matches</i>
      )];
    }
    this.setState({ leading:  leading, selectedStates: r});
  }

  render() {
    return (
    <div>
      <label>State Name:</label>
      <input
        type="text"
        value={this.state.leading}
        onChange={(e) => this.updateLeading(e)}
      />
      <ul >
      {this.state.selectedStates.map(s=><li key={s}>{s}</li>)}
      </ul>
    </div>
    );
  }
}

export default States;

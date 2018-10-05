import Axios from "axios";
import React from "react";
import { Chance } from "chance";
import ReactDOM from "react-dom";
import { Button, Footer, Loading, TextInput } from "carbon-components-react";

import "carbon-components/css/carbon-components.min.css";

const chance = new Chance();
const isProd = process.env.NODE_ENV === "production";
const urlPrefix = isProd ? "" : "http://localhost:5678";

class App extends React.Component {
  constructor() {
    super();
    this.state = { newUserName: "", generateUserLoading: false };

    this.handleGenerateUser = this.handleGenerateUser.bind(this);
    this.handleGenerateInput = this.handleGenerateInput.bind(this);
  }

  handleGenerateInput(event) {
    this.setState({ newUserName: event.target.value });
  }

  handleGenerateUser() {
    this.setState({ generateUserLoading: true });
    Axios.post(`${urlPrefix}/users`, {
      name: this.state.newUserName || chance.name()
    }).then(res => {
      this.setState({ newUserName: "", generateUserLoading: false });
      console.log(res);
    });
  }

  render() {
    return (
      <Footer>
        <div className="bx--footer-cta">
          <div className="bx--footer-info">
            <div className="bx--footer-info__item">
              <TextInput
                hideLabel
                labelText="Generate User"
                id="generate-button-input"
                value={this.state.newUserName}
                onChange={this.handleGenerateInput}
                placeholder="Enter a Name for a New User"
              />
            </div>
            <div className="bx--footer-info__item">
              <Button
                onClick={this.handleGenerateUser}
                disabled={this.state.generateUserLoading}
                kind={this.state.newUserName ? "secondary" : "primary"}
              >
                {this.state.newUserName
                  ? "Generate New User"
                  : "Generate Random User"}
              </Button>
            </div>
          </div>
        </div>
      </Footer>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

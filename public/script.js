import Axios from "axios";
import React from "react";
import { Chance } from "chance";
import ReactDOM from "react-dom";
import {
  Button,
  Footer,
  ModalBody,
  ModalHeader,
  RadioTile,
  TextInput,
  TileGroup
} from "carbon-components-react";

import "carbon-components/css/carbon-components.min.css";

const chance = new Chance();
const isProd = process.env.NODE_ENV === "production";
const urlPrefix = isProd ? "" : "http://localhost:5678";
const axios = Axios.create({ baseURL: urlPrefix, withCredentials: true });

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      usersData: [],
      newUserName: "",
      selectedUser: null,
      generateUserLoading: false
    };

    this.handleGenerateUser = this.handleGenerateUser.bind(this);
    this.handleGenerateInput = this.handleGenerateInput.bind(this);
  }

  handleGenerateInput(event) {
    this.setState({ newUserName: event.target.value });
  }

  handleGenerateUser() {
    this.setState({ generateUserLoading: true });
    axios
      .post("/users", {
        name: this.state.newUserName || chance.name()
      })
      .then(res => {
        this.setState({ newUserName: "", generateUserLoading: false });
        console.log(res);
      });
  }

  componentDidMount() {
    axios
      .get("/users")
      .then(res => {
        this.setState({ usersData: res.data.sort((a, b) => b - a) });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <React.Fragment>
        <div className="left-container">
          <TileGroup
            name="tile-group"
            legend="Selectable Tile Group"
            defaultSelected="default-selected"
            valueSelected=""
            // onChange={onChange}
          >
            {this.state.usersData.map(userData => (
              <RadioTile
                key={userData.id}
                value={userData.id}
                name="tiles"
                // onChange={onChange}
              >
                {userData.name}
              </RadioTile>
            ))}
          </TileGroup>
        </div>

        {this.state.selectedUser ? (
          <div class="bx--modal-container">
            <ModalHeader title="Example" />
            <ModalBody>HELLO!</ModalBody>
          </div>
        ) : null}

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
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

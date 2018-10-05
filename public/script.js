import Axios from "axios";
import React from "react";
import { Chance } from "chance";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import ReactPlayer from "react-player";
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

const settings = {
  // speed: 500,
  // infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1
};

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
    this.handleUserSelection = this.handleUserSelection.bind(this);
  }

  handleUserSelection(userId) {
    this.setState({ selectedUser: userId });
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
        const usersData = [res.data, ...this.state.usersData];
        this.setState({
          usersData,
          newUserName: "",
          generateUserLoading: false
        });
      });
  }

  componentDidMount() {
    axios
      .get("/users")
      .then(res => {
        this.setState({ usersData: res.data.sort((a, b) => b.id - a.id) });
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
            onChange={this.handleUserSelection}
          >
            {this.state.usersData.map(userData => (
              <RadioTile
                key={userData.id}
                value={userData.id}
                id={`user-${userData.id}`}
              >
                {userData.name}
              </RadioTile>
            ))}
          </TileGroup>
        </div>

        <div className="right-container">
          {this.state.selectedUser ? (
            <div class="bx--modal-container">
              <ModalHeader title="Example" />
              <ModalBody>
                <Slider {...settings}>
                  <div className="slider-component">
                    <ReactPlayer
                      width="320px"
                      height="180px"
                      url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                    />
                  </div>
                  <div className="slider-component">
                    <ReactPlayer
                      width="320px"
                      height="180px"
                      url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                    />
                  </div>
                  <div className="slider-component">
                    <TextInput
                      hideLabel
                      labelText="Generate User"
                      id="generate-button-input"
                      value={this.state.newUserName}
                      onChange={this.handleGenerateInput}
                      placeholder="Enter a Name for a New User"
                    />

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
                </Slider>
              </ModalBody>
            </div>
          ) : (
            <div className="selection-info bx--modal-header__heading">
              Please select a user from the menu on the left
            </div>
          )}
        </div>

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

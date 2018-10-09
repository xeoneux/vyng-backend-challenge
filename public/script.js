import Axios from "axios";
import React from "react";
import { Chance } from "chance";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";
import {
  Button,
  Footer,
  Loading,
  ModalBody,
  ModalHeader,
  ModalWrapper,
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
      channelsData: [],
      selectedUser: null,
      newChannelName: "",
      generateUserLoading: false
    };

    this.handleNewVideo = this.handleNewVideo.bind(this);
    this.handleChannelInput = this.handleChannelInput.bind(this);
    this.handleGenerateUser = this.handleGenerateUser.bind(this);
    this.handleGenerateInput = this.handleGenerateInput.bind(this);
    this.handleCreateChannel = this.handleCreateChannel.bind(this);
    this.handleUserSelection = this.handleUserSelection.bind(this);
  }

  handleUserSelection(userId) {
    this.setState({ selectedUser: userId });
    axios.get(`users/${userId}/channels?includeVideos=1`).then(res => {
      this.setState({ channelsData: res.data });
    });
  }

  handleCreateChannel() {
    if (this.state.newChannelName) {
      return axios
        .post(`users/${this.state.selectedUser}/channels?include-videos=true`, {
          name: this.state.newChannelName
        })
        .then(res => {
          this.setState({
            channelsData: [res.data, ...this.state.channelsData]
          });
        });
    } else {
      // TODO: Display notification...
    }
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

  handleChannelInput(event) {
    this.setState({ newChannelName: event.target.value });
  }

  handleNewVideo(url, channel) {
    axios
      .post(`/users/${this.state.selectedUser}/channels/${channel}/videos`, {
        url
      })
      .then(res => {
        const channelData = this.state.channelsData.find(
          channelData => channelData.id === channel
        );

        channelData.videos = channelData.videos || [];

        const newChannelData = Object.assign({}, channelData, {
          videos: [res.data, ...channelData.videos]
        });

        this.setState({
          channelsData: this.state.channelsData.map(
            channelData =>
              channelData.id === channel ? newChannelData : channelData
          )
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
            this.state.channelsData && this.state.channelsData.length ? (
              this.state.channelsData.map(channelData => (
                <div key={channelData.id} className="bx--modal-container">
                  <ModalHeader title={channelData.name} />
                  <ModalBody className="video-display">
                    <div className="slider-videos">
                      {channelData.videos &&
                        channelData.videos.map(video => (
                          <div key={video.id} className="slider-component">
                            <ReactPlayer
                              width="90%"
                              height="90%"
                              url={video.url}
                            />
                          </div>
                        ))}
                    </div>
                    <div className="slider-input">
                      <NewVideo
                        channel={channelData.id}
                        handleNewVideo={this.handleNewVideo}
                      />
                    </div>
                  </ModalBody>
                </div>
              ))
            ) : (
              <div className="selection-info bx--modal-header__heading">
                No channels found for the user :(
              </div>
            )
          ) : (
            <div className="selection-info bx--modal-header__heading">
              Please select a user from the menu on the left :)
            </div>
          )}
        </div>

        <Footer>
          {this.state.selectedUser && (
            <ModalWrapper
              shouldCloseAfterSubmit
              modalHeading="Enter Channel Name"
              buttonTriggerText="Create New Channel"
              handleSubmit={this.handleCreateChannel}
            >
              <TextInput
                hideLabel
                id="button-channel-name"
                data-modal-primary-focus
                labelText="New Channel Name"
                placeholder="New Channel Name"
                value={this.state.newChannelName}
                onChange={this.handleChannelInput}
              />
            </ModalWrapper>
          )}
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
                  kind={this.state.newUserName ? "primary" : "secondary"}
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

class NewVideo extends React.Component {
  constructor() {
    super();
    this.state = { newVideoUrl: "", fetchingRandom: false };

    this.handleNewVideo = this.handleNewVideo.bind(this);
    this.handleVideoInput = this.handleVideoInput.bind(this);
  }

  handleNewVideo() {
    if (!this.state.newVideoUrl) {
      this.setState({ fetchingRandom: true });
      return axios.get("/random").then(res => {
        const url = `https://www.youtube.com/watch?v=${res.data.vid}`;
        this.props.handleNewVideo(url, this.props.channel);
        this.setState({ fetchingRandom: false });
      });
    }
    this.props.handleNewVideo(this.state.newVideoUrl, this.props.channel);
    this.setState({ newVideoUrl: "" });
  }

  handleVideoInput(event) {
    this.setState({ newVideoUrl: event.target.value });
  }

  render() {
    return this.state.fetchingRandom ? (
      <Loading withOverlay={false} />
    ) : (
      <React.Fragment>
        <TextInput
          hideLabel
          className="video-text"
          labelText="Generate User"
          id="generate-button-input"
          placeholder="Enter Video URL"
          value={this.state.newVideoUrl}
          onChange={this.handleVideoInput}
        />

        <Button
          onClick={this.handleNewVideo}
          kind={this.state.newVideoUrl ? "primary" : "secondary"}
          disabled={this.state.newVideoUrl && !isUrl(this.state.newVideoUrl)}
        >
          {this.state.newVideoUrl ? "Add Typed Url" : "Add Random Video"}
        </Button>
      </React.Fragment>
    );
  }
}

function isUrl(url) {
  return url.match(
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
  );
}

ReactDOM.render(<App />, document.getElementById("app"));

import React from 'react';
import {RNCamera} from 'react-native-camera';
import Video from 'react-native-video';
import {createThumbnail} from 'react-native-create-thumbnail';
import Duration from './Duration';
import Trimmer from './Trimmer';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Camera extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      recording: false,
      video: null,
      duration: null,
      images: [],
      timer: 0,
      paused: false,
    };
  }
  _takeVideo = async (video) => {
    if (this.camera) {
      try {
        const options = {
          videoBitrate: 8000000,
          maxDuration: 30,
          quality: RNCamera.Constants.VideoQuality['1080p'],
        };
        const promise = this.camera.recordAsync(options);
        if (promise) {
          this.setState({recording: true});
          this.interval = setInterval(
            () => {this.setState({timer: this.state.timer + 100});
                   console.log(this.state.timer);
                   if(this.state.timer >= 30000) {
                     this._stoprec();
                   }
            },
            100,
          );
          const data = await promise;
          this.setState({recording: false});
          this.setState({video: data.uri});
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  _stoprec = async () => {
    await this.camera.stopRecording();
    clearInterval(this.interval);
  };

  _record() {
    if (!this.state.recording) {
      this._takeVideo(this.state.video);
    } else {
      this._stoprec();
    }
  }

  seeImage(duration, actual) {
    createThumbnail({
      url: this.state.video,
      timeStamp: actual,
    }).then((response) => {
      console.log("foi")
      this.setState({
        images: this.state.images.concat(response.path),
      });
      var newActual = (1000*duration)/10;
      if (duration * 1000 > actual + newActual) {
        this.seeImage(duration, actual + newActual);
      } else {
        console.log('finalizou');
      }
    }).catch((err) => console.log({err}));
  }

  onLoad = (data) => {
    this.setState({duration: data.duration});
    this.seeImage(data.duration, 0);
    this.setState({paused: true});
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        {this.state.video ? (
          <Video
            source={{uri: this.state.video}}
            style={{
              width: '50%',
              height: '50%',
              position: 'absolute',
              top: height * 0.125,
              left: width * 0.25,
            }}
            ref={(ref) => {
              this.player = ref;
            }}
            paused={this.state.paused}
            onLoad={this.onLoad}
            repeat={true}
          />
        ) : (
          <RNCamera
            style={{flex: 1}}
            ref={(ref) => {
              this.camera = ref;
            }}
          />
        )}
        <Trimmer  style={{position: 'absolute', top: 100}}
                  teste={this.state.images}/>
        <Duration duration={this.state.timer}
                  total={30000}
                  style={{position: 'absolute', top: 0}}/>
        <View style={{position: 'absolute',
                      borderWidth: 3,
                      width: 90,
                      left: (width/2 - 45),
                      bottom: 70,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 90,
                      borderRadius: 100,
                      borderColor: "white"}}>
          <TouchableOpacity
            onPress={() => this._record()}
            style={{
              backgroundColor: this.state.recording ? 'white' : 'red',
              borderRadius: this.state.recording ? 0 : 100,
              width: this.state.recording ? 50 : 70,
              height: this.state.recording ? 50 : 70,
            }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  ball: {
    height: 90,
    width: 15,
    position: 'absolute',
    backgroundColor: 'red',
  },
  ball2: {
    height: 90,
    width: 15,
    position: 'absolute',
    backgroundColor: 'blue',
  },
});

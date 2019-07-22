import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';


const app = new Clarifai.App({apiKey: '89233b15b5e94ceca1de7417c19dbfea'});


const particlesOptions = {
  Particles: {
    number: {
      value: 30,
      density: {
        enable:true,
        value_area: 800
      }
    }
  }
}



class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      ImageUrl: ''
    }
  }

  onInputChange = (event) => {
   this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({ImageUrl: this.state.input})
    // app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
    //     .then(FaceDetectModel => {
    //       return FaceDetectModel.predict(this.state.input);
    //     })
    //     // .then(response => {
    //     //   var concepts = response['outputs'][0]['data']['concepts']
    //     // });


    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(
      function (response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {

      }
    );
  }

  render() {
    return(
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm  onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition  ImageUrl={this.state.ImageUrl}/> 
    </div>
    );
  }
}

export default App;

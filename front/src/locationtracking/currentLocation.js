import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const mapStyles = {
    map: {
      position: 'absolute',
      width: '100%',
      height: '100%'
    }
};

class CurrentLocation extends Component {
  constructor(props) {
    super(props);
    const { latitude, longitude } = this.props.initialCenter;
    const currentLocation = { latitude, longitude };

    this.state = {
        currentLocation
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  recenterMap() {
    const { map } = this;
    const {latitude,longitude} = this.state.currentLocation;

    const { maps } = this.props.google;

    if (map) {
      let center = new maps.LatLng(latitude, longitude);
      map.panTo(center);
    }
  }

  componentDidMount() {
    if (!this.props.centerAroundCurrentLocation || !navigator || !navigator.geolocation) {
      this.loadMap();
      return;
    }

    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const currentLocation = { latitude, longitude };

      this.setState({ 
        currentLocation
      });
    });
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      // checks if google is available
      const { maps } = this.props.google;

      const mapRef = this.refs.map;

      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);

      const { zoom } = this.props;
      const { latitude, longitude } = this.state.currentLocation;
      const center = new maps.LatLng(latitude, longitude);
      const mapConfig = Object.assign({},{
        center,
        zoom
      });

      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
    }
  }

  renderChildren() {
    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, clone => {
      if (!clone) return;
      const {map} = this;
      const {google} = this.props;
      return React.cloneElement(clone, {
        map,
        google,
        mapCenter: this.state.currentLocation
      });
    });
  }

  render() {
    const style = Object.assign({}, mapStyles.map);
    return (
      <div>
        <div style={style} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}

CurrentLocation.defaultProps = {
    zoom: 14,
    initialCenter: {
      latitude: -1.2884,
      longitude: 36.8233
    },
    centerAroundCurrentLocation: true,
    visible: true
};

export default CurrentLocation;

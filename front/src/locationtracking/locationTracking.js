import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {geolocated} from 'react-geolocated';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';




class LocationTracking extends Component {

	// The constructor takes properties defined as element attributes
	  // defined in JSX along with an initial default value for state.

	  constructor(props) {
	    super(props);
	    this.state = {
	      value: '0,0', // Null Island
	      error: null,
	    }
	  }
	  
	  componentDidMount() {
		    if (navigator.geolocation) {
		      navigator.geolocation.getCurrentPosition(
		        (position) => {
		          this.setState({
		            value: position.coords.latitude + ',' + position.coords.longitude,
		            latitude: position.coords.latitude,
		            longitude: position.coords.longitude,
		            error: null,
		          });
		        },
		        (error) => this.setState(
		          {error: error.message}
		        )
		      );
		    }
		  }
	  
	  changeLocation(evt) {
		    this.setState({
		        value: evt.target.value,
		        latitude: position.coords.latitude,
	            longitude: position.coords.longitude,
		      }
		    )
		  }
	  
	 render() {
		 const style = {
				  width: '100%',
				  height: '100%'
				}
		 
		    return (
		    		<div>
		    		<input
		              className="new-todo"
		              value={ this.state.value }
		              onChange={ evt => this.changeLocation(evt) }
		              />
		             
		    		<Map google={this.props.google}  style={style}
		    		initialCenter={{
		    			lat: this.state.latitude,
		    			lng: this.state.longitude
//		    			lat: 40.854885,
//		                lng: -88.081807
		    		}} zoom={14}>
		    		
		    		<Marker onClick={this.onMarkerClick}
		    		name={'Current location'} />
		    		
		    		<InfoWindow onClose={this.onInfoWindowClose} />
		    		</Map>
		      </div>
		    );
		  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyD4JvitorZUI1-6DZ7v6f68mPB-uQBc-cM")
}) (connect(null)(withRouter(LocationTracking)));

import React, { Component } from 'react';
import Particles from 'react-particles-js';

export default class CustomParticle extends Component {
	
	constructor(props){
		super(props);
	}

	shouldComponentUpdate(nextProps){
		return  (JSON.stringify(this.props) !== JSON.stringify(nextProps));
	}

	render(){
		return(
			<span>
				<Particles
					params={particleParam}
					style={particleStyle}
				/>
			</span>
		);
	}
}

const particleStyle = {
  width: '100%'
}

export const particleParam={
		particles: {
			number: {
				value: 200,
				density: {
					enable: true,
					value_area: 800
				}
			},
			color: {
				value: "#FFFFFF"
			},
			shape: {
				type: "circle",
				stroke: {
					width: 1,
					color: "#000000"
				},
				polygon: {
					nb_sides: 5
				},
				image: {
					src:" img/github.svg",
					width: 100,
					height: 100
				}
			},
			opacity: {
				value: 100,
				random: false,
				anim: {
					enable: true,
					speed: 1,
					opacity_min: 0,
					sync: false
				}
			},
			size: {
				value: 8,
				random: true,
				anim: {
					enable: true,
					speed: 3,
					size_min: 2,
					sync: false
				}
			},
			line_linked: {
				enable: true,
				distance: 100,
				color: "#FFFFFF",
				opacity: 2,
				width: 1,
				blur:5
			},
			move: {
				enable: true,
				speed: 3,
				direction: "none",
				random: true,
				straight: false,
				out_mode:" out",
				bounce: true,
				attract: {
					enable: true,
					rotateX: 600,
					rotateY: 600
				}
			}
		},
		interactivity: {
			detect_on: "canvas",
			events: {
				onhover: {
					enable: true,
					mode: "bubble"
				},
				onclick: {
					enable: false,
					mode: "repulse"
				},
				resize: true
			},
			modes: {
				grab: {
					distance: 400,
					line_linked: {
						opacity: 1
					}
				},
				bubble: {
					distance: 250,
					size: 0,
					duration: 2,
					opacity: 0,
					speed: 3
				},
				repulse: {
					distance: 400,
					duration: 0.4
				},
				push: {
					particles_nb: 4
				},
				remove: {
					particles_nb: 2
				}
			}
		},
		retina_detect: true
}

/*line_linked: {
	shadow: {
		enable: true,
		color: "#3CA9D1",
		blur: 5
	}
},*/
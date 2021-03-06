import React from 'react';
import axios from 'axios';
import { Card, Row, Col, Table, Spinner, Container } from 'react-bootstrap'
import './Planet.css'

class Planet extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			planetInfo: null,
			currentPlanetId: null,
			ready: false
		}
	}

	async fetchResidents(residents) {
		if (residents.length === 0) {
			return "0"
		}
		
		let fullResidentsList = []

		for (let i=0; i<residents.length; i++) {
			fullResidentsList[i] = await axios.get(residents[i])
		}

		for (let i=0; i<fullResidentsList.length; i++) {
			fullResidentsList[i] = fullResidentsList[i].data.name
		}

		let residentsList = fullResidentsList.join(', ')

		return residentsList
	}

	async fetchPlanet(){
		const planet = await axios.get("https://swapi.co/api/planets/" + this.props.id)
		const planetInfo = {
			name: planet.data.name,
			rotation_period: planet.data.rotation_period,
			orbital_period: planet.data.orbital_period,
			diameter: planet.data.diameter,
			climate: planet.data.climate,
			gravity: planet.data.gravity,
			terrain: planet.data.terrain,
			surface_water: planet.data.surface_water,
			population: planet.data.population,
			residents: await this.fetchResidents(planet.data.residents),
			films: planet.data.films
		}

		this.setState({ planetInfo: planetInfo, currentPlanetId: this.props.id, ready: true})
	}

	async componentDidUpdate(prevProps, prevState) {
		if (this.props.id !== undefined && this.props.id !== this.state.currentPlanetId){
			if (this.state.ready === false) {
				this.fetchPlanet()
			} else {
				this.setState({ ready: false })
			}
		}

	}

	render() {
		if (!this.state.ready) {
			return (
				<Container className="loading">
					<Spinner animation="border" variant="light" role="status">
						<span className="sr-only">Loading...</span>
					</Spinner>
				</Container>
		)
		} else {
			return (
				<Row>
					<Col md={{ span: 6, offset: 3 }}>
					<Card className="planet-info">
					<Card.Header>
						<div className="planet-name">
							{this.state.planetInfo.name}
						</div>
					</Card.Header>
					<Table>
						<tbody>
							<tr>
								<td>
									Rotation period
								</td>
								<td>
									{this.state.planetInfo.rotation_period}
								</td>
							</tr>
							<tr>
								<td>
									Orbital period
								</td>
								<td>
									{this.state.planetInfo.orbital_period}
								</td>
							</tr>
							<tr>
								<td>
									Diameter
								</td>
								<td>
									{this.state.planetInfo.diameter}
								</td>
							</tr>
							<tr>
								<td>
									Climate
								</td>
								<td>
									{this.state.planetInfo.climate}
								</td>
							</tr>
							<tr>
								<td>
									Gravity
								</td>
								<td>
								{this.state.planetInfo.gravity}
								</td>
							</tr>
							<tr>
								<td>
									Terrain
								</td>
								<td>
									{this.state.planetInfo.terrain}
								</td>
							</tr>
							<tr>
								<td>
									Surface water
								</td>
								<td>
									{this.state.planetInfo.surface_water}
								</td>
							</tr>
							<tr>
								<td>
									Population
								</td>
								<td>
									{this.state.planetInfo.population}
								</td>
							</tr>
							<tr>
								<td>
									Residents
								</td>
								<td>
									{this.state.planetInfo.residents}
								</td>
							</tr>
							<tr>
								<td>
									Films
								</td>
								<td>
									{this.state.planetInfo.films.length}
								</td>
							</tr>
						</tbody>
					</Table>
					<div className="planet-rotation_period">
					</div>
					<div className="planet-orbital_period">
					</div>
					<div className="planet-diameter">
					</div>
					<div className="planet-climate">
					</div>
					<div className="planet-gravity">
					</div>
					<div className="planet-terrain">
					</div>
					<div className="planet-surface_water">
					</div>
					<div className="planet-population">
					</div>
				</Card>
					</Col>
				</Row>

			)
		}
	}  
}

export default Planet;
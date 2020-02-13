import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
	Alert,
	Card,
	CardBody,
	CardHeader,
	FormGroup,
	InputGroupAddon,
	InputGroupText,
	Input,
	InputGroup,
	Label,
	Col,
	Button,
	Row,
} from 'reactstrap';

import { createDrinks, resetCreateDrinks } from '../../../actions/drinks/createDrinks'

class CreateDrinks extends Component {

	constructor(props) {

		super(props)

		this.state = {
			drinkName: '',
			yearMade: 1992,
			vineyard: '',
			quantity: 5,
			submitted: false,
			showMsg: false
		}
	}

	componentDidUpdate(prevProps) {

		const { success } = this.props

		if ((prevProps.success !== true && success === true)) {

			this.setState({
				drinkName: '',
				yearMade: 1992,
				vineyard: '',
				isSubmitted: false,
				quantity: 5,
				showMsg: true,
			})

			setTimeout(() => {
				this.setState({ showMsg: false })
				this.props.resetCreateDrinks()
			}, 3000)
		}
	}



	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}


	handleCreateDrink = () => {

		const {
			vineyard,
			drinkName,
			quantity,
			yearMade,
		} = this.state


		const drink = {
			vineyard: vineyard,
			drinkName: drinkName,
			quantity: quantity,
			yearMade: yearMade,
		}

		this.setState({
			isSubmitted: true
		})

		if (vineyard && drinkName && quantity && yearMade) {
			this.props.createDrinks(drink)
		}
		else {
			this.setState({
				hasFormError: true
			})
		}

	}

	render() {

		const {
			vineyard,
			drinkName,
			quantity,
			yearMade,
			isSubmitted,
			showMsg
		} = this.state

		const { loading } = this.props

		return (
			<div className="animated fadeIn">
				<Row>
					<Col>
						<Card>
							<CardHeader>
								<h5 style={{ paddingTop: 4 }}>Create Drinks</h5>
							</CardHeader>
							<CardBody style={{ paddingTop: 50, paddingBottom: 30 }}>
								<Col md={`6`} style={{ margin: '0 auto' }}>

									{showMsg &&
										<Alert color="success">
											Drink successfully added
                                	</Alert>}

									<FormGroup>
										<Label for="drinkName"> Name :  </Label>
										<InputGroup>
											<Input
												type='text'
												name="drinkName"
												placeholder={'Name of the Product'}
												maxLength="30"
												value={drinkName}
												onChange={this.handleChange}
												className={!drinkName && isSubmitted ? 'has-error' : ''} />

											<InputGroupAddon addonType="append">
												<InputGroupText>
													<i className="icon-cup"></i>
												</InputGroupText>
											</InputGroupAddon>
										</InputGroup>
									</FormGroup>


									<FormGroup>
										<Label for="vineyard"> Vineyard :  </Label>
										<InputGroup>
											<Input
												type='text'
												name="vineyard"
												placeholder={'Château Mouton Rothschild'}
												maxLength="30"
												value={vineyard}
												onChange={this.handleChange}
												className={!vineyard && isSubmitted ? 'has-error' : ''} />
											<InputGroupAddon addonType="append">
												<InputGroupText>
													<i className="icon-frame"></i>
												</InputGroupText>
											</InputGroupAddon>
										</InputGroup>
									</FormGroup>

									<FormGroup>
										<Label for="yearMade"> Year Manufactured :  </Label>
										<InputGroup>
											<Input
												type='number'
												name="yearMade"
												placeholder={'1671'}
												maxLength="30"
												value={yearMade}
												onChange={this.handleChange}
												className={!yearMade && isSubmitted ? 'has-error' : ''} />
											<InputGroupAddon addonType="append">
												<InputGroupText>
													<i className="icon-calendar"></i>
												</InputGroupText>
											</InputGroupAddon>
										</InputGroup>
									</FormGroup>

									<FormGroup>
										<Label for="quantity"> Quantity :  </Label>
										<InputGroup>
											<Input
												type='number'
												name="quantity"
												placeholder={'1671'}
												maxLength="30"
												value={quantity}
												onChange={this.handleChange}
												className={!quantity && isSubmitted ? 'has-error' : ''} />
											<InputGroupAddon addonType="append">
												<InputGroupText>
													<i className="icon-star"></i>
												</InputGroupText>
											</InputGroupAddon>
										</InputGroup>
									</FormGroup>

									<div className="align-right">
										<Button
											color="success"
											className="btn-spacing"
											onClick={this.handleCreateDrink}
											disabled={loading}
											style={{ float: 'right' }}>
											<i className="fa fa-unlock-alt fa-lg" /> Save
										</Button>
									</div>
								</Col>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	error: state.drinks.createDrinks.error,
	success: state.drinks.createDrinks.success,
	response: state.drinks.createDrinks.response,
	loading: state.drinks.createDrinks.loading,
})

const mapDispatchToProps = dispatch => ({
	createDrinks: (drink) => dispatch(createDrinks(drink)),
	resetCreateDrinks: () => dispatch(resetCreateDrinks())
})

PropTypes.CreateDrinks = {
	error: PropTypes.bool.isRequired,
	success: PropTypes.object.isRequired,
	response: PropTypes.bool,
	createDrinks: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDrinks)

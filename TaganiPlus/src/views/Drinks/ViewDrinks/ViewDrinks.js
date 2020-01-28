import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
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
	Row,
} from 'reactstrap';

import { getDrink } from '../../../actions/drinks/getDrink'

class ViewDrinks extends Component {

	componentDidMount() {
		const param = this.props.match.params
		this.props.getDrink(param.id)
	}



	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}



	render() {

		const {
			drink
		} = this.props


		if (drink && !drink.drinkName) {
			return (
				<div>
					No data found
				</div >)
		}

		if (drink && drink.drinkName) {
			return (
				<div className="animated fadeIn">
					<Row>
						<Col>
							<Card>
								<CardHeader>
									<h5 style={{ paddingTop: 4 }}>View Drinks</h5>
								</CardHeader>
								<CardBody style={{ paddingTop: 50, paddingBottom: 30 }}>
									<Col md={`6`} style={{ margin: '0 auto' }}>

										<FormGroup>
											<Label for="drinkName"> Name :  </Label>
											<InputGroup>
												<Input
													type='text'
													name="drinkName"
													placeholder={'Name of the Product'}
													maxLength="30"
													value={drink.drinkName}
													disabled={true}
												/>

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
													value={drink.vineyard}
													disabled={true}
												/>
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
													value={drink.yearMade}
													disabled={true} />
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
													value={drink.quantity}
													disabled={true} />
												<InputGroupAddon addonType="append">
													<InputGroupText>
														<i className="icon-star"></i>
													</InputGroupText>
												</InputGroupAddon>
											</InputGroup>
										</FormGroup>
									</Col>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			)

		}
	}
}

const mapStateToProps = state => ({
	error: state.drinks.drink.error,
	response: state.drinks.drink.response,
	loading: state.drinks.drink.loading,
	drink: state.drinks.drink.data
})

const mapDispatchToProps = dispatch => ({
	getDrink: (id) => dispatch(getDrink(id)),
})

PropTypes.ViewDrinks = {
	error: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	success: PropTypes.object.isRequired,
	response: PropTypes.bool,
	getDrink: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewDrinks)

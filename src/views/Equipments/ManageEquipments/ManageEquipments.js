import React, { Component } from 'react';
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

import CurrencyInput from './CurrencyInput'
import { createDrinks, resetCreateDrinks } from '../../../actions/drinks/createDrinks'

class ManageEquipments extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			equipmentName: '',
			vendorID: '',
			cost: 0,
			quantity: 1,
			measurement: 0,
			equipmentType: '',
			purchaseDate: 1990,
			expDate: 2020,
			submitted: false,
			showMsg: false
		}
	}

	componentDidUpdate(prevProps) {
		const { success } = this.props
		if ((prevProps.success !== true && success === true)) {
			this.setState({
				equipmentName: '',
				vendorID: '',
				cost: 0,
				quantity: 1,
				measurement: 0,
				equipmentType: '',
				purchaseDate: 1990,
				expDate: 2020,
				isSubmitted: false,
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
			equipmentID,
			equipmentName,
			vendorID,
			cost,
			quantity,
			measurement,
			equipmentType,
			purchaseDate,
			expDate
		} = this.state


		const equipment = {
			equipmentID: equipmentID,
			equipmentName: equipmentName,
			vendorID: vendorID,
			cost: cost,
			quantity: quantity,
			measurement: measurement,
			equipmentType: equipmentType,
			purchaseDate: purchaseDate,
			expDate: expDate,
		}

		this.setState({
			isSubmitted: true
		})

		if (equipmentID && equipmentName && vendorID && cost && quantity && measurement && equipmentType && purchaseDate) {
			this.props.createDrinks(equipment)
		}
		else {
			this.setState({
				hasFormError: true
			})
		}
	}



	render() {
		const {
			equipmentID,
			equipmentName,
			vendorID,
			cost,
			quantity,
			measurement,
			equipmentType,
			purchaseDate,
			expDate,
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
								<h5 style={{ paddingTop: 4 }}>Manage Equipments</h5>
							</CardHeader>
							<CardBody style={{ paddingTop: 50, paddingBottom: 30 }}>
								<Row md={`6`} style={{ marginLeft: 190, marginRight: 190 }}>
									<FormGroup>
										<Label for="equipmentName"> Name :  </Label>
										<InputGroup>
											<InputGroupAddon addonType="append">
												<InputGroupText>
													<i className="icon-screen-smartphone"></i>
												</InputGroupText>
												<Input
													type='text'
													name="equipmentName"
													placeholder={'Name of the Product'}
													maxLength="30"
													value={equipmentName}
													onChange={this.handleChange}
													className={!equipmentName && isSubmitted ? 'has-error' : ''}
												/>
											</InputGroupAddon>
										</InputGroup>
									</FormGroup>
									<Col size='5'/>
									<FormGroup>
										<Label for="vendorID"> Vendor :  </Label>
										<InputGroup>
											<InputGroupAddon addonType="append">
												<InputGroupText>
													<i className="icon-user-follow"></i>
												</InputGroupText>
												<Input
													type='text'
													name="vendorID"
													placeholder={'Name of Vendor'}
													maxLength="30"
													value={vendorID}
													onChange={this.handleChange}
													className={!vendorID && isSubmitted ? 'has-error' : ''}
												/>
											</InputGroupAddon>
										</InputGroup>
									</FormGroup>

								</Row>
								<Row md={`6`} style={{ marginLeft: 190, marginRight: 190 }}>

									<FormGroup>
										<Label for="cost"> Cost :  </Label>
										<InputGroup>
											<InputGroupAddon addonType="append">
												<InputGroupText>
													<i className="icon-paypal"></i>
												</InputGroupText>
												<CurrencyInput placeholder="PHP 0.00" type="text" />
											</InputGroupAddon>
										</InputGroup>
									</FormGroup>
									<Col/>
									<FormGroup>
										<Label for="quantity"> Quantity :  </Label>
										<InputGroup>
											<InputGroupAddon addonType="append">
												<InputGroupText>
													<i className="icon-star"></i>
												</InputGroupText>
												<Input
													type='number'
													name="quantity"
													maxLength="30"
													value={quantity}
													onChange={this.handleChange}
													className={!quantity && isSubmitted ? 'has-error' : ''}
												/>
											</InputGroupAddon>
										</InputGroup>
									</FormGroup>

								</Row>
								<Row md={`6`} style={{ marginLeft: 190, marginRight: 190 }}>

									<FormGroup>
										<Label for="measurement"> Measurement :  </Label>
										<InputGroup>
											<InputGroupAddon addonType="append">
												<InputGroupText>
													<i className="icon-speedometer"></i>
												</InputGroupText>
												<Input
													type='select'
													name="measurement"
													value={measurement}
													onChange={this.handleChange}
													className={!measurement && isSubmitted ? 'has-error' : ''}
												>
													<option>KG</option>
													<option>PCS</option>
													<option>L</option>
												</Input>

											</InputGroupAddon>
										</InputGroup>
									</FormGroup>
									<Col/>
									<FormGroup>
										<Label for="equipmentType"> Equipment Type :  </Label>
										<InputGroup>
											<InputGroupAddon addonType="append">
												<InputGroupText>
													<i className="icon-screen-desktop"></i>
												</InputGroupText>
												<Input
													type='select'
													name="equipmentType"
													placeholder={'Type of Equipment'}
													maxLength="30"
													value={equipmentType}
													onChange={this.handleChange}
													className={!equipmentType && isSubmitted ? 'has-error' : ''}
												>
													<option>Machinery</option>
													<option>Seeds</option>
													<option>Chemicals</option>
												</Input>
											</InputGroupAddon>
										</InputGroup>
									</FormGroup>

								</Row>
								<Row md={`6`} style={{ marginLeft: 190, marginRight: 190 }}>

									<FormGroup>
										<Label for="purchaseDate"> Year Purchased :  </Label>
										<InputGroup>
											<InputGroupAddon addonType="append">
												<InputGroupText>
													<i className="icon-calendar"></i>
												</InputGroupText>
												<Input
													type='date'
													name="purchaseDate"
													maxLength="30"
													value={purchaseDate}
													onChange={this.handleChange}
													className={!purchaseDate && isSubmitted ? 'has-error' : ''}
												/>
											</InputGroupAddon>
										</InputGroup>
									</FormGroup>
									<Col/>
									<FormGroup>
										<Label for="expDate"> Expiration Date :  </Label>
										<InputGroup>
											<InputGroupAddon addonType="append">
												<InputGroupText>
													<i className="icon-paper-clip"></i>
												</InputGroupText>
												<Input
													type='date'
													name="expDate"
													maxLength="30"
													value={expDate}
													onChange={this.handleChange}
													className={!expDate && isSubmitted ? 'has-error' : ''}
												/>
											</InputGroupAddon>
										</InputGroup>
									</FormGroup>

								</Row>
								<Row md={`6`} style={{ marginLeft: 190, marginRight: 190 }}>
									{showMsg &&
										<Alert color="success">
											Drink successfully added
                                		</Alert>
									}
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
								</Row>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	error: state.equipment.createDrinks.error,
	success: state.equipment.createDrinks.success,
	response: state.equipment.createDrinks.response,
	loading: state.equipment.createDrinks.loading,
})

const mapDispatchToProps = dispatch => ({
	createDrinks: (equipment) => dispatch(createDrinks(equipment)),
	resetCreateDrinks: () => dispatch(resetCreateDrinks())
})

PropTypes.CreateDrinks = {
	error: PropTypes.bool.isRequired,
	success: PropTypes.object.isRequired,
	response: PropTypes.bool,
	createDrinks: PropTypes.func,
}

export default ManageEquipments

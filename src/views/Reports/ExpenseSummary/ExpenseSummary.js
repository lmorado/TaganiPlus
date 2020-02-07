import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Line } from 'react-chartjs-2'
import {
	Container,
	Col,
	Row,
	Card,
	CardBody,
	FormGroup,
	Label,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Input,
	Alert,
	Button,
} from 'reactstrap';
import StyledCardHeader from '../../../components/StyledCardHeader'
import Popup from 'reactjs-popup'
import CurrencyInput from '../../../components/CurrencyInputs'
import PropTypes from 'prop-types'
import { createExpense, resetCreateExpense } from '../../../actions/reports/createExpense'


class ExpenseSummary extends Component {
	constructor(props) {
		super(props)
		this.state = {
			amount: '',
			year: '',
		}
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}
	openModal() {
		this.setState({ open: true });
	}
	closeModal() {
		this.setState({ open: false });
	}
	componentDidUpdate(prevProps) {
		const { success } = this.props
		if ((prevProps.success !== true && success === true)) {
			this.setState({
				amount: '',
				year: '',
				isSubmitted: false,
				showMsg: true,
			})

			setTimeout(() => {
				this.setState({ showMsg: false })
				this.props.resetCreateExpense()
			}, 3000)
		}
	}
	handleCreateExpense = () => {
		const {
			amount,
			year,
		} = this.state

		const expense = {
			amount: amount,
			year: year,
		}

		this.setState({
			isSubmitted: true
		})

		if ( amount && year) {
			this.props.createExpense(expense)
		}
		else {
			this.setState({
				hasFormError: true
			})
		}
	}
	handleChange = (e) => {
		this.setState({
		  [e.target.name]: e.target.value
		})
	}

	render() {
		const {
			amount,
			year,
			isSubmitted,
			showMsg
		} = this.state
		const { loading } = this.props
		
		const dataLine = {
			labels: [2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],
			datasets: [{
				data: [86,114,106,106,107,111,133,221,783,2478],
				label: "Expense",
				borderColor: "red",
				fill: false
			}]
		};
		return (
			<Container fluid style={{paddingLeft:'7px',paddingRight:'7px'}}>
				<Row>
					<Col className="md-12">
						<Card>
							<StyledCardHeader>
								<div>
									<Button className="ml-15 pull-right" onClick={this.openModal}>
										<i className="fa fa-plus-circle" />  Add Expense
									</Button>
									<Popup
										open={this.state.open}
										closeOnDocumentClick
										onClose={this.closeModal}
									>
										<div className="animated fadeIn" style= {{height:"310px"}}>
											<Card>
												<StyledCardHeader>
													<a className="fa fa-close fa-lg pull-right" onClick={this.closeModal} />
													<h5 style={{ paddingTop: 4}}>Add Expense</h5>
												</StyledCardHeader>
												<CardBody >
													{showMsg && <Alert color="success"> Expense successfully added. </Alert>}
													<Col>
														<Row>
															<div style={{ position:'relative', marginLeft:'auto', marginRight:'auto' }}>
																<FormGroup>
																	<Label for="amount"> Cost :  </Label>
																	<InputGroup>
																		<InputGroupAddon addonType="append" style={{height:'35px', width:'350px'}}>
																		<InputGroupText>
																			<i className="icon-paypal"></i>
																		</InputGroupText>
																		<CurrencyInput
																			name="amount"
																			placeholder="PHP 0.00"
																			onChange={this.handleChange}
																			className={!amount && isSubmitted ? 'has-error' : ''}
																		/>
																		</InputGroupAddon>
																	</InputGroup>
																</FormGroup>
																<FormGroup>
																	<Label for="year"> Year :  </Label>
																	<InputGroup>
																		<InputGroupAddon addonType="append" style={{width:'350px'}}>
																		<InputGroupText>
																			<i className="icon-user-follow"></i>
																		</InputGroupText>
																		<Input
																			type='number'
																			name="year"
																			placeholder={'2001'}
																			onChange={this.handleChange}
																			className={!year && isSubmitted ? 'has-error' : ''}
																		/>
																		</InputGroupAddon>
																	</InputGroup>
																</FormGroup>
															</div>
														</Row>
													</Col>
													<div className="align-right">
														<Button
															color="success"
															className="btn-spacing"
															onClick={this.handleCreateExpense}
															disabled={loading}
															style={{ float: 'right' }}>
															<i className="fa fa-unlock-alt fa-lg" /> Save
														</Button>
													</div>
												</CardBody>
											</Card>
										</div>
									</Popup>
								</div>
								<h3 className="box-title">Expense Summary</h3>
							</StyledCardHeader>
							<CardBody >
								
								<div className="text-center">
									<Line 
										data={dataLine}
										height={400}
										options={{ maintainAspectRatio: false}}
									/>
								</div>	
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		)
	}
}

const mapStateToProps = state => ({
	error: state.reports.createExpense.error,
	success: state.reports.createExpense.success,
	response: state.reports.createExpense.response,
	loading: state.reports.createExpense.loading,
})

const mapDispatchToProps = dispatch => ({
	createExpense: (expense) => dispatch(createExpense(expense)),
	resetCreateExpense: () => dispatch(resetCreateExpense()),
})

PropTypes.CreateDrinks = {
	error: PropTypes.bool.isRequired,
	success: PropTypes.object.isRequired,
	response: PropTypes.bool,
	createExpense: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseSummary) 

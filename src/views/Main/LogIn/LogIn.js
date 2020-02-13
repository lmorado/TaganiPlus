import React, { Component } from 'react';
import {
	Container,
	Card,
	Col,
	Row,
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
import StyledCardHeader from '../../../components/StyledCardHeader';



class LogIn extends Component {

	constructor(props) {
		super(props)
		this.state = {
			userName: '',
			passWord: '',
			captcha: '',
			submitted: false,
			showMsg: false,
			type: 'password',
			eye: 'fa fa-eye-slash fa-lg',
			random: Math.floor(100000 + Math.random() * 900000)
		}
	}

	handleChange = (e) => {
		this.setState({
		  [e.target.name]: e.target.value
		})
	}

	handleClick = () => this.setState(({type,eye}) => ({
		type: type === 'password' ? 'text' : 'password',
		eye: eye === 'fa fa-eye-slash fa-lg' ? 'fa fa-eye fa-lg' : 'fa fa-eye-slash fa-lg'
	}))

	render() {

		const {
			userName,
			passWord,
			captcha,
			isSubmitted,
			showMsg
		} = this.state
		const { loading } = this.props

		return (
			<Container style={{width:500, height:500}}>
				<Card>
					<StyledCardHeader>
            			<h5 style={{ paddingTop: 4}}> Log In </h5>
					</StyledCardHeader>
					<CardBody >
						{showMsg && <Alert color="success"> Login successful. </Alert>}
						<Col>
							<Row>
								<div style={{ position:'relative', marginLeft:'auto', marginRight:'auto' }}>
									<FormGroup>
										<Label style={{color:'black'}} for="userName"> Username :  </Label>
										<InputGroup>
											<InputGroupAddon addonType="append">
											<InputGroupText>
												<i className="icon-user"></i>
											</InputGroupText>
											<Input
												type='text'
												name="userName"
												placeholder='Username'
												onChange={this.handleChange}
												className={!userName && isSubmitted ? 'has-error' : ''}
											/>
											</InputGroupAddon>
										</InputGroup>
									</FormGroup>
									<FormGroup>
										<Label style={{color:'black'}} for="passWord"> Password :  </Label>
										<InputGroup>
											<InputGroupAddon addonType="append">
											<Input
												type={this.state.type}
												name="passWord"
												placeholder='Password'
												onChange={this.handleChange}
												className={!passWord && isSubmitted ? 'has-error' : ''}
											/>
											<InputGroupText>
												<i className={this.state.eye} onClick={this.handleClick}></i>
											</InputGroupText>
											</InputGroupAddon>
										</InputGroup>
									</FormGroup>
									<FormGroup>
										<Label style={{color:'black'}} for="captcha"> Captcha :  </Label>
										<Row>
										<Col>
											<InputGroup style={{width:92}}>
												<InputGroupAddon>
												<Input
													type='number'
													name="captcha"
													
													placeholder='Captcha'
													onChange={this.handleChange}
													className={!captcha && isSubmitted ? 'has-error' : ''}
												/>
												</InputGroupAddon>
											</InputGroup>
										</Col>
										<Col>
											<InputGroup style={{width:92}}>
												<InputGroupAddon>
												<Input
													type='number'
													disabled="true"
													value={this.state.random}
												/>
												</InputGroupAddon>
											</InputGroup>
										</Col>
										</Row>
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
								<i className="fa fa-unlock-alt fa-lg" /> Login
							</Button>
						</div>
					</CardBody>
				</Card>
			</Container>
		)
	}
}

export default LogIn

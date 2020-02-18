import React, { Component } from 'react';
import { Doughnut, Line } from 'react-chartjs-2'
import {
	Container,
	Col,
	Row,
	Card,
	CardBody,
	Table
} from 'reactstrap';
import StyledCardHeader from '../../components/StyledCardHeader';

import { StyledContainer, StyledButton, StyledLabel, StyledForm, StyledHeader, StyledPage, RedContainer, TaganiHeader, ParaStyle, ResendButton, BigButton } from './styles'
import ProgressBar from './ProgressBar';


class Welcome extends Component {

	constructor(props) {

		super(props)

		this.state = {
			percentage:90,
		}
	}

	render() {
		return (
			<StyledContainer>
				<Col md="4" style={{position:'absolute', right:'250px'}}>
					<ProgressBar percentage={this.state.percentage}/>
				</Col>
				<div style={{ display: 'block', height: '65px', margin: 'auto', paddingBottom: '24px' }}></div>
				<StyledForm onSubmit={this.handleLogin}>
					<StyledHeader>Welcome to Tagani, {this.state.firstname}! </StyledHeader>
					<div style={{ display: 'block', width: '258px', margin: 'auto', paddingBottom: '24px' }}></div>
					<ParaStyle style={{padding:'0'}}>In order to access more Tagani PLUS features, you need to accomplish the following assessments. <b>Annie</b>, your dedicated Tagani Partner, will be in contact with you to guide you in the process.</ParaStyle>
					<div style={{ display: 'block', width: '258px', margin: 'auto', paddingBottom: '24px' }}></div>
					<Row>
					<Col md="4">
						<BigButton>
							<i className="fa fa-user-o fa-5x"></i>
							<h4>Entrepreneurial Profile</h4>
						</BigButton>
					</Col>
					<Col md="4">
						<BigButton>
							<i className="fa fa-map-marker fa-5x"></i>
							<h4>Site Profile</h4>
						</BigButton>
					</Col>
					<Col md="4">
						<BigButton>
							<i className="fa fa-search fa-5x"></i>
							<h4>Site Audit</h4>
						</BigButton>
					</Col>
					</Row>
				</StyledForm>
			</StyledContainer>
		)
	}
}

export default Welcome

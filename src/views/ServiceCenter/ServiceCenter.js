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


class ServiceCenter extends Component {

	constructor(props) {

		super(props)

		this.state = {
			percentage:90,
		}
	}

	render() {
		return (
			<StyledPage>
			<TaganiHeader></TaganiHeader>
			<RedContainer>
			<StyledContainer>
				<Col md="4" style={{position:'absolute', right:'250px'}}>
					<ProgressBar percentage={75}/>
				</Col>
				<div style={{ display: 'block', height: '65px', margin: 'auto', paddingBottom: '24px' }}></div>
				<StyledForm>
					<StyledHeader>Tagani Support Center</StyledHeader>
					<div style={{ display: 'block', width: '258px', margin: 'auto', paddingBottom: '24px' }}></div>
					<Row>
						<Col md="3">
							<img src="https://tagani.ph/wp-content/uploads/2019/12/Group-6-Copy-4.jpg" style={{ width: 150, height: 150, borderRadius:75 }} />
						</Col>
						<Col md="9">
							<StyledHeader style={{color:'#363636'}}>Hi, {this.state.firstname}! My name is Annie.</StyledHeader>
							<ParaStyle style={{padding:'0'}}>I will be your dedicated Tagani Partner. I am here to help you get started and grow your agribusiness through Tagani PLUS! You can ﬁnd my contact details below, so feel free to contact me if you need help.</ParaStyle>
						</Col>
					</Row>
					<Row>
						<Col md="3"></Col>
						<Col md="5">
							<ParaStyle style={{padding:'0'}}><b>Phone:</b> +639176578884 </ParaStyle>
							<ParaStyle style={{padding:'0'}}><b>Landline:</b> +63(02)86324741 </ParaStyle>
							<ParaStyle style={{padding:'0'}}><b>Email:</b> annie@tagani.ph,support@tagani.ph </ParaStyle>
						</Col>
						<Col md="4">
							<ResendButton
								color="primary"
								style={{ width: "100%", height: "50%"}}
							>
								Download
							</ResendButton>
						</Col>
					</Row>
					<Row style={{ transition: "all 1s ease-in-out", marginTop: 15 }}>
						<Col md="10"></Col>
						<Col md="2">
							<StyledButton
								color="primary"
								style={{ width: "100px" }}
							>
								Get Started
							</StyledButton>
						</Col>
					</Row>
				</StyledForm>
			</StyledContainer>
			</RedContainer>
			</StyledPage>
		)
	}
}

export default ServiceCenter

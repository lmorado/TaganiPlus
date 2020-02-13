import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from 'reactstrap';

import { FormattedMessage } from 'react-intl'

const resetPWFormattedMessage = {
    login: <FormattedMessage id="Global.Login" defaultMessage="Login" />,
    enteremailaddress: <FormattedMessage id="Login.EnterEmailAddress" defaultMessage="Enter your email address" />,
    forgotpasswordinstruction: <FormattedMessage id="Login.ForgotPasswordInstruction" defaultMessage="Enter your email address and we will send you a link to reset your password." />,
    resetyourpassword: <FormattedMessage id="Login.ResetYourPassword" defaultMessage="Reset Your Password" />,
    sendpwresetemail: <FormattedMessage id="Login.SendPWResetEmail" defaultMessage="Send password reset email" />,
}


export default class ResetPassword extends Component {
    state = {
        email: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
    }
    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form onSubmit={this.handleSubmit}>
                                            <h1>{resetPWFormattedMessage.resetyourpassword}</h1>
                                            <p className="text-muted">{resetPWFormattedMessage.forgotpasswordinstruction}</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText><i className="icon-envelope"></i></InputGroupText>
                                                </InputGroupAddon>
                                                <FormattedMessage id="Login.EnterEmailAddress" defaultMessage="Enter your email address" >
                                                    {placeholder =>
                                                        <Input
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            placeholder={placeholder}
                                                            onChange={this.handleChange}
                                                            required />
                                                    }
                                                </FormattedMessage>
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button block color="dark" onClick={this.Submit}>{resetPWFormattedMessage.sendpwresetemail}</Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Link to="/login">
                                                        <Button color="link" className="px-0">{resetPWFormattedMessage.login}</Button>
                                                    </Link>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

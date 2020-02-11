import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Switch from 'react-switch'
import {
    Col,
} from 'reactstrap'
import { formattedMessages } from '../../../translations/formattedMessageTranslation'
import styled from 'styled-components'

const VerticalHeaderActionsDiv = styled.div`
    margin: 20px 0px;
    display: flex; 
    flex-direction: row;
    width: 100%;
`

export default class VerticalHeaderActions extends Component {

    static propTypes = {
        toggleSwitch: PropTypes.func.isRequired,
        isEnabled: PropTypes.bool.isRequired,
        disabled: PropTypes.bool.isRequired
    }

    render() {
        const { toggleSwitch, isEnabled, disabled } = this.props
        return (
            <VerticalHeaderActionsDiv>
                <Col md="6">
                    <Switch
                        onChange={() => toggleSwitch(isEnabled)}
                        onColor="#4dbd74"
                        checked={isEnabled}
                        uncheckedIcon={<p className="disabledSwitch">{formattedMessages.disabled}</p>}
                        checkedIcon={<p className="enableSwitch">{formattedMessages.enable}</p>}
                        className="customname"
                        disabled={disabled}
                    />
                </Col>
            </VerticalHeaderActionsDiv>
        )
    }
}
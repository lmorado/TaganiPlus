import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Switch from 'react-switch'
import {
    Col,
} from 'reactstrap'
import { FormattedMessage } from 'react-intl'

const formattedMessages = {
    maxvalue: <FormattedMessage id="Global.MaxValue" defaultMessage="Max Value" />,
    resetform: <FormattedMessage id="Global.ResetForm" defaultMessage="Reset Form" />,
    enable: <FormattedMessage id="Global.Enable" defaultMessage="Enable" />,
    disabled: <FormattedMessage id="Global.Disabled" defaultMessage="Disabled" />,
}


export default class VerticalHeaderActions extends Component {
    static propTypes = {
        toggleSwitch: PropTypes.func.isRequired,
        isEnabled: PropTypes.bool.isRequired,
        resetForm: PropTypes.func.isRequired,
        maxValueForm: PropTypes.func,
    }

    render() {
        const { toggleSwitch, isEnabled, resetForm } = this.props
        return (
            <div style={{ margin: '20px 0', display: 'flex', flexDirection: 'row', width: '100%' }}>
                <Col md="6">
                    <Switch
                        onChange={toggleSwitch}
                        onColor="#4dbd74"
                        checked={isEnabled}
                        uncheckedIcon={<p className="disabledSwitch">{formattedMessages.disabled}</p>}
                        checkedIcon={<p className="enableSwitch">{formattedMessages.enable}</p>}
                        className="customname"
                        disabled={false}
                    />
                </Col>
                <Col md="6" style={{ textAlign: 'right' }}>
                    <button
                        type="button"
                        onClick={resetForm}
                        style={{ padding: '0.25rem 0.75rem', marginTop: 2, width: 100, marginRight: 5 }}
                        className="btn btn-square btn-dark"
                        disabled={(isEnabled) ? false : true}
                    >{formattedMessages.resetform}</button>
                </Col>
            </div>
        )
    }
}
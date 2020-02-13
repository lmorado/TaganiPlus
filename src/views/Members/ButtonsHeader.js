import React from 'react'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'
import { Col } from 'reactstrap'
import { FormattedMessage } from 'react-intl'

const formattedMessages = {
    agent: <FormattedMessage id="Members.Agent" defaultMessage="Agent" />,
    reset: <FormattedMessage id="Global.Reset" defaultMessage="Reset" />,
    save: <FormattedMessage id="Global.Save" defaultMessage="Save" />,
    allmax: <FormattedMessage id="Global.AllMax" defaultMessage="All Max" />,
    copyagent: <FormattedMessage id="Members.CopyAgent" defaultMessage="Copy Agent" />,
    copymember: <FormattedMessage id="Global.CopyMember" defaultMessage="Copy Member" />,
}

const ButtonsHeader = ({ }) => {
    return (
        <div style={{ float: "right" }}>
            <Col xs='12'>
                <Button
                    className="btn-spacing"
                    type="submit"
                    size="sm"
                    color="success">
                    <i className="fa fa-plus-square"></i> {formattedMessages.save}
                </Button>
            </Col>
        </div>
    )
}

PropTypes.ButtonsHeader = {
    resetForm: PropTypes.func,
    toggleModalAgent: PropTypes.func,
    maxAllForm: PropTypes.number,
    copyAgentMemberTitle: PropTypes.string
}

export default ButtonsHeader
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
} from 'reactstrap'

import InputSelect from '../../../components/InputSelect'
import VerticalHeaderActions from './VerticalHeaderActions'
import PositionTaking from './PositionTaking'
import MemberPositionTaking from './MemberPositionTaking';
import { formattedMessages } from '../../../translations/formattedMessageTranslation'

export default class Virtual extends Component {

    renderError = (field) => {
        const {
            isSubmitted, virtual_pt,
            enableVirtualForm
        } = this.props
        let result = ''

        switch (field) {
            case 'virtual_pt': result = (isSubmitted && !virtual_pt && enableVirtualForm) ? "PT is required" : null; break
            default: return null
        }
        return result
    }

    render() {
        const {
            handleChange,
            data, toggleVirtual, virtual_com,
            resetVirtual, enableVirtualForm,
            maxValueVirtual,
            userType,
            toggleTakeRemaining
        } = this.props

        return (
            <Row>
                <VerticalHeaderActions
                    toggleSwitch={toggleVirtual}
                    isEnabled={enableVirtualForm}
                    resetForm={resetVirtual}
                    maxValueForm={maxValueVirtual}
                />

                {userType === 'Agent' ?

                    <PositionTaking
                        data={data}
                        renderError={this.renderError}
                        enableForm={enableVirtualForm}
                        toggleTakeRemaining={toggleTakeRemaining}
                        {...this.props}
                    /> :

                    <MemberPositionTaking
                        data={data}
                        renderError={this.renderError}
                        enableForm={enableVirtualForm}
                        {...this.props} />}


                <Col sm='6' xs='6' md="6" lg="6" xl='6' style={{ marginLeft: 12 }}>
                    <Card>
                        <CardHeader className="customCardHeader" style={{ background: '#f0f3f5 !important' }}>{formattedMessages.commissionsetting}</CardHeader>
                        <CardBody>
                            {data && data.commissions.map((val, i) => {
                                return (
                                    <Row key={i}>
                                        <Col xs='6' sm='6' md="6" lg="6" xl='6'>
                                            <label style={{ textAlign: 'center' }}>{formattedMessages.commission}</label></Col>
                                        <Col style={{ paddingLeft: 5, paddingRight: 5 }} xs='5' md="3" sm="4" lg='3' xl='2'>
                                            <InputSelect
                                                type="commission"
                                                handleChange={handleChange}
                                                endNumber={`${val.rate}`}
                                                name="virtual_com"
                                                append="%"
                                                className={(this.renderError('virtual_com') ? 'error' : '')}
                                                error={this.renderError('virtual_com')}
                                                isDisabled={(enableVirtualForm) ? false : true}
                                                value={virtual_com}
                                            />
                                        </Col>
                                    </Row>
                                )
                            })}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}
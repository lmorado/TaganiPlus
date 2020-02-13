import React, { Component } from 'react'
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { memberSettingsFM, languageFM, lineTypeFM, viewTypeFM, oddsFormatFM, } from './translation'


const Select = styled.select`
    display: block;
    font-size: .875rem;
    line-height: 1.5;
    color: #5c6873;
    height: calc(2.0625rem + 2px);
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #e4e7ea;
    min-width: 100%;

    :disabled {
        background: #dddddd;
    }
`
const Label = styled.label`
    display: inline-block;
    margin-bottom: 0.5rem;
    min-height: 15px;
    margin-top:1px;
`

class MemberSettings extends Component {

    render() {
        const {
            handleChange,
            language,
            lineType,
            viewType,
            oddsType
        } = this.props

        return (
            <Card>
                <CardHeader style={{ width: '100%' }} className="customCardHeader">
                    <Row style={{ width: '100%' }}>
                        <Col lg='8' md='8' sm='8' xs='6' >
                            <label>{memberSettingsFM}</label>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <div style={{ marginBottom: 20 }}>
                        <Row style={{ width: '100%' }}>
                            <Col lg="3" md="6" sm="12">
                                <Label>{languageFM}</Label>
                                <Select name="language" value={language} onChange={handleChange}>
                                    <option value="2">Thai - ไทย</option>
                                    <option value="1">English</option>
                                    <option value="3">Burmese - ဗမာစာ </option>
                                    <option value="4">Lao - ລາວ</option>
                                    <option value="5">Korean - 한국어</option>
                                    <option value="6">Traditional Chinese - 繁體中文</option>
                                    <option value="7">Simplified Chinese - 简体中文</option>
                                    <option value="8">Vietnamese - Tiếng Việt</option>
                                    <option value="9">Bahasa Indonesia</option>
                                    <option value="10">Khmer - ាសាខ្មែរ</option>
                                    <option value="11">Japanese - 日本語</option>
                                    <option value="12">Malay - Bahasa Melayu</option>
                                </Select>
                            </Col>
                            <Col md="6" lg="3" sm="12">
                                <Label>{lineTypeFM}</Label>
                                <Select name="lineType" value={lineType} onChange={handleChange}>
                                    <FormattedMessage id="Members.Double" defaultMessage="Double" >
                                        {double =>
                                            <option value="2">{double}</option>}
                                    </FormattedMessage>

                                    <FormattedMessage id="Members.Signle" defaultMessage="Single" >
                                        {single =>
                                            <option value="1">{single}</option>}
                                    </FormattedMessage>
                                </Select>
                            </Col>
                            <Col md="6" lg="3" sm="12">
                                <Label>{viewTypeFM}</Label>
                                <Select name="viewType" value={viewType} onChange={handleChange} disabled>
                                    <FormattedMessage id="Members.AsiaView" defaultMessage="Asia View" >
                                        {asia =>
                                            <option value="1">{asia}</option>}
                                    </FormattedMessage>

                                    <FormattedMessage id="Members.EuropeanView" defaultMessage="European View" >
                                        {eur =>
                                            <option value="2">{eur}</option>}
                                    </FormattedMessage>
                                </Select>
                            </Col>

                            <Col lg="3" md="6" sm="12">
                                <Label>{oddsFormatFM}</Label>

                                <Select name="oddsType" value={oddsType} onChange={handleChange}>
                                    <FormattedMessage id="Members.MalaysianOdds" defaultMessage="Malaysian Odds" >
                                        {mal =>
                                            <option value="1">{mal}</option>}
                                    </FormattedMessage>

                                    <FormattedMessage id="Members.DecimalOdds" defaultMessage="Decimal Odds" >
                                        {dec =>
                                            <option value="2">{dec}</option>}
                                    </FormattedMessage>

                                    <FormattedMessage id="Members.HongkongOdds" defaultMessage="Hongkong Odds" >
                                        {hongkong =>
                                            <option value="3">{hongkong}</option>}
                                    </FormattedMessage>

                                    <FormattedMessage id="Members.IndonesiaOdds" defaultMessage="Indonesia Odds" >
                                        {indonesia =>
                                            <option value="4">{indonesia}</option>}
                                    </FormattedMessage>
                                </Select>
                            </Col>
                        </Row>

                    </div>
                </CardBody>
            </Card>
        )
    }
}

PropTypes.MemberSettings = {
    handleChange: PropTypes.func
}

export default MemberSettings
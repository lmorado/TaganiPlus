import React, { Component } from 'react'
import {
    Card,
    CardHeader,
    Table,
    CardBody,
    Button, Row, Col
}
    from 'reactstrap';
import PropTypes from 'prop-types'
import Switch from 'react-switch'

import { paymentSettingFM, weekDays, dailyFM, weeklyFM } from './translation'

const PaymentSettings = ({ monday = true, tuesday = true, wednesday = true, thursday = true, friday = true, saturday = true, sunday = true,
    handleWeeklySched, handleDailySched, handleSwitchChange, creditDisabled }) => {
    return (
        <Card style={{ display: creditDisabled ? 'none' : 'block' }}>
            <CardHeader style={{ width: '100%' }} className="customCardHeader">
                <Row style={{ width: '100%' }}>
                    <Col lg='8' md='8' sm='8' xs='6' >
                        <label>{paymentSettingFM}</label>
                    </Col>
                    <Col lg='4' md='4' sm="4" xs='6'>
                        <Row style={{ justifyContent: 'flex-end' }}>
                            <Button
                                style={{ marginBottom: 2 }}
                                onClick={handleDailySched}
                                className="btn-spacing"
                                size="sm"
                                color="primary">{dailyFM}
                            </Button>
                            <Button
                                onClick={handleWeeklySched}
                                className="btn-spacing"
                                style={{ marginBottom: 2 }}
                                size="sm"
                                color="secondary">{weeklyFM}
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <div style={{ width: '100%' }} className="table-bordered-dot">

                    <Table style={{ overflow: 'hidden' }} bordered striped responsive className='responsive-table-payment'>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center' }}>{weekDays.monday}</th>
                                <th style={{ textAlign: 'center' }}>{weekDays.tuesday}</th>
                                <th style={{ textAlign: 'center' }}>{weekDays.wednesday}</th>
                                <th style={{ textAlign: 'center' }}>{weekDays.thursday}</th>
                                <th style={{ textAlign: 'center' }}>{weekDays.friday}</th>
                                <th style={{ textAlign: 'center' }}>{weekDays.saturday}</th>
                                <th style={{ textAlign: 'center' }}>{weekDays.sunday}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="responsive-div-PaymentSettings" >
                                        <label className='responsive-Col-payment'>{weekDays.monday}</label>
                                        <Switch
                                            onChange={() => handleSwitchChange('mon')}
                                            onColor="#1f8443"
                                            offColor="#bf0505"
                                            checked={monday}
                                            uncheckedIcon={<p className="uncheckedIcon">{weekDays.no}</p>}
                                            checkedIcon={<p className="checkedIcon">{weekDays.yes}</p>}
                                            className="noradius"
                                        />
                                    </div>
                                </td>

                                <td >
                                    <div className='responsive-div-PaymentSettings'>
                                        <label className='responsive-Col-payment'>{weekDays.tuesday}</label>
                                        <Switch
                                            onChange={() => handleSwitchChange('tue')}
                                            onColor="#1f8443"
                                            offColor="#bf0505"
                                            checked={tuesday}
                                            uncheckedIcon={<p className="uncheckedIcon">{weekDays.no}</p>}
                                            checkedIcon={<p className="checkedIcon">{weekDays.yes}</p>}
                                            className="noradius"
                                        />
                                    </div>

                                </td>

                                <td >
                                    <div className='responsive-div-PaymentSettings'>
                                        <label className='responsive-Col-payment'>{weekDays.wednesday}</label>
                                        <Switch
                                            onChange={() => handleSwitchChange('wed')}
                                            onColor="#1f8443"
                                            offColor="#bf0505"
                                            checked={wednesday}
                                            uncheckedIcon={<p className="uncheckedIcon">{weekDays.no}</p>}
                                            checkedIcon={<p className="checkedIcon">{weekDays.yes}</p>}
                                            className="noradius"
                                        />
                                    </div>

                                </td>
                                <td>

                                    <div className='responsive-div-PaymentSettings'>
                                        <label className='responsive-Col-payment'>{weekDays.thursday}</label>
                                        <Switch
                                            onChange={() => handleSwitchChange('thu')}
                                            onColor="#1f8443"
                                            offColor="#bf0505"
                                            checked={thursday}
                                            uncheckedIcon={<p className="uncheckedIcon">{weekDays.no}</p>}
                                            checkedIcon={<p className="checkedIcon">{weekDays.yes}</p>}
                                            className="noradius"
                                        />
                                    </div>

                                </td>
                                <td >
                                    <div className='responsive-div-PaymentSettings'>
                                        <label className='responsive-Col-payment'>{weekDays.friday}</label>
                                        <Switch
                                            onChange={() => handleSwitchChange('fri')}
                                            onColor="#1f8443"
                                            offColor="#bf0505"
                                            checked={friday}
                                            uncheckedIcon={<p className="uncheckedIcon">{weekDays.no}</p>}
                                            checkedIcon={<p className="checkedIcon">{weekDays.yes}</p>}
                                            className="noradius"
                                        />
                                    </div>

                                </td>
                                <td>
                                    <div className='responsive-div-PaymentSettings'>
                                        <label className='responsive-Col-payment'>{weekDays.saturday}</label>
                                        <Switch
                                            onChange={() => handleSwitchChange('sat')}
                                            onColor="#1f8443"
                                            offColor="#bf0505"
                                            checked={saturday}
                                            uncheckedIcon={<p className="uncheckedIcon">{weekDays.no}</p>}
                                            checkedIcon={<p className="checkedIcon">{weekDays.yes}</p>}
                                            className="noradius"
                                        />
                                    </div>
                                </td>
                                <td >
                                    <div className='responsive-div-PaymentSettings'>
                                        <label className='responsive-Col-payment'>{weekDays.sunday}</label>
                                        <Switch
                                            onChange={() => handleSwitchChange('sun')}
                                            onColor="#1f8443"
                                            offColor="#bf0505"
                                            checked={sunday}
                                            uncheckedIcon={<p className="uncheckedIcon">{weekDays.no}</p>}
                                            checkedIcon={<p className="checkedIcon">{weekDays.yes}</p>}
                                            className="noradius"
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </CardBody>
        </Card>
    )
}

PropTypes.PaymentSettings = {
    monday: PropTypes.bool.isRequired,
    tuesday: PropTypes.bool.isRequired,
    wednesday: PropTypes.bool.isRequired,
    thursday: PropTypes.bool.isRequired,
    friday: PropTypes.bool.isRequired,
    saturday: PropTypes.bool.isRequired,
    sunday: PropTypes.bool.isRequired,
    daily: PropTypes.bool.isRequired,
    handleWeeklySched: PropTypes.func.isRequired,
    handleDailySched: PropTypes.func.isRequired,
    handleSwitchChange: PropTypes.func.isRequired
}

export default PaymentSettings
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    Col,
    Label,
    Row,
    FormGroup,
    Button,
    Alert
} from 'reactstrap'
import { getFirstWord, subtractTwoValue, formatCurrency, formatDecimal, formatDecimal4DecimalPlaces } from '../../../utils/helpers'
import InputNumber from '../../../components/InputNumber'
import { formattedMessages } from '../../../translations/formattedMessageTranslation'

class ManageCredit extends Component {


    render() {

        const { title, userInfo, loading, error, submitted, updateCredit, handleChange, handleSubmit, clearValue, clearValueState
            , remainingCredit } = this.props
        const label = (title) ? getFirstWord(title) : ''


        const creditLimitValidate = (userInfo && !clearValueState) ? userInfo.creditLimit : 0;
        const outstandingBalance = (userInfo && !clearValueState) ? userInfo.outstandingBalance : 0;
        const remainingBalance = (userInfo && !clearValueState) ? userInfo.remainingBalance : 0;

        const total = (label === 'Increase' && updateCredit) ? Number(updateCredit) + Number(creditLimitValidate) : 0
        //const decreaseTotal = (label === 'Decrease' && updateCredit) ? subtractTwoValue(Number(updateCredit), Number(updateCredit)) : 0
        const decreaseTotal = (label === 'Decrease' && updateCredit) ? subtractTwoValue(Number(creditLimitValidate), Number(updateCredit)) : 0

        return (
            <Row>
                <Col xs="12" lg="12">
                    <form onSubmit={handleSubmit}>
                        <FormGroup>
                            <input type="hidden" name="userId" value={(userInfo) ? userInfo.userId : 0} />
                            <Label>Current Credit:</Label>
                            <input name="currentCredit" type="text" className="form-control" defaultValue={(userInfo) ? label === 'Increase' ? userInfo.creditLimit : userInfo.creditLimit : 0} disabled />
                            <input type="hidden" name="hiddenCredit" value={(userInfo) ? label === 'Increase' ? userInfo.creditLimit : userInfo.creditLimit : 0} />
                            <input type="hidden" name="hiddenOutstanding" value={(userInfo) ? userInfo.outstandingBalance : 0} />
                            <input type="hidden" name="hiddenMode" value={label} />
                            <input type="hidden" name="hiddenRemainingBalance" value={remainingBalance} />
                        </FormGroup>

                        <FormGroup>
                            <Label>{label} by:</Label>
                            <InputNumber
                                value={updateCredit}
                                style={{ width: "100%" }}
                                placeholder="0.00"
                                name="updateCredit"
                                handleChange={handleChange}
                            />
                        </FormGroup>

                        {submitted && !updateCredit &&
                            <span style={{ display: 'block', color: 'red', fontSize: 12, marginBottom: 15, marginTop: '-15px' }}>This field is required</span>
                        }

                        {label === 'Increase' && updateCredit && Number(updateCredit) <= 0 &&
                            <span style={{ display: 'block', color: 'red', fontSize: 12, marginBottom: 15, marginTop: '-15px' }}>{`Increase in credit should be greater than ${formatCurrency(0)}`} </span>
                        }

                        {label === 'Decrease' && updateCredit && Number(updateCredit) <= 0 &&
                            <span style={{ display: 'block', color: 'red', fontSize: 12, marginBottom: 15, marginTop: '-15px' }}>{`Decrease in credit should be greater than ${formatCurrency(0)}`} </span>
                        }

                        {label === 'Increase' && updateCredit && (Number(total) > Number(remainingCredit) + Number(userInfo.creditLimit)) &&
                            <span style={{ display: 'block', color: 'red', fontSize: 12, marginBottom: 15, marginTop: '-15px' }}>{`Increase in credit should not exceed ${formatCurrency(remainingCredit)}.`}</span>
                        }


                        <FormGroup>
                            <Label>New Credit:</Label>
                            <input type="text"
                                className="form-control"
                                name="creditLimit"
                                value={total ? formatDecimal4DecimalPlaces(total) : total || decreaseTotal ? formatDecimal4DecimalPlaces(decreaseTotal) : decreaseTotal}
                                disabled />
                        </FormGroup>

                        {label === 'Decrease' && updateCredit && decreaseTotal < 0 &&
                            <span style={{ display: 'block', color: 'red', fontSize: 12, marginBottom: 15, marginTop: '-15px' }}> {`New credit should not be less than ${formatCurrency(0)}.`}</span>
                        }

                        {label === 'Decrease' && updateCredit && decreaseTotal < outstandingBalance && decreaseTotal > 0 && outstandingBalance !== 0 &&
                            !(label === 'Decrease' && updateCredit
                                && Number(updateCredit) > Number(remainingBalance)
                                && decreaseTotal >= 0) &&
                            <span style={{ display: 'block', color: 'red', fontSize: 12, marginBottom: 15, marginTop: '-15px' }}> {`Credit should not be below the outstanding amount (${formatCurrency(outstandingBalance)}).`}</span>
                        }

                        {label === 'Decrease' && updateCredit && outstandingBalance !== 0 && Number(updateCredit) === Number(userInfo.remainingBalance)
                            && !(label === 'Decrease' && updateCredit
                                && Number(updateCredit) > Number(remainingBalance)
                                && decreaseTotal >= 0)
                            &&
                            <span style={{ display: 'block', color: 'red', fontSize: 12, marginBottom: 15, marginTop: '-15px' }}> {`Credit should not be below the outstanding amount (${formatCurrency(outstandingBalance)}).`}</span>
                        }

                        {label === 'Decrease' && updateCredit
                            && Number(updateCredit) > Number(remainingBalance)
                            && decreaseTotal >= 0 && !(
                                label === 'Decrease' && updateCredit && outstandingBalance !== 0 && Number(updateCredit) === Number(userInfo.remainingBalance)
                            ) && !(label === 'Decrease' && updateCredit && decreaseTotal < outstandingBalance && decreaseTotal > 0 && outstandingBalance !== 0)
                            &&
                            <span style={{ display: 'block', color: 'red', fontSize: 12, marginBottom: 15, marginTop: '-15px' }}> {`Credit should not be below the available credit (${formatCurrency(remainingBalance)}).`}</span>
                        }

                        {error &&
                            <Alert color="danger">
                                <span className="bold"> {error.statusName} </span>
                            </Alert>
                        }

                        <div className="align-right">
                            <Button color="secondary"
                                style={{ marginRight: 10 }}
                                onClick={clearValue}>
                                {formattedMessages.close}
                            </Button>
                            <Button color="success" disabled={loading}>{formattedMessages.save}</Button>
                        </div>
                    </form>
                </Col>
            </Row >
        )
    }
}

const mapStateToProps = state => ({
    ...state.modal.modalProps,
    loading: state.memberCredit.loading,
    error: state.memberCredit.error,
    userId: state.auth.userId,
})

PropTypes.ManageCredit = {
    title: PropTypes.sting,
    //userInfo: PropTypes.object,
    onClose: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.string,
    creditLimit: PropTypes.string,
    submitted: PropTypes.bool,
    updateCredit: PropTypes.string,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    clearValue: PropTypes.func
}


export default connect(mapStateToProps)(ManageCredit)

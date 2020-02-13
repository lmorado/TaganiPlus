import React, { Component } from 'react'
import {
    Table,
    Col,
    Row
} from 'reactstrap';
import styled from 'styled-components'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import PaginationControls from '../../../components/PaginationControls'
import BackAndLayMark from '../../../components/BackAndLayMark'


import { getAllBets } from '../../../actions/totalBets/getAllBets'
import { resetAllBetsTotalBets } from '../../../actions/totalBets/resetAllBetsTotalBets'
import { resetMemberTotalOutstanding } from '../../../actions/members/resetMemberTotalOutstanding'
import { getOutstandingBets } from '../../../actions/members/getMemberTotalOutstanding'

import { convertDate, formatCurrency, formatDecimal, convertOddsType, convertOddsToFixed, convertOdds, hasNoLine, isBinaryVirtualSports } from '../../../utils/helpers'
import { shortNameOfMarketGroup } from '../../../utils/nameConversion'
import { formattedMessages } from '../../../translations/formattedMessageTranslation'

const SpanStyled = styled.span` display: block; `

const BACK = 'BACK', LAY = 'LAY'

class MemberOutstanding extends Component {

    constructor(props) {
        super(props);
        this.state = { page: 1 }
    }

    componentDidMount() {
        const { userInfo } = this.props
        this.props.resetMemberTotalOutstanding()
        this.props.getOutstandingBets(userInfo, 1, 10)
    }


    handleOnPageChange = (page) => {
        const { userInfo } = this.props
        this.setState({ page: page })
        this.props.resetMemberTotalOutstanding();
        this.props.getOutstandingBets(userInfo, page, 10)
    }

    render() {

        const { data, loading, error } = this.props

        let dt = data ? data : null;

        if (error) return <div>Error! {error.message}</div>

        return (
            <React.Fragment>
                <Row>
                    <Col xs="12" lg="12">
                        <div style={{ width: '100%' }} className="table-bordered-dot">
                            {data && data &&
                                <Table hover bordered striped responsive size="sm" className="responsive-table" >
                                    <thead className="table-head">
                                        <tr className="row-head">
                                            <th className="text-center">#</th>
                                            <th className="text-center">{formattedMessages.account}</th>
                                            <th className="text-center">{formattedMessages.date}</th>
                                            <th className="text-center" >{formattedMessages.event}</th>
                                            <th className="text-center" style={{ width: '30%' }}>{formattedMessages.detail}</th>
                                            <th className="text-center">{formattedMessages.stake}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.data && data.data.map((data, i) => {
                                            const number = ((dt.currentPage - 1) * 10) + (i + 1)
                                            return (
                                                <tr key={i + 12}>
                                                    <td>

                                                        <label>{number}</label>

                                                    </td>
                                                    <td className='username-td'>
                                                        <label >{data.member}</label>

                                                    </td>

                                                    <td>

                                                        <SpanStyled>{data.betId}</SpanStyled>
                                                        <SpanStyled>{convertDate(data.transactionDate)}</SpanStyled>

                                                    </td>
                                                    <td>
                                                        <SpanStyled>{data.totalBetSelectionDetails.league}</SpanStyled>

                                                        {data.totalBetSelectionDetails.marketSelection && data.totalBetSelectionDetails.marketSelection.toLowerCase() === "home" || data.totalBetSelectionDetails.marketSelection.toLowerCase() === "away" ?


                                                            data.totalBetSelectionDetails.marketSelection.toLowerCase() === "home" ?
                                                                <span>
                                                                    <span className="blue-text">{data.totalBetSelectionDetails.fixture.split('vs.').length === 2 ? data.totalBetSelectionDetails.fixture.split('vs.')[0] : ''}

                                                                    </span>

                                                                    <span> vs. {data.totalBetSelectionDetails.fixture.split('vs.').length === 2 ? `${data.totalBetSelectionDetails.fixture.split('vs.')[1]}` : ''}
                                                                    </span>
                                                                </span>

                                                                :
                                                                <span>
                                                                    <span>{data.totalBetSelectionDetails.fixture.split('vs.').length === 2 ? data.totalBetSelectionDetails.fixture.split('vs.')[0] : ''}
                                                                        vs.
																</span>

                                                                    <span className="blue-text">{data.totalBetSelectionDetails.fixture.split('vs.').length === 2 ? `${data.totalBetSelectionDetails.fixture.split('vs.')[1]}` : ''}
                                                                    </span>
                                                                </span>

                                                            : <span style={{ display: "block" }}>{data.totalBetSelectionDetails.fixture}</span>

                                                        }

                                                        <SpanStyled>{convertDate(data.totalBetSelectionDetails.eventDate)}</SpanStyled>


                                                    </td>

                                                    <td>

                                                        {data.isParlay ?
                                                            <span>
                                                                <SpanStyled><span onClick={() => this.toggleBetDetailModal(data)}
                                                                    style={{ fontWeight: "bold" }}>{data.totalBetSelectionDetails.marketSelection} </span> {formatDecimal(data.totalBetSelectionDetails.positionTaking)} x {formatDecimal(data.stake)}</SpanStyled>
                                                                <SpanStyled> @ <span style={{ fontWeight: "bold" }}> {convertOdds(data.odds, 'Decimal')} </span> <span style={{ fontWeight: "bold" }}> (DEC) </span> </SpanStyled>
                                                            </span> :
                                                            <span>
                                                                <SpanStyled>   <span style={{ color: "blue" }}> {data.totalBetSelectionDetails.marketSelection} </span> {formatDecimal(data.totalBetSelectionDetails.positionTaking)} x {formatCurrency(data.stake)}

                                                                    {data.marketTypeId !== 0 && data.marketTypeId !== undefined &&
                                                                        <BackAndLayMark isBack={data.marketTypeId === 1}> {data.marketTypeId === 1 ? `${BACK}` : `${LAY}`}</BackAndLayMark>
                                                                    }

                                                                </SpanStyled>
                                                                <SpanStyled>
                                                                    {hasNoLine(data.betSelections[0].marketTemplateId) || (data.betSelections[0].sportId === 21 && data.betSelections[0].line === 0) ?
                                                                        `` :
                                                                        data.betSelections[0].marketTemplateId !== 9999 || isBinaryVirtualSports(data.betSelections[0].marketTemplateId, data.betSelections[0].marketName, data.betSelections[0].line) ?
                                                                            data.betSelections[0].line : ``} @ <span style={{ fontWeight: "bold" }} className={convertOddsToFixed(data.odds, data.betSelections[0].marketTemplateId !== 1 && data.betSelections[0].marketTemplateId !== 8 ?
                                                                                data.oddsType : 'Decimal') < 0 ? `red-text` : ``}> {convertOddsToFixed(data.odds, data.betSelections[0].marketTemplateId !== 1 && data.betSelections[0].marketTemplateId !== 8 ?
                                                                                    data.oddsType : 'Decimal')} </span> <span style={{ fontWeight: "bold" }}> ({convertOddsType(data.betSelections[0].marketTemplateId !== 1 && data.betSelections[0].marketTemplateId !== 8 ?
                                                                                        data.oddsType : 'Decimal')}) </span></SpanStyled>
                                                                <SpanStyled>{data.totalBetSelectionDetails.fixtureStatusId !== 0 ?
                                                                    <FormattedMessage id="Global.LiveInCaps" defaultMessage="LIVE" >
                                                                        {live =>
                                                                            <span className="red-text"> {`${live}`} </span>}
                                                                    </FormattedMessage> : ``} {data.betSelections && data.betSelections[0] && shortNameOfMarketGroup(data.betSelections[0].marketName)} {data.totalBetSelectionDetails.fixtureStatusId !== 0 ? `(${data.totalBetSelectionDetails.score})` : ``}
                                                                </SpanStyled>
                                                            </span>
                                                        }

                                                    </td>


                                                    <td style={{ textAlign: 'right' }}>
                                                        {formatCurrency(data.stake)}
                                                    </td>
                                                </tr>
                                            )
                                        })}


                                        {data && data.rowCount > 0 &&
                                            <tr>
                                                <td className="text-left" colSpan="5">
                                                    <label style={{ marginLeft: 25, fontWeight: 'bold' }}>{formattedMessages.total}</label>
                                                </td>
                                                <td className="text-right">

                                                    <span className="bold">{formatCurrency(data.total.totalStake)}</span>

                                                </td>
                                            </tr>
                                        }

                                        {!loading && data.rowCount === 0 &&
                                            <tr className="row-head-1">
                                                <td colSpan="6"> {formattedMessages.noDataFound} </td>
                                            </tr>
                                        }

                                    </tbody>
                                </Table>}

                        </div>
                    </Col>
                </Row>

                <Row>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: '10px' }}>
                        {data && Math.ceil(data.rowCount / data.pageSize) >= 1 ?
                            <PaginationControls
                                data={data}
                                handleOnPageChange={this.handleOnPageChange} /> : null}
                    </div>
                </Row>

            </React.Fragment >
        )
    }
}

const mapStateToProps = state => ({
    data: state.totalOutStanding.data,
    loading: state.totalOutStanding.loading,
    message: state.totalOutStanding.message,
    error: state.totalOutStanding.error,
    userInfo: (state.modal.modalProps.userInfo !== 0) ? state.modal.modalProps.userInfo : '',
})

const mapDispatchToProps = dispatch => ({
    getAllBets: (marketId, page, pageSize, languageCode) => dispatch(getAllBets(marketId, page, pageSize, languageCode)),
    resetAllBetsTotalBets: () => dispatch(resetAllBetsTotalBets()),
    resetMemberTotalOutstanding: () => dispatch(resetMemberTotalOutstanding()),
    getOutstandingBets: (userId, page, pageNo) => dispatch(getOutstandingBets(userId, page, pageNo))
})

export default connect(mapStateToProps, mapDispatchToProps)(MemberOutstanding)


import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    Col,
    Row,
    Table,
} from 'reactstrap'
import styled from 'styled-components'
import { ToLowerCase, convertDate } from '../../../utils/helpers'
import { getUserLogs } from '../../../actions/members/userLogsAction'
import MaintenancePage from '../../../components/MaintenancePage'
import { formattedMessages } from '../../../translations/formattedMessageTranslation'
class Log extends Component {

    componentDidMount() {
        this.props.dispatch(getUserLogs(this.props.userId))
    }

    componentWillMount() {

    }

    render() {
        const { loading, error, logs, message } = this.props

        if (error) return <MaintenancePage message={message} />
        if (loading) return <div>{formattedMessages.pleasewait}</div>
        if (!logs.length) return <p>{formattedMessages.noDataFound}</p>
        if (logs.length) return (
            <Row>
                <Col xs="12" lg="12">
                    <StyledTableReponsive>
                        <StyledTable>
                            <StyledTBody>
                                <StyledTableRowHead>
                                    <StyledTh>{formattedMessages.lastLoginDate}</StyledTh>
                                    <StyledTh>{formattedMessages.ipAddress}</StyledTh>
                                    <StyledTh>{formattedMessages.device}</StyledTh>
                                    <StyledTh>{formattedMessages.countryOfOrigin}</StyledTh>
                                </StyledTableRowHead>
                                {logs.map((val, idx) => {
                                    return (
                                        <StyledAltTr key={idx}>
                                            <td>{convertDate(val.lastLogin)}</td>
                                            <td>{val.ipAddress}</td>
                                            <td>{val.device}</td>
                                            <StlyedFlagTd>
                                                {val.country && <i class={`flag-icon flag-icon-${ToLowerCase(val.country)}`}></i>}
                                            </StlyedFlagTd>
                                        </StyledAltTr>
                                    )
                                })
                                }
                            </StyledTBody>
                        </StyledTable>
                    </StyledTableReponsive>
                    {!logs.length && <p>{formattedMessages.noDataFound}</p>}
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = state => ({
    logs: state.logs.logs,
    loading: state.logs.loading,
    error: state.logs.error,
    message: state.logs.message,
    userId: (state.modal.modalProps.userInfo !== 0) ? state.modal.modalProps.userInfo : ''
})

Log.propTypes = {
    userId: PropTypes.number,
    logs: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default connect(mapStateToProps)(Log)


export const StyledTableReponsive = styled.div`
    display: block;
    width: 100%;
    overflow-x: auto;
    height: 65vh;
`

export const StyledTable = styled.table`
  width: 100%;
  margin-bottom: 1rem;
  color: #23282c;
  border: 1px solid #c8ced3;

  tr {
    border : 1px solid #c8ced3
  } 

  tr td {
    border: 1px solid #c8ced3;
    padding: .3rem;
  }

  thead {
    border: 1px solid #c8ced3;
  }
  
  border-collapse: collapse; 
`

export const StyledTBody = styled.tbody`
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
    tr td.center {
        text-align:center;
    }
    tr td.right {
        text-align:right;
    }
    tr td.left {
        text-align:left;
    }
    tr td span {
        display: block;
        &.bold { font-weight: bold; }
        &.normal { font-weight: bold; }
    }
`

export const StyledTableRowHead = styled.tr`
    background: #580606;
    color: #fff;
    text-align: center; 
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
    border-collapse: collapse;
    font-size: 0.875rem;

    th {
        border: 1px solid #c8ced3;
        padding: 12px; 
        vertical-align: middle;
    }
`

export const StyledTh = styled.th`
    width: 25%,
    text-align:cen
`
export const StlyedFlagTd = styled.td`
    text-align: center
`
export const StyledAltTr = styled.tr`
height: 36px;
:nth-of-type(odd) {
    background-color: rgba(0,0,0,.05);
}

:hover{
    background-color: rgba(0,0,0,.075);
}

text-align:center;
`
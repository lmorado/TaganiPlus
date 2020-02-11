import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getMemberNewUsers } from '../../../actions/members/getMemberNewUsers'

//TODO: Translations
const AGENTS = 'Agents', MEMBERS = 'Members', DOWNLINE = 'Downline', UPLINE = 'Upline', VIEWNEWUSERS= 'Weekly New users',
HEADERAGENT = 'New Agents of the Current Week', HEADERMEMBER = 'New Members of the Current Week', NORECORDSFOUND = 'No records found.'

const initialState = {
  activeTab: 10
}

const UsersTable = (props) => {
    return(
      <StyledModalTable>
      <StyledTBody>
      <StyledTableRowHead > 
      <StyledTdHeader colSpan={3}>{props.header}</StyledTdHeader>
      </StyledTableRowHead>
      <StyledTableRowHead> 
      <StyledTh style={{width: '10%'}}> # </StyledTh>
      <StyledTh style={{width: '45%'}}>{DOWNLINE}</StyledTh>
      <StyledTh style={{width: '45%'}}>{UPLINE}</StyledTh>
      </StyledTableRowHead>
          {props.data && props.data.map((val, idx) => {
            const count = idx+1
                  return (
                      <StyledAltTr key={idx}>
                          <td style={{textAlign:'center'}}>{count}</td>
                          <td>{val.userName}</td>
                          <td>{val.upline}</td>
                      </StyledAltTr>
                  )
              })
          }       
      </StyledTBody>
      </StyledModalTable>
    )
}  

class NewUsers extends Component {
    state = initialState;

    componentDidMount() { //Initial Request
        this.props.dispatch(getMemberNewUsers(this.props.userId,10))
    }

    handleTabs = (userIdType) => {
      this.setState({
          activeTab: userIdType
      }, () => this.props.dispatch(getMemberNewUsers(this.props.userId,userIdType)))
    }

    render() {
        const { newUsers, error, loading} = this.props
        return (
            <StyledModalTableReponsive>
                <>
                <StyledTabsTitle> {VIEWNEWUSERS} </StyledTabsTitle>
                <StyledTabsWrapper>
                    <StyledTabs 
                    onClick={() => this.handleTabs(10)} 
                    active={this.state.activeTab === 10}>
                        {AGENTS} 
                    </StyledTabs>
                    <StyledTabs 
                    onClick={() => this.handleTabs(30)} 
                    active={this.state.activeTab === 30}>
                        {MEMBERS} 
                    </StyledTabs>
                </StyledTabsWrapper>
                {loading && <p>Please wait...</p>}
                {!loading && newUsers.rowCount === 0 && <p>{NORECORDSFOUND}</p>}
                {!loading && newUsers.rowCount !== 0 && 
                  <UsersTable data={newUsers.downLines} header={this.state.activeTab === 10 ? HEADERAGENT : HEADERMEMBER} />
                }
                </>
            </StyledModalTableReponsive>
        )
    }
}

const mapStateToProps = state => ({
    error: state.newUsers.error,
    loading: state.newUsers.loading,
    newUsers: state.newUsers.newUsers,
    userId: (state.modal.modalProps.userInfo !== 0) ? state.modal.modalProps.userInfo : ''
})

export default connect(mapStateToProps)(NewUsers)

const StyledModalTableReponsive = styled.div`
    display: block;
    width: 100%;
    overflow-x: auto;
    height: 360px;
`

const StyledModalTable = styled.table`
  padding-top:12px;
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

const StyledTBody = styled.tbody`
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
    tr td.center {
        text-align:center;
    }
    tr td.right {
        text-align:right;
        &.red { color: red; }
    }
    tr td.left {
        text-align:left;
        &.red { color: red; }
    }
    tr td.account {
        color: rgb(32, 168, 216);
        cursor: pointer;
    }
    tr td span {
        display: block;
        &.bold { font-weight: bold; }
        &.red { font-weight: bold; color: red; }
        &.normal { font-weight: bold; }
    }
    tr td span.redLive { color: red; display: inline; }
    tr td span.betTeam { color: blue; display: inline; }
    &.wl-account tr td {
        padding: 12px;
    }
`

const StyledTableRowHead = styled.tr`
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

const StyledTabsTitle = styled.div`
    font-size: 17px;
    line-height: 24px;
    border-radius: 0!important;
    padding: 10px;
    color: #fff;
    background: #A32727;
    font-weight: 500;
`

const StyledTdHeader = styled.td`
    background: rgb(214, 198, 198);
    color: #7d1010;
    font-weight: 700;
    font-size: 14px;
    text-align: left;
    padding: 12px !important;
`


const StyledTh = styled.th`
    width: 25%
`

const StyledAltTr = styled.tr`
height: 36px;
:nth-of-type(odd) {
    background-color: rgba(0,0,0,.05);
}

:hover{
    background-color: rgba(0,0,0,.075);
}
`

const StyledTabsWrapper = styled.div`
    background: #fff;
`

const StyledTabs = styled.div`
    cursor: pointer;
    display: inline-block;
    min-width: 135px;
    color: ${props => (props.active ? `#000;` : `#00000066`)};
    font-size: 15px;
    font-weight: 500;
    text-align: center;
    padding: 16px 0px;
    border-bottom: ${props => props.active ? '4px solid rgb(162, 39, 39)' : 'none'};
`

import styled from 'styled-components'

export const StyledContainer = styled.div`
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const StyledButton = styled.button`
    float: right;
    line-height: 21px;
    color: #fff;
    background-color: #216438;
    border-color: #216438;
    border-radius: 3px;
    padding: 6px 12px;
    min-width: 100px;
    border: none;
    cursor: pointer;
    cursor: hand;
`


export const StyledLabel = styled.span`
    font-size: 14px;
    display: inline-block;
    margin-bottom: 0.5rem;
    min-height: 15px;
    font-weight: 500;
`


export const StyledForm = styled.form`
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen", "Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size:14px;
    margin:auto;
    overflow-y:hidden;
    background-color: #fff;
    border-radius: 3px;
    border: 1px solid #f7e7ce;
	padding: 24px 34px;
	min-width: 315px;
	max-width: 355px;
`


export const StyledHeader = styled.div`
    font-size: 2.1875rem;
    margin-bottom: .5rem;
    font-weight: 500;
    line-height: 1.2;
    padding: 0 12px;
`

export const StyledSubheader = styled.div`
    color: #F0EEE4;
    margin-top: 0;
    margin-bottom: 1rem;
    padding: 0 12px;
`

export const StyledPage = styled.div`
    margin:0;
	height: 105vh;
	min-width: 320px;
`

export const RedContainer = styled.div`
	background: #337247;
	width: 100%;
	height: 100%;
`
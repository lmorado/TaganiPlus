import styled from 'styled-components'

export const StyledContainer = styled.div`
    width: 100%;
    height: 70%;
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

export const ResendButton = styled.button`
    font-size: 18px;
    float: right;
    line-height: 21px;
    color: #fff;
    background-color: #216438;
    border-color: #216438;
    padding: 6px 12px;
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
    overflow-y:none;
    background-color: #fafafa;
    border-radius: 3px;
    border: 1px solid #7b7b7b;
	padding: 24px 34px;
	min-width: 600px;
	max-width: 900px;
	min-height: 200px;
`


export const StyledHeader = styled.div`
    font-size: 2rem;
    display: inline-block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
    color:  #216438;
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
	min-width: 300px;
`

export const RedContainer = styled.div`
	background: #fff;
	width: 100%;
	height: 100%;
`
export const Tracker = styled.div`
    width: 250px;
    height: 23px;
    margin: 15px auto;
    background: #fff;
    text-align: center;
    border-radius: 20px;
    box-shadow: inset 0 0 5px #000;
`

export const ProgressInTracker = styled.div`
    color: #fff;
    height: 100%;
    font-weight: bold;
    background: #216438;
    border-radius: 19px;
    width: ${(props) => props.percentage}%;
`

export const TaganiHeader = styled.div`
    height: 75px;
    width: 100%;
    background: #216438;
`

export const ParaStyle = styled.div`
    font-size: 16px;
    display: inline-block;
    margin-bottom: 0.5rem;
    padding: 10px;
    padding-left: 40px;
    padding-right: 40px;
    font-weight: 400;
    line-height: 2;
    text-align: justify;
`

export const BigButton = styled.button`
    line-height: 21px;
    color: #fff;
    background-color: #216438;
    border-color: #216438;
    border-radius: 3px;
    padding: 6px 12px;
    width: 100%;
    height: 200px;
    border: none;
    cursor: pointer;
    cursor: hand;

`
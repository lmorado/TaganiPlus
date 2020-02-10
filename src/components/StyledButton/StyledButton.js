import styled, {css} from 'styled-components'
import {
  Button,
} from 'reactstrap'

const StyledButton = styled(Button)`
  font-size: 1em;
  padding: .4em;
  width: 12em;
  border-radius: 2px;
  border: 2px solid #216438;
  background: #303030;
  color: white;

  &:hover {
    background: #f7e7ce;
    color: #337247;
    border-radius: 3px;
    border: 3px solid #04880b;
  }

  &:disabled {
    background: #f2f2f2;
    color: #216438;
    border-color: #61A26A;
  }
`

export default StyledButton
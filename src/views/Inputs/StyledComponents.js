import styled, {css} from 'styled-components'
import {
    Alert,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Label,
    Card,
    Button,
    CardBody,
    CardFooter,
    CardHeader,
    Table,
  
  } from 'reactstrap'

const StyledButton = styled(Button)`
  background: #282828;
  color: #f7e7ce;

`;

const StyledCardHeader = styled(CardHeader)`
  color : #f7e7ce;
  background: #337247;
  font-weight: ${props => props.fontWeight? props.fontWeight : 'bold'}; 
`

const StyledContainer = styled.div`
  text-align: center;
`

const StyledCard = styled(Card)`
  text-align: center;
`

const StyledAlert = styled(Alert)`
  text-align: center;
`
const StyledInputGroupAddon = styled(InputGroupAddon)`
  height:'35px';
  width:'350px';
`

export {StyledButton, StyledContainer, StyledCardHeader, StyledCard, StyledAlert, StyledInputGroupAddon}
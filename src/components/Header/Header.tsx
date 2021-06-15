import { colors } from '../../utils/colors'
import { Title, SubTitle } from '../../components/Text/text'
import SearchInput from '../SearchInput/SearchInput'
import { Circle, DivTitle, LogoDiv, DivE, DivD } from './style';

import Container from '../Container/Container';
import Svg from 'components/Svg/Svg'

interface IHeader {
  title?: string
  subtitle?: string
  placeholder?: string
  addButton?: string
  src?: string
  logo?: string

  restaurantName?: string

  clickedAdd?: () => any
  onChange?: (e: any) => any
}

const Header = (props: IHeader) => {
  return (
    <Container
      width="100%"
      height="224px"
      padding="0px 64px 0px 64px"
      backgroundColor={colors.green}
      justifyContent="initial"
    >
      <Container
        width="100%"
        height="60%"
        backgroundColor="transparent"
        display="flex"
        justifyContent="flex-start"
        padding="0px"
        gap="0px"
      >
        <DivE>
          <Circle>
            <Svg src={props.src} height="34px" color={colors.green} textalign="center" />
          </Circle>
          <DivTitle>
            <Title marginLeft="10px" fontSizeResponsive="22px">
              {props.title}
            </Title>
            <SubTitle marginTop="6px" marginLeft="10px" fontSizeResponsive="18px">
              {props.subtitle}
            </SubTitle>
          </DivTitle>
        </DivE>
        <DivD>
          <Title fontSize="18px" fontSizeResponsive="32px" marginTop="24px">
            {props.restaurantName}
          </Title>
          <LogoDiv>
            <Svg src={props.logo} height="64px" textalign="center" />
          </LogoDiv>
        </DivD>
      </Container>

      <Container
        width="100%"
        height="40%"
        backgroundColor="transparent"
        padding="0px"
      >
        <SearchInput
          placeholder={props.placeholder}
          addButton={props.addButton}
          clickedAdd={props.clickedAdd}
          onChange={props.onChange}
        />
      </Container>
    </Container>
  );
}

export default Header;
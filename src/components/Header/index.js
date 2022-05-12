// context
import { useFirstTimeUser } from "../../contexts/FirstTimeUserContext";
// components
import HeaderIcons from "../icons/HeaderIcons";
// styles
import {
  TitleContainer,
  Title,
  StyledHelpIcon,
  NavWrapper,
  NavContainer,
  DefaultContainer,
  HeaderWrapper
} from "./Header.styles";

const Header = ({ toggleTheme, theme }) => {
  const { resetFirstTimeUser } = useFirstTimeUser();
  const handleResetFirstTimeUser = () => resetFirstTimeUser(true);
  return (
    <HeaderWrapper>
      <DefaultContainer>
        <StyledHelpIcon onClick={handleResetFirstTimeUser} title={'Help'}/>
      </DefaultContainer>
      <TitleContainer>
        <Title>TRUMPLE</Title>
      </TitleContainer>
      <NavContainer>
        <NavWrapper>
          <HeaderIcons toggleTheme={toggleTheme} theme={theme} />
        </NavWrapper>
      </NavContainer>
    </HeaderWrapper>
  )
};

export default Header;

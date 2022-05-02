import styled from "styled-components";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
`;

const ThemeToggler = ({ onClick, theme }) => {
  const Icon = theme === "light" ? SunIcon : MoonIcon;
  return (
    <Container onClick={onClick}>
      <Icon onClick={onClick} />
    </Container>
  );
};

export default ThemeToggler;

import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0;
  height: 70px;
  width: 100%;
  background-color: #033a03;
  padding: 15px 20px;
  h1 {
    color: #caab10;
    margin: 0 20px;
  }
`;
export const LogOutContainer = styled.div`
  color: gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: large;
    font-weight: bold;
    padding-right: 10px;
  }
`;

export const NavLink = styled(Link)`
  font-size: large;
  font-weight: bold;
  color: #caab10;
  cursor: pointer;
`;

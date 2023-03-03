import { useState } from "react";
import styled from "@emotion/styled";
import { space, layout, color } from "styled-system";
import { Link } from "react-router-dom";
const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
interface SidebarParentProps {
  width: string;
  height: string;
  p: number;
}
const Sidebar = styled.div<SidebarParentProps>`
  ${layout}
  ${space}
background-color: #333;
  color: #fff;
  transition: width 0.5s ease;
  overflow: hidden;
  margin-top: 30px;
`;

interface SidebarItemProps {
  mb: number;
}
const SidebarItem = styled.div<SidebarItemProps>`
  ${space}
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
  padding: 8px;
`;

const SidebarLink = styled.a`
  ${color}
  ${space}
  text-decoration: none;
`;
interface MainContentProps {
  width: string;
  p: number;
}
const MainContent = styled.div<MainContentProps>`
  ${layout}
  ${space}
  background-color: #eee;
`;

const SidebarToggle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  padding: 6px;
  background-color: #555;
  color: #fff;
  cursor: pointer;
  text-align: center;
  font-size: 24px;
`;

const SidebarContainer = styled.div`
  position: relative;
`;

function CollapsibleSidebar({ children }: { children: JSX.Element }): any {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Container>
      <SidebarContainer>
        <SidebarToggle onClick={handleToggle}>
          {collapsed ? "☰" : "✖"}
        </SidebarToggle>
        <Sidebar width={collapsed ? "64px" : "200px"} height="100vh" p={3}>
          <SidebarItem mb={3}>
            <Link to="/">
              <SidebarLink color="#fff">Home</SidebarLink>
            </Link>
          </SidebarItem>
          <SidebarItem mb={3}>
            <Link to="/addSong">
              <SidebarLink color="#fff">Add Song</SidebarLink>
            </Link>
          </SidebarItem>
          <SidebarItem mb={3}>
            <Link to="/about">
              <SidebarLink color="#fff">About</SidebarLink>
            </Link>
          </SidebarItem>
          <SidebarItem mb={3}>
            <Link to="/total">
              <SidebarLink color="#fff">Total Statistics</SidebarLink>
            </Link>
          </SidebarItem>
        </Sidebar>
      </SidebarContainer>
      <MainContent width="100%" p={3}>
        {/* <h1>Main Content</h1> */}
        {children}
      </MainContent>
      {/* {children} */}
    </Container>
  );
}

export default CollapsibleSidebar;

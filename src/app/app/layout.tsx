"use client";

import React, { useEffect, useState } from "react";

import { LayoutContext } from "@app/_contexts/layout/LayoutContext";
import { Navbar } from "@components/custom/Navbar/Navbar";
import { NavbarSeparator } from "@components/custom/Navbar/NavbarSeparator";
import { Toaster } from "@components/ui/toaster";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import styled from "styled-components";

import "./layout.css";

interface UserPayload extends JwtPayload {
  user_id: string;
  name: string;
  surname: string;
  email: string;
  tenant_id: string;
  exp: number;
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const authRoutes = [
    "/dashboard/sign-in",
    "/dashboard/sign-up",
    "/dashboard/forgot-password",
    "/dashboard/mobile",
  ];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authRoutes.includes(pathname)) {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.push("/dashboard/sign-in");
      } else {
        const user = jwtDecode<UserPayload>(token);
        if (user.exp < Date.now() / 1000) {
          localStorage.removeItem("access_token");
          router.push("/dashboard/sign-in");
        }
        setLoading(false);
      }

      const handleResize = () => {
        if (window.innerWidth < 768) {
          router.push("/dashboard/mobile");
        }
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    } else {
      setLoading(false);
    }
  }, [authRoutes, pathname, router]);

  if (loading) {
    return null;
  }

  if (authRoutes.includes(pathname)) {
    return (
      <>
        {children}
        <Toaster />
      </>
    );
  }

  return (
    <LayoutContext.Provider
      value={{
        isNavbarCollapsed,
        setIsNavbarCollapsed,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
      }}
    >
      <Content>
        <Navbar />
        <NavbarSeparator />
        <Main>{children}</Main>
      </Content>
      <Toaster />
    </LayoutContext.Provider>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  min-width: 0;
  overflow-y: auto;
`;

export default Layout;

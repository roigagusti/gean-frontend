"use client";

import { PageTitle } from "@components/custom/PageTitle/PageTitle";
import styled from "styled-components";

const PAGE_TITLE = "Dashboard";
const PAGE_DESCRIPTION = "Bienvenido a tu dashboard";

export default function DashboardPage() {
  return (
    <Container>
      <Content>
        <PageTitle title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 30px;
  gap: 10px;
`;

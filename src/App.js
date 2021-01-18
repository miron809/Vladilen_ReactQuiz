import React from "react";
import "./styles.scss";
import Layout from "./hoc/layout/Layout";
import Quiz from "./containers/Quiz/Quiz";

export default function App() {
  return (
    <Layout>
      <Quiz />
    </Layout>
  );
}

import React from "react";
import "./App.css";
import Users from "./pages/Users/Users";
import Layout from "./components/Layout/Layout";

function App():JSX.Element {
 
  return ( 
    <Layout>
      <Users/>
    </Layout>
  );
}

export default App;
 
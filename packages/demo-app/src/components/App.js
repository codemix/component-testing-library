import React from "react";
import Header from "../components/Header";
import MainSection from "../components/MainSection";
import { TodoSupplier } from "../TodoContext/TodoSupplier";

const App = () => (
  <TodoSupplier>
    <Header />
    <MainSection />
  </TodoSupplier>
);

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TemplatesPage from "./pages/TemplatesPage";
import CreateTemplate from "./pages/CreateTemplate";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/design-template" element={<CreateTemplate/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

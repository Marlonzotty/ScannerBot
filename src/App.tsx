import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";
import Home from "./pages/Home";

function App() {
  return (
    <ThemeProvider theme={original}>
      <div className="min-h-screen relative bg-black">
        <div className="relative z-10">
          <Home />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import { Suspense, lazy } from "react"
import Loading from "./components/Loading";

const Home = lazy(() => import("./components/Home"));
const Learning = lazy(() => import("./components/Learning"));
const Quiz = lazy(() => import("./components//Quiz"));
const Result = lazy(() => import("./components/Result"));
const Login = lazy(() => import("./components/Login"));


const App = () => {


  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learning />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/:id" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter >)
}

export default App
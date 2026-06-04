import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home"
import Start from "./pages/Start"
import LearnMore from "./pages/LearnMore"


const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/start' element={<Start/>}/>
          <Route path='/about' element={<LearnMore/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App

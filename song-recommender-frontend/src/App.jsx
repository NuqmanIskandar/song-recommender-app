import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home"
import Start from "./pages/Start"

const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/start' element={<Start/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App

import Login from './pages/Login'
import './App.css'
import Register from './pages/Register'
import DashBoard from './pages/DashBoard'
import {BrowserRouter,Routes ,Route} from "react-router-dom"
import ProtectedRoute from './component/ProtectedRoute'

function App() {
  

  return (
    <BrowserRouter>

    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<ProtectedRoute><DashBoard/></ProtectedRoute>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App

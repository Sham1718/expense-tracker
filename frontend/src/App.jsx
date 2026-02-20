import Login from './pages/Login'
import './App.css'
import Register from './pages/Register'
import DashBoard from './pages/DashBoard'
import {BrowserRouter,Routes ,Route} from "react-router-dom"
import ProtectedRoute from './component/ProtectedRoute'
import TransactionList from './component/TransactionList'
import TransactionForm from './component/TransactionForm'

function App() {
  

  return (
    <BrowserRouter>

    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<ProtectedRoute><DashBoard/></ProtectedRoute>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/transaction' element={<ProtectedRoute><TransactionList/></ProtectedRoute>}/>
      <Route path='/create' element={<ProtectedRoute><TransactionForm/></ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App

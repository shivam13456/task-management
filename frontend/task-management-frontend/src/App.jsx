import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import TodoCreate from './pages/AddTask'
import Navbar from './components/NavBar'
import UpdateTask from './pages/UpdateTask'
import Home from './pages/Home'

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path = '/' element = {<Login />}></Route>
          <Route path = '/home' element = {<Home />}></Route>
          <Route path = '/create-task' element = {<TodoCreate />}></Route>
          <Route path = '/update-task' element = {<UpdateTask />}></Route>
        </Routes>
      </BrowserRouter>       
    </>
  )
}

export default App

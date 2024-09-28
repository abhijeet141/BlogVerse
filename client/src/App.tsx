import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { HomeRoute } from './HomeRoute'

function App() {
  const [, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const jwtToken = localStorage.getItem('tokenId');
    setIsAuthenticated(jwtToken !== null);
  }, []);
  return (
      <BrowserRouter>
        <div className='font-jetbrains'>
          <Navbar setIsAuthenticated={setIsAuthenticated}/>
          <Routes>
            <Route path='/' element={<HomeRoute></HomeRoute>}></Route>            
            <Route path='/signin' element={<SignIn></SignIn>}></Route>
            <Route path='/signup' element={<SignUp></SignUp>}></Route>
          </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App

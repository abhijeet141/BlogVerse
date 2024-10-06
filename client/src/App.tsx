import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { HomeRoute } from './HomeRoute'
import { BlogPost } from './pages/BlogPost'
import { ProtectedRoute } from './ProtectedRoute'
import { BlogPublish } from './pages/BlogPublish'
import { AuthorPost } from './pages/AuthorPost'
import {UserInfo} from './pages/UserInfo'
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
            <Route path='/blog/:id' element={<ProtectedRoute element={<BlogPost/>}></ProtectedRoute>}></Route>
            <Route path='/new-story' element={<ProtectedRoute element={<BlogPublish/>}></ProtectedRoute>}></Route>
            <Route path='/blog/author/:id' element={<ProtectedRoute element={<AuthorPost></AuthorPost>}></ProtectedRoute>}></Route>
            <Route path='/user/:userId' element={<ProtectedRoute element={<UserInfo></UserInfo>}></ProtectedRoute>}></Route>
            <Route path='/*'  element={<ProtectedRoute element={<HomeRoute></HomeRoute>}></ProtectedRoute>}></Route>
          </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App

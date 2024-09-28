import { Dashboard } from './pages/Dashboard'
import { HomePage } from './pages/HomePage'

export const isAuthenticated = () =>{
    const jwtToken = localStorage.getItem('tokenId')
    return jwtToken !== null;
}

export function HomeRoute(){
    return isAuthenticated() ? <Dashboard/> : <HomePage/>
}
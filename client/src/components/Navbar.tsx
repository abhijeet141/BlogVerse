import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { isAuthenticated } from '../HomeRoute'
import { TfiWrite } from "react-icons/tfi";
import { MobileNav } from "./MobileNav";


interface NavbarPropsType {
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Navbar({setIsAuthenticated}:NavbarPropsType) {
  const navigate = useNavigate()
  const name = localStorage.getItem('name') as string
  const userId = localStorage.getItem('userId') as string
  return (
    <header className="sticky top-0 z-50 bg-white pt-6 xl:pt-4">
      <div className="bg-white border-b border-black py-2">
        <div className="container mx-auto flex justify-between">
          <div className="font-bold text-3xl">
            <Link to="/">BlogVerse</Link>
          </div>
          <div className="flex justify-center items-center">
            {isAuthenticated() ? (
              <React.Fragment>
              <div className="hidden sm:flex items-center">
                 <div className="flex items-center px-6">
                  <TfiWrite className="m-2"/>
                  <Link to="/new-story">Write</Link>
                </div>
                <Button variant="default" onClick={()=>{
                    localStorage.removeItem('tokenId')
                    localStorage.removeItem('name')
                    localStorage.removeItem('userId')
                    setIsAuthenticated(false)
                    navigate('/signin')
                }}>
                 Sign Out
                </Button>
                <Link to={`/user/${userId}`}>
                <div className="rounded-full w-10 p-2 ml-4 flex justify-center items-center border border-black cursor-pointer">
                 {name[0].toUpperCase()}
                </div>
                </Link>
                </div>  
                <div className="sm:hidden">
                  <MobileNav setIsAuthenticated={setIsAuthenticated}></MobileNav>
                </div>             
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="hidden md:block px-6">
                  <Link to="/signin">Sign in</Link>
                </div>
                <div className="hidden sm:block">
                <Button variant="default">
                  <Link to="/signup">Get Started</Link>
                </Button>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
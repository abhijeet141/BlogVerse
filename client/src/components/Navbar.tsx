import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { isAuthenticated } from '../HomeRoute'
import { TfiWrite } from "react-icons/tfi";


interface NavbarPropsType {
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Navbar({setIsAuthenticated}:NavbarPropsType) {
  const navigate = useNavigate()
  return (
    <header className="py-6 xl:py-4">
      <div className="border-b border-black py-2">
        <div className="container mx-auto flex justify-between">
          <div className="font-bold text-3xl">
            <Link to="/">BlogVerse</Link>
          </div>
          <div className="flex justify-center items-center">
            {isAuthenticated() ? (
              <React.Fragment>
                <div className="flex items-center px-6">
                  <TfiWrite className="m-2"/>
                  <Link to="/write">Write</Link>
                </div>
                <Button variant="default" onClick={()=>{
                    localStorage.removeItem('tokenId')
                    setIsAuthenticated(false)
                    navigate('/')
                }}>
                 Sign Out
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="hidden md:block px-6">
                  <Link to="/signin">Sign in</Link>
                </div>
                <Button variant="default">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

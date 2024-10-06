import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet'
import { CiMenuFries } from "react-icons/ci";
import { Link} from 'react-router-dom';
import React from "react";
import { isAuthenticated } from '../HomeRoute'
import { TfiWrite } from "react-icons/tfi";

interface NavbarPropsType {
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MobileNav({setIsAuthenticated}:NavbarPropsType){
  const name = localStorage.getItem('name') as string
  const userId = localStorage.getItem('userId') as string
    return(
        <Sheet>
            <SheetTrigger className='flex justify-center items-center'>
            <Link to={`/user/${userId}`}>
                <div className="rounded-full w-10 p-2 ml-4 mr-3 flex justify-center items-center border border-black cursor-pointer">
                 {name[0].toUpperCase()}
                </div>
            </Link>
            <CiMenuFries className='text-[32px]'>
            </CiMenuFries>
            </SheetTrigger>
            <SheetContent className='flex flex-col'>
          <div className="flex flex-col items-left p-4">
            {isAuthenticated() && (
              <React.Fragment>
                <div className="flex items-center sm:px-6">
                  <TfiWrite className="m-2"/>
                  <Link to="/new-story">Write</Link>
                </div>
                <div className='pt-2 px-2 sm:px-0 cursor-pointer underline'>
                    <Link to={'/signin'} onClick={()=>{
                    localStorage.removeItem('tokenId')
                    localStorage.removeItem('name')
                    localStorage.removeItem('userId')
                    setIsAuthenticated(false)
                }}>Sign Out</Link>
                </div>
              </React.Fragment>
            )}
          </div>
            </SheetContent>
        </Sheet>
    )
}
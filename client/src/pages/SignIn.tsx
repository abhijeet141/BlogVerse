import { Button } from "@/components/ui/button"
import { LabelledInput } from "@/components/LabelledInput"
import { useState } from "react"
import { Link } from "react-router-dom"
import { SignInInput } from "@abhi209/blogverse-common"
import { useNavigate } from "react-router-dom"
import { validateEmail } from "@/components/ValidateEmail"
import swal from 'sweetalert';
import axios from "axios"

export function SignIn(){
    const [input, setInput] = useState<SignInInput>({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    return(
        <div className="container">
               <div className="flex flex-col justify-center items-center min-h-[calc(100vh-106px)]">
                    <div className="text-xl sm:text-2xl py-2">
                        Sign in to your account
                    </div>
                    <div className="text-sm sm:text-lg">
                        Don't have an account? <Link to={'/signup'}><span className="text-gray-700 underline underline-offset">Sign Up</span></Link>
                    </div>         
                <div className="py-10">   
                    <div className="border border-black border-opacity-20 p-5 rounded-xl">
                    <div className="py-4">
                        <div className="pb-2">
                            Email
                        </div>
                        <LabelledInput type="email" placeholder="Enter your email" onChange={(e)=>{
                            setInput(value => ({
                                ...value,
                                email: e.target.value
                            }))
                        }}/>
                    </div>
                <div>
                    <div className="pb-2">
                        Password
                    </div>
                    <LabelledInput type="password" placeholder="Enter your password" onChange={(e)=>{
                        setInput(value => ({
                            ...value,
                            password: e.target.value
                        }))
                    }}/>
                </div>
                <Button variant="default" className="h-10 w-full mt-6"
                onClick={async()=>{
                    if(!input["email"] || !input["password"]){
                        swal("Please fill out all required fields.","","error");
                        return;
                    }
                    if(!validateEmail(input["email"])){
                        swal("Please enter a valid email address.","","error");
                        return;
                    }
                    if(input["password"].length < 8){
                        swal("Your password should be greater than 8","","error");
                        return;
                    }
                    try{
                        setLoading(true);
                        const response = await axios.post(`${backendUrl}/api/v1/user/signin`,input)             
                        localStorage.setItem('tokenId',response.data.jwtToken)
                        localStorage.setItem('name',response.data.name)
                        localStorage.setItem('userId',response.data.userId)
                        setLoading(false);
                        navigate('/')
                    }
                    catch(err){
                        setLoading(false)
                        swal(`Sign In failed`,"","error"); 
                    }
                }}
                >{loading ? "Signing In" : "Sign In" }</Button>
                </div>
                </div>
            </div>
        </div>
    )
}
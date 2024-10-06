import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { LabelledInput } from "@/components/LabelledInput"
import { useState } from "react"
import { SignUpInput } from "@abhi209/blogverse-common"
import axios from "axios"
import swal from 'sweetalert';
import { validateEmail } from "@/components/ValidateEmail"

export function SignUp(){
    const [input, setInput] = useState<SignUpInput>({
        name: "",
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
            Create an account
                </div>
                <div className="text-sm sm:text-lg">
                    Already have an account? <Link to={'/signin'}><span className="text-gray-700 underline underline-offset">SignIn</span></Link>
                </div>
              
                <div className="py-10">
                <div className="border border-black border-opacity-20 p-5 rounded-xl">
                    <div>
                        <div className="pb-2">Username</div>
                        <LabelledInput type="text" placeholder="Enter your username" onChange={(e)=>{
                            setInput(value => ({
                                ...value,
                                name: e.target.value
                            }))
                        }}/>
                    </div>
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
                    if(!input["name"] || !input["email"] || !input["password"]){
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
                        setLoading(true)
                        const response = await axios.post(`${backendUrl}/api/v1/user/signup`,input)                        
                        localStorage.setItem('tokenId',response.data.jwtToken)
                        localStorage.setItem('name',response.data.name)
                        localStorage.setItem('userId',response.data.userId)
                        setLoading(false)
                        navigate('/')
                    }
                    catch(err){
                        setLoading(false)
                        swal(`Sign up failed`,"","error");
                    }
                }}
                >{loading ? "Signing Up" : "Sign Up"}</Button>
                </div>
                </div>
            </div>
        </div>
    )
}
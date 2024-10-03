import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export function HomePage(){
    const navigate = useNavigate();
    return (
        <div className="container flex items-center min-h-[calc(100vh-90px)]">
            <div className="flex">
                <div>
                <div className="text-4xl text-center sm:text-left sm:text-8xl font-medium">Innovative <span className="lg:relative -left-4">Tech</span> <br /> Insights</div>
                    <div className="py-6 px-2 text-2xl text-center sm:text-left">Your hub to explore, learn, and stay ahead in the fast-evolving world of technology.</div>
                    <div className="flex justify-center sm:block">
                    <Button variant="outline" size={'lg'}
                    onClick={()=>{
                        navigate('/signup')
                    }}>Start Reading</Button>
                      </div>
                </div>
            </div>
        </div>
    )
}

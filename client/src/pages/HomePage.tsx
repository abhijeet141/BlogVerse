import { Button } from "@/components/ui/button"


export function HomePage(){
    return (
        <div className="container flex items-center min-h-[calc(100vh-90px)]">
            <div className="flex">
                <div>
                    <div className="text-6xl md:text-8xl font-medium">Innovative <span className="lg:relative -left-4">Tech</span> <br /> Insights</div>
                    <div className="py-6 px-2 text-2xl">Your hub to explore, learn, and stay ahead in the fast-evolving world of technology.</div>
                    <Button variant="outline" size={'lg'}>Start Reading</Button>
                </div>
            </div>
        </div>
    )
}

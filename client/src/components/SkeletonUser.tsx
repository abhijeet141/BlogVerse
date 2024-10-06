import { Skeleton } from "./ui/skeleton";

export function SkeletonUser(){
    return (
        <div className="lg:grid lg:grid-cols-3">
            <div className="flex flex-col order-1 justify-center items-center gap-2 py-24 border-b border-black lg:border-b-0 lg:py-2 px-2 lg:border-l lg:min-h-[calc(100vh-75px)]">
                <div className="font-bold text-2xl xl:text-4xl ">
                    <Skeleton className="w-[300px] h-6"></Skeleton>
                </div>
                <div className="text-sm xl:text-xl">
                    <Skeleton className="w-[250px] h-4"></Skeleton>        
                </div>
            </div>
            <div className="lg:col-span-2 lg:py-2 py-6">
                {/* <div>
                {blogs
                ? */}
                <div>
                     <div>
                        <Skeleton className="w-[250px] sm:w-[290px] h-6"></Skeleton>
                    </div>
                <div className="flex justify-between py-6 cursor-pointer">
                    <div className="flex flex-col justify-center">
                        <div>
                            <Skeleton className="w-[130px] sm:w-[100px] h-4"></Skeleton>
                        </div>
                    <div className="py-6">
                        <Skeleton className="w-[300px] sm:w-[600px] h-8"></Skeleton>
                    </div>
                    <div>
                        <Skeleton className="w-[200px] sm:w-[400px] h-6"></Skeleton>
                    </div>
                    <div className="sm:flex justify-between items-center">
                        <div className="flex">
                        <div className="pt-4">
                            <Skeleton className="w-[100px] sm:w-[200px] h-5"></Skeleton>
                        </div>
                        <div className="pt-4 pl-4">
                            <Skeleton className="w-[100px] sm:w-[200px] h-5"></Skeleton>
                        </div>
                        </div>
                        <div className="mt-4">
                            <Skeleton className="w-[100px] h-8"></Skeleton>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                     <div>
                        <Skeleton className="w-[290px] h-6"></Skeleton>
                    </div>
                <div className="flex justify-between py-6 cursor-pointer">
                    <div className="flex flex-col justify-center">
                        <div>
                            <Skeleton className="w-[100px] h-4"></Skeleton>
                        </div>
                    <div className="py-6">
                        <Skeleton className="w-[600px] h-8"></Skeleton>
                    </div>
                    <div>
                        <Skeleton className="w-[400px] h-6"></Skeleton>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex">
                        <div className="pt-4">
                            <Skeleton className="w-[200px] h-5"></Skeleton>
                        </div>
                        <div className="pt-4 pl-4">
                            <Skeleton className="w-[200px] h-5"></Skeleton>
                        </div>
                        </div>
                        <div className="mt-4">
                            <Skeleton className="w-[100px] h-8"></Skeleton>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            
                {/* :
                <div className="text-center mt-10 flex flex-col justify-center items-center lg:min-h-[calc(100vh-140px)] ">
                    <Skeleton className="w-[180px] h-6"></Skeleton>                
                    <Skeleton className="w-[300px] sm:w-[350px] h-4 mt-4"></Skeleton>                
                    <Skeleton className="w-[200px] h-4 mt-2"></Skeleton>
                    <Skeleton className="w-[180px] h-8 mt-2"></Skeleton>           
                </div>
                }
                </div> */}
            </div>
        </div>
    )
}
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonPostDemo(){
    return(
        <div className="container flex flex-col">
        <div className="py-6">
            <Skeleton className="w-[600px] h-8"></Skeleton>
        </div>
        <div>
        <div className="mb-2">
        <Skeleton className="w-[100px] h-4"></Skeleton>
        </div>
        <div className="flex">
          <div>
          <Skeleton className="w-[100px] h-4"></Skeleton>
          </div>
          <div className="pl-4">
          <Skeleton className="w-[100px] h-4"></Skeleton>
          </div>
        </div>
        </div>
        {/* <div className="py-6"><Skeleton className="w-[450px] h-40"></Skeleton></div> */}
        <div className="py-6">
        <Skeleton className="w-[400px] h-6"></Skeleton>
        <Skeleton className="w-[400px] h-6 mt-2"></Skeleton>
        <Skeleton className="w-[400px] h-6 mt-2"></Skeleton>
        <Skeleton className="w-[400px] h-6 mt-2"></Skeleton>
        </div>
        <div className="py-4">
        <Skeleton className="w-[400px] h-6"></Skeleton>
        <Skeleton className="w-[400px] h-6 mt-2"></Skeleton>
        <Skeleton className="w-[400px] h-6 mt-2"></Skeleton>
        <Skeleton className="w-[400px] h-6 mt-2"></Skeleton>
        </div>
      </div>
    )
}
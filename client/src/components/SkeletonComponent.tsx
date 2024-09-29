import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDemo() {
  return (
    <div className="flex justify-between py-6 cursor-pointer">
    <div className="flex flex-col justify-center">
        <div>
            <Skeleton className="w-[100px] h-4"></Skeleton>
        </div>
        <div className="py-3">
        <Skeleton className="w-[600px] h-8"></Skeleton>
        </div>
        <div>
        <Skeleton className="w-[400px] h-6"></Skeleton>
        </div>
        <div className="flex">
            <div className="pt-4">
              <Skeleton className="w-[200px] h-5"></Skeleton>
            </div>
            <div className="pt-4 pl-4">
              <Skeleton className="w-[200px] h-5"></Skeleton>
            </div>
        </div>
      </div>
    {/* <div>
    <Skeleton className="w-[150px] h-36"></Skeleton>
    </div> */}
</div>
  )
}

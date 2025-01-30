import { Skeleton } from "../ui/skeleton";

const NavUserSkeleton = () => {
  return (
    <div className="flex items-center space-x-2">
      <Skeleton className="h-10 w-12 rounded-lg" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-[70%]" />
        <Skeleton className="h-4 w-[90%]" />
      </div>
    </div>
  );
};

export default NavUserSkeleton;

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Banner() {
  return (
    <div className="flex items-center justify-center space-x-5 bg-zinc-100 p-2">
      <ChevronLeft className="h-4 w-4" />
      <p className="text-sm font-medium">Get 10% off on business sign up</p>
      <ChevronRight className="h-4 w-4" />
    </div>
  );
}

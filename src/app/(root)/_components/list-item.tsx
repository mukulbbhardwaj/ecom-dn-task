"use client";

import { useState } from "react";
import { Loader } from "lucide-react";
import { toggleInterest } from "~/actions";
import { useRouter } from "next/navigation";
import { type ListItemProps } from "~/types";
import { Checkbox } from "~/components/ui/checkbox";

export function ListItem({ id, name, isInterested }: ListItemProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleInterest = async (id: number) => {
    setIsLoading(true);
    await toggleInterest(id);
    setIsLoading(false);
    router.refresh();
  };

  return (
    <div className="flex items-center space-x-2">
      {isLoading ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <Checkbox
          checked={isInterested}
          onCheckedChange={() => handleToggleInterest(id)}
          id={`category-${id}`}
        />
      )}
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {name}
      </label>
    </div>
  );
}

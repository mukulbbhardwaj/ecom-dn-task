"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";

const Error = ({ error }: { error: Error & { digest?: string } }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image src="/error.png" height="300" width="300" alt="Error" />
      <h2 className="text-xl font-medium">{error.message}</h2>
      <Button className="h-9" asChild>
        <Link href="/">Go back</Link>
      </Button>
    </div>
  );
};

export default Error;

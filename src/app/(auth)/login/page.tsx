"use client";

import Link from "next/link";
import { type z } from "zod";
import { useState } from "react";
import { Loader } from "lucide-react";
import { pushToast } from "~/lib/utils";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios, { type AxiosError } from "axios";
import { loginFormSchema } from "~/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      const response = await axios.post("/api/login", values);
      if (response.status === 200) {
        const successMessage = response?.data as string;
        pushToast("success", successMessage);
        router.push("/");
      }
    } catch (error) {
      const errorMessage = (error as AxiosError).response?.data as string;
      pushToast("destructive", errorMessage);
    }
  }

  const { isSubmitting } = form.formState;

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <Card className="mx-auto max-w-lg pb-10">
      <CardHeader>
        <CardTitle className="pb-6 text-center text-[32px] font-semibold">
          Login
        </CardTitle>
        <div className="mx-auto justify-center space-y-2">
          <h2 className="text-[24px] font-medium">Welcome back to ECOMMERCE</h2>
          <h4 className="text-center text-[16px]">
            The next gen business marketplace
          </h4>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        disabled={isSubmitting}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter"
                        {...field}
                      />
                      <button
                        className="absolute right-3 top-1/2 -translate-y-1/2 transform border-none bg-transparent text-[16px] underline outline-none"
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting} className="w-full" type="submit">
              <div className="flex items-center space-x-3">
                {isSubmitting && <Loader className="h-6 w-6 animate-spin" />}
                <p className="text-[16px] font-medium">LOGIN</p>
              </div>
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="mx-auto text-[16px]">
          Dont have an Account?{" "}
          <span className="text-[16px] font-medium">
            <Link href={"/sign-up"}>SIGN UP</Link>
          </span>
        </p>
      </CardFooter>
    </Card>
  );
}

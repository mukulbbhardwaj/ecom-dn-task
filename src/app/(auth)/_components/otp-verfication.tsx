"use client";

import { type z } from "zod";
import { Loader } from "lucide-react";
import { pushToast } from "~/lib/utils";
import { useForm } from "react-hook-form";
import axios, { type AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpVerifyFormSchema } from "~/lib/validation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export function OTPVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const encryptedToken = searchParams.get("token");

  const form = useForm<z.infer<typeof otpVerifyFormSchema>>({
    resolver: zodResolver(otpVerifyFormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: z.infer<typeof otpVerifyFormSchema>) {
    try {
      const response = await axios.post("/api/verify-user", {
        ...data,
        email,
        encryptedToken,
      });

      if (response.status === 200) {
        const successMessage = response?.data as string;
        pushToast("success", successMessage);
        router.push("/login");
      }
    } catch (error) {
      const errorMessage = (error as AxiosError).response?.data as string;
      pushToast("destructive", errorMessage);
    }
  }

  return (
    <div className="">
      <CardHeader>
        <CardTitle className="text-center text-[32px] font-semibold ">
          Verify your email
        </CardTitle>
        <CardDescription className=" text-center text-[16px] text-black">
          Enter the 8-digit code you have received on{" "}
          <strong>{email?.substring(0, 3)}***@gmail.com</strong>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex  flex-col ">
        <div className="mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={8}
                        {...field}
                        className=""
                      >
                        <InputOTPGroup className="">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                          <InputOTPSlot index={6} />
                          <InputOTPSlot index={7} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isSubmitting}
                className="mx-auto mt-10 w-full max-w-xl"
                type="submit"
              >
                <div className="flex items-center space-x-3 ">
                  {isSubmitting && <Loader className="h-6 w-6 animate-spin" />}
                  <p className="text-[16px] font-medium ">VERIFY</p>
                </div>
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </div>
  );
}

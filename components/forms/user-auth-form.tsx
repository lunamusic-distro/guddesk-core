"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm, type FieldValues } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { userLoginSchema, userRegisterSchema } from "@/lib/validations/auth";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Icons } from "@/components/shared/icons";
import { registerUser } from "@/actions/register";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: string;
}

type LoginData = z.infer<typeof userLoginSchema>;
type RegisterData = z.infer<typeof userRegisterSchema>;
type FormData = LoginData | RegisterData;

export function UserAuthForm({ className, type, ...props }: UserAuthFormProps) {
  const isRegister = type === "register";
  const schema = isRegister ? userRegisterSchema : userLoginSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Record<string, string>>({
    resolver: zodResolver(schema) as any,
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();

  async function onSubmit(data: Record<string, string>) {
    setIsLoading(true);

    try {
      if (isRegister) {
        const result = await registerUser(data as RegisterData);

        if (result.error) {
          setIsLoading(false);
          return toast.error(result.error);
        }

        toast.success(result.success);

        // Auto sign in after registration
        await signIn("credentials", {
          email: (data as RegisterData).email.toLowerCase(),
          password: (data as RegisterData).password,
          callbackUrl: searchParams?.get("from") || "/dashboard",
        });
      } else {
        const result = await signIn("credentials", {
          email: (data as LoginData).email.toLowerCase(),
          password: (data as LoginData).password,
          redirect: false,
          callbackUrl: searchParams?.get("from") || "/dashboard",
        });

        if (result?.error) {
          setIsLoading(false);
          return toast.error("Invalid email or password");
        }

        window.location.href = searchParams?.get("from") || "/dashboard";
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }

    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          {isRegister && (
            <div className="grid gap-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                type="text"
                autoComplete="name"
                disabled={isLoading || isGoogleLoading}
                {...register("name")}
              />
              {errors?.name && (
                <p className="px-1 text-xs text-red-600">
                  {errors.name.message as string}
                </p>
              )}
            </div>
          )}
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGoogleLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message as string}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder={isRegister ? "Min. 8 characters" : "Your password"}
              type="password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              disabled={isLoading || isGoogleLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message as string}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants(), "mt-1")} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            {isRegister ? "Create Account" : "Sign In"}
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGoogleLoading(true);
          signIn("google");
        }}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 size-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 size-4" />
        )}{" "}
        Google
      </button>
    </div>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { resetPasswordSchema } from "@/lib/validations/auth";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/shared/icons";
import { resetPassword } from "@/actions/reset-password";

type FormData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") || "";

  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    try {
      const result = await resetPassword({ ...data, token });

      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        setIsSuccess(true);
        toast.success(result.success);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }

    setIsLoading(false);
  }

  if (!token) {
    return (
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <Icons.warning className="size-6 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <h3 className="font-heading text-lg">Invalid reset link</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            This password reset link is invalid or has expired. Please request a
            new one.
          </p>
        </div>
        <Link
          href="/forgot-password"
          className={cn(buttonVariants({ rounded: "xl" }), "mt-4")}
        >
          Request New Link
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
          <Icons.check className="size-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h3 className="font-heading text-lg">Password updated</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Your password has been reset successfully. You can now sign in with
            your new password.
          </p>
        </div>
        <Link
          href="/login"
          className={cn(buttonVariants({ rounded: "xl" }), "mt-4")}
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("token")} value={token} />
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label htmlFor="password">New password</Label>
            <Input
              id="password"
              placeholder="Min. 8 characters"
              type="password"
              autoComplete="new-password"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              placeholder="Re-enter your password"
              type="password"
              autoComplete="new-password"
              disabled={isLoading}
              {...register("confirmPassword")}
            />
            {errors?.confirmPassword && (
              <p className="px-1 text-xs text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            className={cn(buttonVariants(), "mt-1")}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            Reset Password
          </button>
        </div>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

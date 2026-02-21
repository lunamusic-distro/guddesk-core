import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      {/* Gradient glow background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        {/* Logo */}
        <Link href="/" className="mb-2">
          <Icons.logo className="size-12" />
        </Link>

        {/* 404 with gradient */}
        <h1 className="font-satoshi text-8xl font-black tracking-tight sm:text-9xl">
          <span className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-400 bg-clip-text text-transparent">
            404
          </span>
        </h1>

        {/* Chat bubble illustration */}
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <Icons.messageCircle className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="rounded-2xl rounded-bl-sm bg-muted px-4 py-2.5 text-sm text-muted-foreground">
            Hmm, this page seems to have wandered off...
          </div>
        </div>

        {/* Copy */}
        <div className="space-y-2">
          <h2 className="font-satoshi text-xl font-bold tracking-tight sm:text-2xl">
            Page not found
          </h2>
          <p className="max-w-md text-balance text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className={cn(
              buttonVariants({ rounded: "xl", size: "lg" }),
              "gap-2 px-5",
            )}
          >
            <Icons.home className="size-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({
                variant: "outline",
                rounded: "xl",
                size: "lg",
              }),
              "gap-2 px-5",
            )}
          >
            <Icons.dashboard className="size-4" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

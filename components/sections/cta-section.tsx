import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function CTASection() {
  return (
    <section className="border-t bg-muted/30 py-16 sm:py-20 lg:py-24">
      <MaxWidthWrapper className="flex flex-col items-center text-center">
        <h2 className="font-heading text-3xl md:text-4xl">
          Ready to talk to your customers?
        </h2>
        <p className="mt-4 max-w-lg text-balance text-lg text-muted-foreground">
          Start for free. Upgrade when you&apos;re ready. No per-seat surprises.
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/register"
            className={cn(
              buttonVariants({ rounded: "xl", size: "lg" }),
              "gap-2 px-5",
            )}
          >
            Get Started Free
            <Icons.arrowRight className="size-4" />
          </Link>
          <Link
            href="/docs"
            prefetch={true}
            className={cn(
              buttonVariants({ variant: "outline", rounded: "xl", size: "lg" }),
              "px-5",
            )}
          >
            View Documentation
          </Link>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

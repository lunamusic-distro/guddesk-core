"use client";

import { useState, useTransition } from "react";
import { articleFeedback } from "@/actions/article-feedback";
import { Button } from "@/components/ui/button";

export function ArticleFeedbackButtons({ articleId }: { articleId: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleFeedback(helpful: boolean) {
    startTransition(async () => {
      await articleFeedback(articleId, helpful);
      setSubmitted(true);
    });
  }

  if (submitted) {
    return (
      <p className="mt-3 text-sm text-gray-500">
        Thanks for your feedback!
      </p>
    );
  }

  return (
    <div className="mt-3 flex justify-center gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleFeedback(true)}
        disabled={isPending}
      >
        Yes, helpful
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleFeedback(false)}
        disabled={isPending}
      >
        Not helpful
      </Button>
    </div>
  );
}

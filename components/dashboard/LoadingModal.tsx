"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface LoadingModalProps {
  open: boolean;
  message?: string;
  subtext?: string;
}

export function LoadingModal({
  open,
  message = "Loading...",
  subtext,
}: LoadingModalProps) {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        hideCloseButton
        className="flex flex-col items-center justify-center gap-3 border-0 bg-white/80 backdrop-blur-md shadow-lg max-w-xs"
      >
        <DialogTitle className="sr-only">Loading</DialogTitle>
        <Loader2
          className="h-8 w-8 animate-spin"
          style={{ color: "var(--color-honeydew-600)" }}
        />
        <div className="text-center">
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--color-honeydew-600)" }}
          >
            {message}
          </p>
          {subtext ? (
            <p
              className="text-xs mt-1"
              style={{ color: "var(--color-honeydew-600)" }}
            >
              {subtext}
            </p>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

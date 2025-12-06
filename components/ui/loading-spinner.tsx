import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  isOpen: boolean;
  message?: string;
}

export function LoadingSpinner({
  isOpen,
  message = "Loading...",
}: LoadingSpinnerProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="flex flex-col items-center justify-center gap-4 border-0 bg-transparent shadow-none">
        <DialogTitle className="sr-only">Loading</DialogTitle>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-center text-sm font-medium text-foreground">
          {message}
        </p>
      </DialogContent>
    </Dialog>
  );
}

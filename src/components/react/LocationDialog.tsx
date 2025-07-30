import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/ui/dialog";
import { ScrollArea } from "@/ui/scroll-area";
import type { Location } from "src/lib/schema";

export const LocationDialog = ({
  location,
  isOpen,
  setOpen,
}: {
  location: Location;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog defaultOpen={false} open={isOpen}>
      <DialogTitle>abc</DialogTitle>
      <DialogContent>
        <ScrollArea className="w-full h-96 max-w-full max-h-full">
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
          <p>Hello world</p>
        </ScrollArea>
        <DialogClose
          //  onClick={() => setOpen(false)}
          asChild
        >
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

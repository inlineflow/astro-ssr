import { Card } from "@/ui/card";
import { Dialog, DialogContent } from "@/ui/dialog";
import { useState } from "react";
import type { Location } from "src/lib/schema";

export const LocationDialog = ({ location }: { location: Location }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Dialog defaultOpen={false} open={isOpen}>
      <DialogContent>
        <Card>
          <p>Hello world</p>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

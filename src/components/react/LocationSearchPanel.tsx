import { Button } from "@/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTrigger } from "@/ui/sheet"
import { useTranslation } from "react-i18next"

export const LocationSearchPanel = () => {
  const { t } = useTranslation()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          {t("search")}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          {t("search.title")}
          <SheetDescription>
            {t("search.description")}
          </SheetDescription>
        </SheetHeader>
        <div className="px-4">
          content
        </div>

        <SheetFooter>
          footer
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

import { Card } from "@/components/ui/card";

export default function PhysiqueCardUpload({
  inputRef,
}: {
  inputRef: HTMLInputElement | null;
}) {
  return (
    <Card
      key={-1}
      className="flex justify-center items-center text-center text-muted-foreground h-96 overflow-hidden border border-dashed cursor-pointer"
      onClick={() => inputRef?.click()}
    >
      Import image
    </Card>
  );
}

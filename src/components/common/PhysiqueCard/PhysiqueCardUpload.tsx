import { Card } from "@/components/ui/card";

export default function PhysiqueCardUpload({
  onUploadClick,
  day,
}: {
  onUploadClick: (day: string) => void;
  day: string;
}) {
  return (
    <Card
      className="flex justify-center items-center text-center text-muted-foreground h-96 overflow-hidden border border-dashed cursor-pointer"
      onClick={() => onUploadClick(day)}
    >
      {day}
    </Card>
  );
}

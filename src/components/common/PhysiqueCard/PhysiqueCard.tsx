import { Card } from "@/components/ui/card";

export default function PhysiqueCard({ imgSrc }: { imgSrc: string }) {
  return (
    <Card className="flex justify-center items-center text-center text-muted-foreground h-96 overflow-hidden border">
      <img
        src={imgSrc}
        alt={`Physique`}
        className="w-full h-full object-cover"
      />
    </Card>
  );
}

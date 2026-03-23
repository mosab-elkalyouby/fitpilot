import { Card } from "@/components/ui/card";

export default function PhysiqueCard({
  key,
  imgSrc,
}: {
  key: number;
  imgSrc: string;
}) {
  return (
    <Card
      key={key}
      className="flex justify-center items-center text-center text-muted-foreground h-96 overflow-hidden border"
    >
      <img
        src={imgSrc}
        alt={`Physique ${key + 1}`}
        className="w-full h-full object-cover"
      />
    </Card>
  );
}

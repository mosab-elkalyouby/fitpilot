import { Card } from "@/components/ui/card";

export default function PhysiqueCard({
  imgSrc,
  date,
}: {
  imgSrc: string;
  date: string;
}) {
  return (
    <Card className="relative h-96 overflow-hidden border group-hover">
      {/* Image */}
      <img
        src={imgSrc}
        alt="Physique"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        draggable={false}
      />

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-white/40 via-white/5 dark:from-black/70 dark:via-black/20 to-transparent" />

      {/* Date text */}
      <div className="absolute bottom-3 left-3 text-foreground text-sm font-medium">
        {date}
      </div>
    </Card>
  );
}

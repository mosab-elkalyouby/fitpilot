import { useEffect, useState, useRef } from "react";
import {
  PhysiqueCard,
  PhysiqueCardSkeleton,
  PhysiqueCardUpload,
} from "@/components";
import type { Physique } from "@/types";
import { getPhysique, postPhysique } from "@/api";
import { getDayRange } from "@/lib";

const startDate = "2026-03-18";

const days = Array.from({ length: getDayRange(startDate) + 1 }, (_, i) => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + i);
  return date.toISOString().split("T")[0];
});

function App() {
  const [physique, setPhysique] = useState<Physique[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const physiqueMap = physique.reduce(
    (acc, item) => {
      acc[item.date] = item;
      return acc;
    },
    {} as Record<string, Physique>,
  );

  const handleUploadClick = (day: string) => {
    setSelectedDay(day);
    inputRef.current?.click();
  };

  const handleGetPhysique = async () => {
    try {
      const physiqueData = await getPhysique();
      setPhysique(physiqueData || []);
    } catch (err) {
      console.error("Error fetching physique:", err);
    } finally {
      setIsLoading(false);
    }
  };

  async function onFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file || !selectedDay) return;

    try {
      await postPhysique(file, selectedDay);
      await handleGetPhysique();
    } catch (err) {
      console.error("Upload failed:", err);
    }
  }

  useEffect(() => {
    handleGetPhysique();
  }, []);

  return (
    <main>
      <section className="min-h-screen bg-background text-foreground dark pb-8">
        <div className="container">
          <header className="flex flex-col justify-center sm:flex-row sm:justify-between sm:items-center gap-3 h-36">
            <div>
              <h1 className="text-3xl font-bold">FitPilot</h1>
              <p className="text-sm text-muted-foreground sm:max-w-3xl">
                FitPilot is a smart fitness companion that helps you track
                workouts, monitor progress, and stay consistent with your
                training goals. Designed to simplify your fitness journey,
                FitPilot keeps you in control every step of the way.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {!isLoading &&
              days.map((day) => {
                const entry = physiqueMap[day];

                if (entry) {
                  return (
                    <PhysiqueCard
                      date={entry.date}
                      key={day}
                      imgSrc={entry.imgSrc}
                    />
                  );
                }

                return (
                  <PhysiqueCardUpload
                    key={day}
                    day={day}
                    onUploadClick={handleUploadClick}
                  />
                );
              })}

            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <PhysiqueCardSkeleton key={`skeleton-${i}`} />
              ))}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileSelected}
          />
        </div>
      </section>
    </main>
  );
}

export default App;

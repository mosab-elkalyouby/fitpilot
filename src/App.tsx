import supabase from "./supabase";
import { useEffect, useState, useRef } from "react";
import PhysiqueCard from "./components/common/PhysiqueCard/PhysiqueCard";
import PhysiqueCardSkeleton from "./components/common/PhysiqueCard/PhysiqueCardSkeleton";
import PhysiqueCardUpload from "./components/common/PhysiqueCard/PhysiqueCardUpload";

interface Physique {
  imgSrc: string;
}

function getDayNumber(startDate: string) {
  const now = new Date();
  const start = new Date(startDate);
  const diffMs = +now - +start;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
}

function App() {
  const [physique, setPhysique] = useState<Physique[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const x = getDayNumber("2026-03-3");
    console.log(x);

    getPhysique();
  }, []);

  async function getPhysique() {
    const { data } = await supabase.from("physique").select();
    setPhysique(data || []);
    setIsLoading(false);
    console.log(data);
  }

  async function onFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Upload to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("physique")
      .upload(file.name, file);

    console.log("Upload data:", uploadData);
    console.log("Upload error:", uploadError);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("physique")
      .getPublicUrl(uploadData.path);

    console.log("URL data:", urlData);

    // Insert into database
    const { error: insertError } = await supabase
      .from("physique")
      .insert({ imgSrc: urlData.publicUrl });

    if (insertError) {
      console.error("Insert error:", insertError);
      return;
    }

    // Refresh data
    getPhysique();
  }

  return (
    <main>
      <section className="min-h-screen bg-background text-foreground dark">
        <div className="container">
          <header className="flex flex-col justify-center sm:flex-row sm:justify-between sm:items-center gap-3  h-36">
            <div>
              <h1 className="text-3xl font-bold">FitPilot</h1>
              <p className="text-sm text-muted-foreground">
                Track body photos by date. Missing days stay as add cards.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {!isLoading && (
              <>
                {physique.map((item, i) => (
                  <PhysiqueCard key={i} imgSrc={item.imgSrc}></PhysiqueCard>
                ))}
                <PhysiqueCardUpload inputRef={inputRef?.current} />
              </>
            )}
            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <PhysiqueCardSkeleton key={i}></PhysiqueCardSkeleton>
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

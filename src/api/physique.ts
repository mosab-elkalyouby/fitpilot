import supabase from "@/supabase";

export async function getPhysique() {
  const { data } = await supabase.from("physique").select();
  console.log(data);
  return data;
}

export async function postPhysique(file: File, selectedDay: string) {
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
    .insert({ imgSrc: urlData.publicUrl, date: selectedDay });

  if (insertError) {
    console.error("Insert error:", insertError);
    return;
  }
}

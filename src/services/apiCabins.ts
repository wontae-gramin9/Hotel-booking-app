import supabase, { supabaseUrl } from "./supabase";
import type { Cabin } from "@/types/cabin";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin: Cabin, id) {
  // https://kavvwqrrjwpiuwwrghit.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let cabinQuery = supabase.from("cabins");

  // CREATE CABIN
  if (!id) cabinQuery = cabinQuery.insert([{ ...newCabin, image: imagePath }]);
  // UPDATE CABIN
  else
    cabinQuery = cabinQuery
      .update({ ...newCabin, image: imagePath })
      .eq("id", id);

  const { data, error } = await cabinQuery.select().single(); // [newRow]를 newRow로 array에서 꺼내는 것

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(`Cabin ${id} could not be deleted`);
  }
  return data;
}

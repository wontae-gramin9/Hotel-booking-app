import supabase, { supabaseUrl } from "./supabase";
import type { Cabin, StorageFile } from "@/types/cabin";

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  // @ts-expect-error
  return data;
}

export async function createEditCabin(
  newCabin: Partial<Cabin>,
  id: number | undefined
) {
  // https://kavvwqrrjwpiuwwrghit.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // [TsMigration] replaceAll 메서드는 ES2021(ES12)에서 id String.prototype
  // tsconfig.json 파일의 compilerOptions.lib 옵션에 es2021을 추가해야 함

  // 이게 File 이미지가 되는 것이지요?
  const imageName = `${Math.random()}-${
    (newCabin.image as StorageFile)?.name
  }`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let baseQuery = supabase.from("cabins");

  const cabinQuery = !id
    ? // CREATE CABIN
      baseQuery.insert([{ ...newCabin, image: imagePath as string }])
    : // UPDATE CABIN
      baseQuery
        .update({ ...newCabin, image: imagePath as string })
        .eq("id", id);

  const { data, error } = await cabinQuery.select().single(); // [newRow]를 newRow로 array에서 꺼내는 것

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    // @ts-expect-error FileBody 타입을 Supabase에서 가져와서 쓸 수 없음
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

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(`Cabin ${id} could not be deleted`);
  }
  return data;
}

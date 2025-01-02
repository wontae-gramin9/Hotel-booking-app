import supabase, { supabaseUrl } from "@/services/supabase";
import { UserAttributes } from "@supabase/supabase-js";

type UserCredentials = UserAttributes & {
  email: string;
  password: string;
  fullName: string;
  avatar: string;
};

// union이 아니라 UserAttributes를 상속받게 하려면 어떻게 해?
export async function signup({ fullName, email, password }: UserCredentials) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }: UserCredentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  // User정보를 local storage에 저장

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: UserCredentials) {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName)
    updateData = {
      data: {
        fullName,
      },
    };
  const { data, error } = await supabase.auth.updateUser(
    updateData as UserAttributes
    // UserAttributes 내부에 user의 metadata를 담기위한 data key가 있다.
  );
  if (error) throw new Error(error.message);

  if (!avatar) return data;
  // 2. Upload the avatar image
  const fileName = `avatar=${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUser, error: userUpdateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (userUpdateError) throw new Error(userUpdateError.message);
  return updatedUser;
}

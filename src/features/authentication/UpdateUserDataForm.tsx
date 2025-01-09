import { FormEvent, useState } from "react";

import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow.tsx";
import Input from "@/ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import { User } from "@supabase/supabase-js";

function UpdateUserDataForm() {
  const { user } = useUser();
  const {
    email,
    user_metadata: { fullName: currentFullName },
  } = user as User;
  // [TsMigration] We don't need the loading state or type guarding, and can immediately use the user data, because we know that it has already been loaded at this point
  const { updateUser, isUpdating } = useUpdateUser();
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File | undefined>();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (fullName)
      updateUser(
        { fullName, avatar },
        {
          onSuccess: () => {
            setAvatar(undefined);
            const form = e.target as HTMLFormElement;
            form.reset();
          },
        }
      );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(undefined);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files[0]) {
      setAvatar(files[0]);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput id="avatar" accept="image/*" onChange={handleFileChange} />
      </FormRow>
      <FormRow>
        <Button
          disabled={isUpdating}
          type="reset"
          variation="secondary"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;

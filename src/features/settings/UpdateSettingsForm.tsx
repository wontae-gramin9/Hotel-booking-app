import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Spinner from "@/ui/Spinner";
import { useSetting } from "./useSetting";
import { useUpdateSetting } from "./useUpdateSetting";
import { FormEvent } from "react";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      // [TsMirgation]max가 아니라 minGuestsPerBooking이었음. 사용되지 않아서 몰랐던 것
      minGuestsPerBooking,
      breakfastPrice,
    } = {}, // undefined일때 default value로, null은 할당된 값이라 undefined만 된다
  } = useSetting();
  // useForm();

  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleUpdate(e: FormEvent<HTMLInputElement>, field: string) {
    const { value } = e.currentTarget;
    if (!value) return;
    updateSetting({ [field]: value });
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        {/* onBlur: focus가 나가자마자 실행됨 */}
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength!}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength!}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={minGuestsPerBooking!}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice!}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

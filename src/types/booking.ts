import { Cabin, CabinWithName } from "./cabin";
import {
  Guest,
  GuestWithCredentials,
  GuestWithName,
  GuestWithNationality,
} from "./guest";

export type Booking = {
  id: number;
  created_at: string;
  cabinPrice: number | null;
  endDate: string | null;
  extrasPrice: number | null;
  hasBreakfast: boolean | null;
  isPaid: boolean | null;
  numGuests: number | null;
  numNights: number | null;
  observations: string | null;
  startDate: string | null;
  status: string | null;
  totalPrice: number | null;
  cabinId: number | null;
  guestId: number | null;
};

type WithRelations<T, Relations> = T & Relations;

export type BookingWithGuestName = WithRelations<
  Booking,
  {
    guests: GuestWithName;
  }
>;

export type BookingWithGuestNation = WithRelations<
  Booking,
  {
    guests: GuestWithNationality;
  }
>;

export type BookingWithCabinGuest = WithRelations<
  Booking,
  {
    cabins: Cabin;
    guests: Guest;
  }
>;

export type BookingWithCabinNameGuestCred = WithRelations<
  Booking,
  {
    cabins: CabinWithName;
    guests: GuestWithCredentials;
  }
>;

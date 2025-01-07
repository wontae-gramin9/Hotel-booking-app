export type Guest = {
  id: number;
  created_at: string;
  countryFlag: string | null;
  email: string | null;
  fullName: string | null;
  nationalID: string | null;
  nationality: string | null;
};

// [TsMigration] GraphQL처럼 한 객체의 몇몇 key만 가져오고 싶을 때
export type GuestWithName = Pick<Guest, "fullName">;

export type GuestWithCredentials = Pick<Guest, "fullName" | "email">;

export type GuestWithNationality = Pick<
  Guest,
  "fullName" | "nationality" | "countryFlag"
>;

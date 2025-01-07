export type Cabin = {
  id: number;
  created_at: string;
  description: string | null;
  discount: number | null;
  image: string | null;
  maxCapacity: number | null;
  name: string | null;
  regularPrice: number | null;
};

export type CabinWithName = Pick<Cabin, "name">;

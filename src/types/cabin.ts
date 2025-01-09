export class StorageFile extends File {
  startsWith(match: string) {
    return this.name.startsWith(match);
  }
}

export type Cabin = {
  id: number;
  created_at: string;
  image: StorageFile | string;
  description: string | null;
  discount: number;
  maxCapacity: number;
  name: string;
  regularPrice: number;
};

export type CabinWithName = Pick<Cabin, "name">;

// [TsMigration] keyof T(Type)중 숫자형 속성만을 추출하는 유틸리티 타입
type NumericKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

// T[K]: 타입 T의 키 K에 해당하는 value의 타입을 의미함
// [K in keyof T]
// Mapped Types → [ discount, maxCapacity, name, ... ]
export type NumericFieldOfCabin = NumericKeys<Cabin>;

export enum PackId {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

export type TCreditsPack = {
  id: PackId;
  name: string;
  label: string;
  credits: number;
  price: number;
};

export const CreditsPack: TCreditsPack[] = [
  {
    id: PackId.SMALL,
    name: "Small Pack",
    label: "1,000 credits",
    credits: 1000,
    price: 499,
  },
  {
    id: PackId.MEDIUM,
    name: "Medium Pack",
    label: "2,000 credits",
    credits: 2000,
    price: 899,
  },
  {
    id: PackId.LARGE,
    name: "Large Pack",
    label: "5,000 credits",
    credits: 4000,
    price: 1999,
  },
];

export const getCreditsPack = (id: PackId) =>
  CreditsPack.find((p) => p.id === id);

import { atom, selector } from "recoil";

export const unlockedBalanceAtom = atom<number>({
  key: "unlocked balance",
  default: 0,
});

export const lockedBalanceAtom = atom<number>({
  key: "locked balance",
  default: 0,
});

export const totalBalanceSelector = selector<number>({
  key: "fd",
  get: ({ get }) => {
    const unlockedBalance = get(unlockedBalanceAtom);
    const lockedBalance = get(lockedBalanceAtom);

    return unlockedBalance + lockedBalance;
  },
});

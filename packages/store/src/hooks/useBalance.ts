import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  unlockedBalanceAtom,
  lockedBalanceAtom,
  totalBalanceSelector,
} from "../atoms/balance";

export const useBalance = () => {
  const unlocked = useRecoilValue(unlockedBalanceAtom);
  const locked = useRecoilValue(lockedBalanceAtom);
  const total = useRecoilValue(totalBalanceSelector);
  return {
    unlocked: unlocked,
    locked: locked,
    total: total,
  };
};

export const setBalance = ({
  unlocked,
  locked,
}: {
  unlocked: number;
  locked: number;
}) => {
  const setUnlockedBalance = useSetRecoilState(unlockedBalanceAtom);
  const setlockedBalance = useSetRecoilState(lockedBalanceAtom);

  setUnlockedBalance(unlocked);
  setlockedBalance(locked);
};

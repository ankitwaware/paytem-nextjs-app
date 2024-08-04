import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  unlockedBalanceAtom,
  lockedBalanceAtom,
  totalBalanceSelector,
} from "../atoms/balance";

export const useBalance = () => {
  const [unlocked, setunlockedBalance] = useRecoilState(unlockedBalanceAtom);
  const [locked, setlockedBalance] = useRecoilState(lockedBalanceAtom);
  const total = useRecoilValue(totalBalanceSelector);

  return {
    unlocked: unlocked,
    locked: locked,
    total: total,
    setunlockedBalance,
    setlockedBalance,
  };
};

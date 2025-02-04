import { selector } from 'recoil';
import { userState } from './atoms';

export const userNameSelector = selector({
  key: 'userNameSelector',
  get: ({ get }) => {
    const user = get(userState);
    const isPremium = user && user.subscription === "premium" ? true : false;
    return isPremium;
  },
});

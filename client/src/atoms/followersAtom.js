import { atom } from "recoil";

// Default state for followersAtom
export const followersAtom = atom({
  key: "followersAtom", // Unique key
  default: {
    followers: [], // Users following the current user
    following: [], // Users the current user is following
  },
});

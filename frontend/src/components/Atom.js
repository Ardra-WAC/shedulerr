// import { atomWithStorage } from "jotai/utils";

// export const roleValue = atomWithStorage("authRole", null,localStorage, {
//   getOnInit: true, // This ensures the stored value is used on initialization
// });

import { atomWithStorage } from "jotai/utils";

export const roleValue = atomWithStorage("authRole", null, localStorage, {
  getOnInit: true,
});

export const userEmail = atomWithStorage("authEmail", null, localStorage, {
  getOnInit: true,
});

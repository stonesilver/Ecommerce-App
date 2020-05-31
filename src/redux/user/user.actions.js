import { userActionTyes } from './user.types';

export const setCurrentUser = (user) => ({
   type: userActionTyes.SET_CURRENT_USER,
   payload: user,
});

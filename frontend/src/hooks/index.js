import { useContext, createContext } from 'react';
const authContext = createContext({});
export const useAuth = () => useContext(authContext);
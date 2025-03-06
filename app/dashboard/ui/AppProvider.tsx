"use client"
import { JSX } from "@emotion/react/jsx-runtime";
import { createContext, useContext, useState } from "react";
import StartMessageDialog from "./StartMessageDialog";

interface AppContextProps {
  startNewMessage: () => void;
};

const AppContext = createContext<AppContextProps>({
  startNewMessage: () => { }
});
export const useApp = () => useContext(AppContext);

const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [openStartMessage, setOpenStartMessage] = useState(false);
  const handleCloseStartMessage = () => {
    setOpenStartMessage(false);
  }
  return (
    <AppContext.Provider value={{
      startNewMessage: () => setOpenStartMessage(true)
    }}>
      {children}
      <StartMessageDialog open={openStartMessage} onClose={handleCloseStartMessage} />
    </AppContext.Provider>
  );
};

export default AppProvider;
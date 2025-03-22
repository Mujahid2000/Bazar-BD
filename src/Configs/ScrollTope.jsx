import { createContext, useEffect, useState } from "react";


// Create the context
export const ScrollContext = createContext();

// Scroll Provider Component
export const ScrollProvider = ({ children }) => {
  const [pathname, setPathname] = useState() // Get current route


    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on route change
      }, [pathname]);



  return <ScrollContext.Provider value={{pathname, setPathname}}>
    {children}
    </ScrollContext.Provider>;
};

export default ScrollProvider;

import { createContext } from 'react';
const SubSidebarContext = createContext({
    openSub: true,
    setOpenSub: (open: boolean) => {},
});
export default SubSidebarContext;

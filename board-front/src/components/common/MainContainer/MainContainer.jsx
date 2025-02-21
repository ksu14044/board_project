/**@jsxImportSource @emotion/react */
import { FiChevronsRight } from 'react-icons/fi';
import * as s from './style';
import React from 'react';
import { useRecoilState } from 'recoil';
import { mainSidebarIsOpenState } from '../../../atoms/mainSidebar/mainSidebarAtom';
import { basicbutton } from '../../../styles/buttons';

function MainContainer({ children }) {
    const [ isOpen, setOpen ] = useRecoilState(mainSidebarIsOpenState);

    const handleSidebarOpen = () => {
        setOpen(true);
    }

    return (
        <div css={s.container}>
            <header css={s.header}>
                {
                    !isOpen &&
                    <span css={s.sidebarOpenButton}>
                    <button css={basicbutton} onClick={handleSidebarOpen}><FiChevronsRight /></button>
                    </span>    
                }
            </header>
            <main css={s.main}>
                {children}
            </main>
        </div>
    );
}

export default MainContainer;
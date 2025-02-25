/**@jsxImportSource @emotion/react */
import * as s from './style';
import React from 'react';
import { FiChevronsLeft } from "react-icons/fi";
import { basicbutton, emptyButton } from '../../../styles/buttons';
import { useRecoilState } from 'recoil';
import { mainSidebarIsOpenState } from '../../../atoms/mainSidebar/mainSidebarAtom';
import { LuLockKeyhole } from "react-icons/lu";
import { useuserMeQuery } from '../../../queries/userQuery';


function MainSidebar(props) {

    const [ isOpen, setOpen ] = useRecoilState(mainSidebarIsOpenState);
    
    const loginUser = useuserMeQuery();

    const handleSidebarClose = () => {
        setOpen(false);
    }

    return (
        <div css={s.layout(isOpen)}>
            <div css={s.container}>
                <div css={s.groupLayout}>
                    <div css={s.topGroup}>
                        <div css={s.user}>
                            <button css={emptyButton}>
                                <span css={s.authText}>
                                    <LuLockKeyhole />로그인 후 이용하기
                                </span>
                            </button>
                        </div>
                        <button css={basicbutton} onClick={handleSidebarClose}><FiChevronsLeft /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainSidebar;
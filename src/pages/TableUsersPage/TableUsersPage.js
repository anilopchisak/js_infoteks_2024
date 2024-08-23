import React, {useContext, useEffect} from 'react';
import './ui/TableUsersPage.scss';
import {LOADING_STATUS} from "../../app/utils/storeUtils";
import {Context} from "../../index";

const TableUsersPage = () => {

    const {user} = useContext(Context);

    // получаем данные о пользователях
    useEffect( () => {
        // предотвращаем повторные запросы к серверу, если данные уже загружены или находятся в процессе загрузки
        if ([LOADING_STATUS.SUCCESS, LOADING_STATUS.LOADING].includes(user.userListLoadingStatus)) return;

        const fetchUserList = async () => {
            try {
                await user.fetchUserList();
            }
            catch (e) {
                console.log(e.message);
            }
        }

        fetchUserList();
    }, []);

    return (
        <div>

        </div>
    );
};

export default TableUsersPage;
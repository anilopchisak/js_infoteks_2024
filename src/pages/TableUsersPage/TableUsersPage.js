import React, {useContext, useEffect} from 'react';
import './ui/TableUsersPage.scss';
import {LOADING_STATUS} from "../../app/utils/storeUtils";
import {Context} from "../../index";
import Table from "../../entities/Table/Table";
import {observer} from "mobx-react-lite";

// Вспомогательная функция для создания заголовков
const getHeaders = (users) => {
    if (!users || users.users.length === 0) return [];
    return ["Full name", "Age", "Sex", "Phone", "Address"];
}

// Вспомогательная функция для создания содержимого таблицы
const getTableContent = (users) => {
    if (!users) return [];
    return users.users.map(user => [
        `${user.firstName} ${user.lastName}`,
        user.age,
        user.gender,
        user.phone,
        `${user.address.city}, ${user.address.address}`
    ]);
};

const TableUsersPage = observer(() => {

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
        <div className={'container'}>
            {user.userList.length === 0 ?
                <div>
                    {user.userListLoadingStatus === LOADING_STATUS.ERROR &&
                        <div>
                            Error loading
                        </div>
                    }
                    {user.userListLoadingStatus === LOADING_STATUS.LOADING &&
                        <div>
                            Loading...
                        </div>
                    }
                </div>
                :
                <Table headers={getHeaders(user.userList)} minCellWidth={50}
                       tableContent={getTableContent(user.userList)}/>
            }
        </div>
    );
});

export default TableUsersPage;
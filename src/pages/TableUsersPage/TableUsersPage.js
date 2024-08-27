import React, {useContext, useEffect, useState} from 'react';
import './ui/TableUsersPage.scss';
import {LOADING_STATUS} from "../../app/utils/storeUtils";
import {Context} from "../../index";
import Table from "../../entities/Table/Table";
import {observer} from "mobx-react-lite";
import Modal from "../../entities/Modal/Modal";
import UserCard from "../../entities/Modal/features/UserCard";
import Search from "../../entities/Search/Search";

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
    // состояние, отвечающее за видимость модального окна
    const [modalActive, setModalActive] = useState(false);
    // id запрошенного user для модального окна
    const [userID, setUserID] = useState(null);

    const [search, setSearch] = useState('');

    const columnsNames = ['firstName', 'lastName', 'age', 'gender', 'phone', 'address.city', 'address.address'];

    // получаем данные о пользователях при загрузке страницы
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

    // получаем данные о пользователе по id при изменении состояния modalActive
    useEffect(() => {
        if (modalActive === true && userID !== null) {

            const fetchUser = async (id) => {
                try {
                    await user.fetchUser(id+1);
                }
                catch (e) {
                    console.log(e.message);
                }
            }

            fetchUser(userID);
        }
    }, [modalActive, userID]);

    // обработчик события открытия модального окна
    const onOpenModal = (id) => {
        setUserID(id);
        setModalActive(true);
    }

    // если в строку поиска что то введено, то производится поиск
    useEffect(() => {
        if (search !== '') {
            const fetchFilter = async (search) => {
                try {
                    await user.fetchFilter(search, columnsNames);
                }
                catch (e) {
                    console.log(e.message);
                }
            }

            fetchFilter(search);
        }
        else {
            user.removeFilter();
        }
    }, [search]);

    return (
        <div className={'container'}>
            <div className={'container-flex'}>
                {user.userListLoadingStatus === LOADING_STATUS.SUCCESS ?
                    <div className={'search-container'}><Search columns={getHeaders(user.userList)} setSearch={setSearch}/></div>
                    :
                    <div className={'search-container'}><Search columns={null} setSearch={setSearch}/></div>
                }
                <div className={'table-container'}>
                    {user.filterLoadingStatus !== LOADING_STATUS.IDLE ?
                        <div>
                            {user.filterLoadingStatus === LOADING_STATUS.ERROR &&
                                <div>
                                    Error loading
                                </div>
                            }
                            {user.filterLoadingStatus === LOADING_STATUS.LOADING &&
                                <div>
                                    Loading...
                                </div>
                            }
                            {user.filterLoadingStatus === LOADING_STATUS.SUCCESS &&
                                <Table headers={getHeaders(user.userList)}
                                       minCellWidth={50}
                                       tableContent={getTableContent(user.filter)}
                                       onOpenModal={onOpenModal}/>
                            }
                            {user.filterLoadingStatus === LOADING_STATUS.IDLE &&
                                <div>
                                    Connection error
                                </div>
                            }
                            {user.filterLoadingStatus === LOADING_STATUS.NOT_FOUND &&
                                <div>
                                    Data not found
                                </div>
                            }
                        </div>
                    :
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
                            {user.userListLoadingStatus === LOADING_STATUS.SUCCESS &&
                                <Table headers={getHeaders(user.userList)}
                                       minCellWidth={50}
                                       tableContent={getTableContent(user.userList)}
                                       onOpenModal={onOpenModal}/>
                            }
                            {user.userListLoadingStatus === LOADING_STATUS.IDLE &&
                                <div>
                                    Connection error
                                </div>
                            }
                        </div>
                    }

                </div>
                <Modal active={modalActive} setActive={setModalActive}>
                    {user.userLoadingStatus === LOADING_STATUS.LOADING &&
                        <div>Loading...</div>
                    }
                    {user.userLoadingStatus === LOADING_STATUS.ERROR &&
                        <div>Error loading</div>
                    }
                    {user.userLoadingStatus === LOADING_STATUS.IDLE &&
                        <div>Server connection error</div>
                    }
                    {user.userLoadingStatus === LOADING_STATUS.SUCCESS &&
                        <UserCard user={user}/>
                    }
                </Modal>
            </div>
        </div>
    );
});

export default TableUsersPage;
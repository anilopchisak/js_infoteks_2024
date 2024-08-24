import React, {useContext, useEffect, useState} from 'react';
import './ui/TableUsersPage.scss';
import {LOADING_STATUS} from "../../app/utils/storeUtils";
import {Context} from "../../index";
import Table from "../../entities/Table/Table";
import {observer} from "mobx-react-lite";
import Modal from "../../entities/Modal/Modal";

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

    useEffect(() => {
        if (modalActive === true && userID !== null) {
            user.removeUser();

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

    return (
        <div className={'container'}>
            <div>
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
                    <Table headers={getHeaders(user.userList)}
                           minCellWidth={50}
                           tableContent={getTableContent(user.userList)}
                           onOpenModal={onOpenModal}
                    />
                }
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <div>
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
                        <div>
                            <div className={'modal-name'}>
                                <h1>{user.user.firstName} {user.user.lastName}</h1>
                                {user.user.maidenName &&
                                    <h2>({user.user.maidenName})</h2>
                                }
                            </div>
                            {user.user.address &&
                                <h3>{user.user.address.city}, {user.user.address.address}</h3>
                            }
                            <div className={'modal-item'} >
                                <h3>general info</h3>
                                <div id={'gen'}>
                                    <div id={'year'}>
                                        {user.user.age} years
                                    </div>
                                    <div>
                                        <p>{user.user.height} sm</p>
                                        <p>{user.user.weight} kg</p>
                                    </div>
                                </div>

                            </div>
                            <div className={'modal-item'} >
                                <h3>contacts</h3>
                                <div>
                                    <p>{user.user.phone}</p>
                                    <p>{user.user.email}</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </Modal>
        </div>
    );
});

export default TableUsersPage;
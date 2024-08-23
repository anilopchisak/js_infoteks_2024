import {makeAutoObservable} from "mobx";
import {LOADING_STATUS} from "../../../app/utils/storeUtils";
import {fetchUser, fetchUserList} from "../api/userAPI";

class UserStore {
    // переменные для отслеживания статуса загрузки данных
    userListLoadingStatus = LOADING_STATUS.IDLE;
    userLoadingStatus = LOADING_STATUS.IDLE;

    constructor() {
        this._userList = []; // все пользователи для таблицы
        this._user = {}; // подробная информация о пользователе для модального окна

        makeAutoObservable(this);
    }

    setUserList(userList) {
        this._userList = userList;
    }
    setUser(user) {
        this._user = user;
    }

    get userList() {
        return this._userList;
    }
    get user() {
        return this._user;
    }

    async fetchUserList() {
        this.userListLoadingStatus = LOADING_STATUS.LOADING;

        try {
            const response = await fetchUserList();
            this.setUserList(response);
            this.userListLoadingStatus = LOADING_STATUS.SUCCESS;
        }
        catch(e) {
            console.log(e.message);
            this.userListLoadingStatus =  LOADING_STATUS.ERROR;
        }
    }

    async fetchUser(id) {
        this.userLoadingStatus =  LOADING_STATUS.LOADING;

        try {
            const response = await fetchUser(id);
            this.setUser(response);
            this.userLoadingStatus = LOADING_STATUS.SUCCESS;
        }
        catch(e)
        {
            console.log(e.message);
            this.userLoadingStatus = LOADING_STATUS.ERROR;
        }
    }

}

export default UserStore;
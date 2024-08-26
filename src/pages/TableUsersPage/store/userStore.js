import {makeAutoObservable} from "mobx";
import {LOADING_STATUS} from "../../../app/utils/storeUtils";
import {fetchFilter, fetchSort, fetchUser, fetchUserList} from "../api/userAPI";

class UserStore {
    // переменные для отслеживания статуса загрузки данных
    userListLoadingStatus = LOADING_STATUS.IDLE;
    userLoadingStatus = LOADING_STATUS.IDLE;
    filterLoadingStatus =  LOADING_STATUS.IDLE;
    sortLoadingStatus =  LOADING_STATUS.IDLE;

    constructor() {
        this._userList = []; // все пользователи для таблицы
        this._user = {}; // подробная информация о пользователе для модального окна
        this._filter = [];
        this._sort = [];

        makeAutoObservable(this);
    }

    setUserList(userList) {
        this._userList = userList;
    }
    setUser(user) {
        this._user = user;
    }
    setFilter(filter) {
        this._filter = filter;
    }
    setSort(sort) {
        this._sort = sort;
    }

    get userList() {
        return this._userList;
    }
    get user() {
        return this._user;
    }
    get filter() {
        return this._filter;
    }
    get sort() {
        return this._sort;
    }

    removeUser() {
        this._user = {};
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

    async fetchFilter(value) {
        this.filterLoadingStatus =  LOADING_STATUS.LOADING;

        try {
            const response = await fetchFilter(value);
            this.setUser(response);
            this.filterLoadingStatus = LOADING_STATUS.SUCCESS;
        } catch(e) {
            console.log(e.message);
            this.filterLoadingStatus = LOADING_STATUS.ERROR;
        }
    }

    // async fetchSort(sortBy, order) {
    //     this.sortLoadingStatus =  LOADING_STATUS.LOADING;
    //
    //     try {
    //         const response = await fetchSort(sortBy, order);
    //         this.setUser(response);
    //         this.sortLoadingStatus = LOADING_STATUS.SUCCESS;
    //     } catch(e) {
    //         console.log(e.message);
    //         this.sortLoadingStatus = LOADING_STATUS.ERROR;
    //     }
    // }
}

export default UserStore;
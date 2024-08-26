import React from 'react';

// структура вывода информации о пользователе по id
const UserCard = ({user}) => {
    return (
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
    );
};

export default UserCard;
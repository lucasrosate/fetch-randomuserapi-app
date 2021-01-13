import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createUser } from '../store/actions/userActions';
import store from '../store/store';
import RenderMapLocation from '../components/common/rendermaplocation';
import style from '../styles/home.module.css';





const Home: React.FC = () => {
    const dispatch: DispatchType = useDispatch();

    const user: IUser = useSelector((state: UserState) => state.user);

    const getApiData = React.useCallback(() => {

        dispatch(createUser());
    }, [createUser, user, dispatch]);


    useEffect(() => getApiData(), [])



    return (
        <>
            <div className={style.background}>


                <div className={style.container}>
                    <div className={style.contentContainer}>
                        <div className={style.profileContainer}>

                            <div className={style.profileImageContainer}>
                                <img src={user.picture.large} alt="profile image" />
                            </div>
                            <div className={style.infoUserContainer}>
                                <h3>{user.login.username}</h3>
                                <div className={style.descriptionContainer}>
                                    <div><b>Full Name:</b> {user.name.first} {user.name.last}</div>
                                    <div><b>Current live:</b> {user.location.city}, {user.location.country}</div>
                                    <div><b>Country Origin:</b> {user.nat}</div>
                                    <div><b>Email:</b> {user.email}</div>
                                    <div><b>Tel:</b> {user.phone}</div>
                                    <div><b>Gender:</b> {user.gender}</div>
                                </div>
                                <div><button className={style.button} onClick={getApiData}>Reload</button></div>
                            </div>
                        </div>

                        <div className={style.mapLocationContainer}>
                            <RenderMapLocation />
                        </div>

                    </div>

                </div>
            </div>
        </>


    )
}
export default Home;
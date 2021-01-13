import React, { useEffect, useState } from 'react';

import { createUser } from '../store/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';

import style from '../styles/home.module.css';

import LocationMap from '../components/common/locationmap';


const Home: React.FC = () => {
    const dispatch: DispatchType = useDispatch();

    const user: IUser = useSelector((state: UserState) => state.user);
    var [lat, setLat] = useState<number>(0);
    var [lng, setLng] = useState<number>(0);
    var [zoom, setZoom] = useState<number>(2);

    const updateLocation = (newValueLat: number, newValueLng: number, newValueZoom: number) => {
        setLat(newValueLat);
        setLng(newValueLng);
        setZoom(newValueZoom);

        console.log(lat)
    }


    const loadUserApi = React.useCallback(() => {
        createUser();
        updateLocation(
            parseFloat(user.location.coordinates.latitude) || 0,
            parseFloat(user.location.coordinates.longitude) || 0,
            2)
    }, [lat, lng]);


    useEffect(() => {
        loadUserApi();

    }, [loadUserApi])


    return (
        <>
            <div className={style.background}>


                <div className={style.container}>
                    <img src={user?.picture?.large} alt="" />
                    {user?.login?.username}
                    Name: {user?.name?.title} {user?.name?.first} {user?.name?.last}
                    Gender: {user?.gender}
                    Email: {user?.email}
                    Data:{user?.registered?.date}
                    {user?.phone}
                    {user?.nat}

                    <LocationMap
                        lat={lat}
                        lng={lng}
                        zoom={zoom}
                        updateLocation={updateLocation}
                    />
                    <button className={style.button} onClick={loadUserApi}>Reload</button>
                </div>
            </div>
        </>


    )
}
export default Home;
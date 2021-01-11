import React, { useEffect } from 'react';

import { createUser } from '../store/actions/userActions';
import { useSelector, useDispatch} from 'react-redux';

const Home: React.FC = () => {
    const dispatch: DispatchType = useDispatch();

    const user: IUser = useSelector((state: UserState) => state.user) || {};

    
    const loadUserApi = React.useCallback(() => createUser(), []);

    useEffect (()=> {
        loadUserApi();
        console.log(user);
    }, [])


    return (
        <div>
            {user?.name?.first}
        </div>
    )
}
export default Home;
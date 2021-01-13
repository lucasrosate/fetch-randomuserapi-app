declare global {
    interface IUser {
        gender: string,
        name: {
            title: string,
            first: string,
            last: string
        },
        location: {
            street: {
                number: number,
                name: string
            },
            city: string,
            state: string,
            country: string,
            postcode: number,
            coordinates: {
                latitude: string,
                longitude: string
            },
            timezone: {
                offset: string,
                description: string
            }
        },
        email: string,
        login: {
            uuid: string,
            username: string,
            password: string,
            md5: string,
            sha1: string,
            sha256: string
        },
        dob: {
            date: string,
            age: number
        },
        registered: {
            date: string,
            age: number
        },
        phone: string,
        cell: string,
        id: {
            name: string,
            value: string
        },
        picture: {
            large: string,
            medium: string,
            thumbnail: string
        },
        nat: string,
        status?: string
    };

    type UserAction = {
        type: string,
        payload: IRandomUserApi | string,
    };

    type UserState = {
        user: IUser
    };

    type DispatchType = (args: UserAction) => UserAction;
}



export type { }
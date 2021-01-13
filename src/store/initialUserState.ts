export const initialState: UserState = {
    user: {
        gender: '',
        name: {
            title: '',
            first: '',
            last: ''
        },
        location: {
            street: {
                number: 0,
                name: ''
            },
            city: '',
            state: '',
            country: '',
            postcode: 0,
            coordinates: {
                latitude: '0',
                longitude: '0'
            },
            timezone: {
                offset: '',
                description: ''
            }
        },
        email: '',
        login: {
            uuid: '',
            username: '',
            password: '',
            md5: '',
            sha1: '',
            sha256: ''
        },
        dob: {
            date: '',
            age: 0
        },
        registered: {
            date: '',
            age: 0
        },
        phone: '',
        cell: '',
        id: {
            name: '',
            value: ''
        },
        picture: {
            large: '',
            medium: '',
            thumbnail: ''
        },
        nat: ''
    }
}
import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { User } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { UserItem } from '../UserItem';

const userController = new User();

export function ListMe(props) {
    const { onReload, reload } = props;
    const [user, setUser] = useState(null);
    const { accessToken } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                setUser(null);
                const response = await userController.getMe(accessToken);
                setUser(response);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [accessToken, reload]);

    if (!user) return <Loader active inline="centered" />;

    return <UserItem key={user._id} user={user} onReload={onReload} />;
}

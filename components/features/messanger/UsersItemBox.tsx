import React from 'react';
import { UserItem } from './users/UserItem';
import {
  useFetchAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
} from '../../app/store/messanger/Users';
import { IUsers } from '../../models/IUsers';

export const UsersItemBox = () => {
  const { data: users, error, isLoading } = useFetchAllUsersQuery(5);
  const [updateUser, {}] = useUpdateUserMutation();
  const [createUser, {}] = useCreateUserMutation();
  const [deleteUser, {}] = useDeleteUserMutation();
  return (
    <div className='float-left'>
      <h1>UsersItemBox</h1>
      <div className='grid grid-cols-1 grid-flow-row auto-rows-max'>
        {isLoading ? (
          <div>Loading... </div>
        ) : error ? (
          <div>Error</div>
        ) : users ? (
          <div>
            {users.map((usersItem: IUsers) => (
              <UserItem key={usersItem.id} usersItem={usersItem} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

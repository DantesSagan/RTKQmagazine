import React from 'react';
import { IMessages } from '../../models/IMesseges';
import {
  useFetchAllMessagesQuery,
  useUpdateMessagesMutation,
  useDeleteMessagesMutation,
  useCreateMessagesMutation,
} from '../../app/store/messanger/Messages';
import { MessagesItem } from './messages/MessagesItem';
import { useFetchAllUsersQuery } from '../../app/store/messanger/Users';
import { IUsers } from '../../models/IUsers';
export const MessangerItemBox = () => {
  const { data: messages, error, isLoading } = useFetchAllMessagesQuery(5);
  const {
    data: users,
    error: errorUsers,
    isLoading: isLoadingUsers,
  } = useFetchAllUsersQuery(5);
  const [updateMessages, {}] = useUpdateMessagesMutation();
  const [createMessages, {}] = useCreateMessagesMutation();
  const [deleteMessages, {}] = useDeleteMessagesMutation();
  return (
    <div className='float-right'>
      <h1>MessangerItemBox</h1>
      <div className='grid grid-cols-1 grid-flow-row auto-rows-max'>
        {isLoadingUsers ? (
          <div>Loading... </div>
        ) : errorUsers ? (
          <div>Error</div>
        ) : messages && users ? (
          <div>
            {messages.map((messagesItem: IMessages) =>
              users.map((usersItem: IUsers) => (
                <MessagesItem
                  key={usersItem.id}
                  messagesItem={messagesItem}
                  usersItem={usersItem}
                />
              ))
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

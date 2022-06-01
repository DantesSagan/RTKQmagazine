import React, { FC } from 'react';
import { IMessages } from '../../../models/IMessages';
import { IUsers } from '../../../models/IUsers';

interface MessagesItemProps {
  messagesItem: IMessages;
  usersItem: IUsers;
}

export const MessagesItem: FC<MessagesItemProps> = ({
  messagesItem,
  usersItem,
}) => {
  const compareSendDialog = messagesItem.sendId === usersItem.authorId;
  const compareFromMessage = messagesItem.fromId === usersItem.authorId;
  return (
    <div>
      {usersItem.bio.username === messagesItem.username ? (
        <div>
          {compareSendDialog && compareFromMessage ? (
            <div>
              <h1>MessagesItem1 - {usersItem.bio.username}</h1>
              <div>{messagesItem.message}</div>
            </div>
          ) : (
            'Error'
          )}
        </div>
      ) : (
        <h1>MessagesItem2 - Error</h1>
      )}
    </div>
  );
};

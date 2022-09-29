/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { FC, useContext, useEffect } from 'react';
import { useFetchMessageQuery } from '../../../app/store/messanger/Messages';
import { MenuContext } from '../../../context/Menu';
import { IUsers } from '../../../models/IUsers';

interface UsersItemProps {
  usersItem: IUsers;
}

export const UserItem: FC<UsersItemProps> = ({ usersItem }) => {
  const { menu, setMenu } = useContext(MenuContext);
  // const {
  //   data: message,
  //   error,
  //   isLoading,
  // } = useFetchMessageQuery(usersItem.authorId);

  const router = useRouter();
  useEffect(() => {
    document.title = 'Messenger';
  }, []);

  const handleMenuDialog = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setMenu(!menu);
    router.push(`/messages/${usersItem.authorId}`);
  };

  return (
    <div className='flex items-center justify-center'>
      <div onClick={handleMenuDialog} className='bg-red-600 cursor-pointer'>
        <img
          className='rounded-full h-6 w-6'
          src=''
          alt={usersItem.bio.username}
        />
        <div className='text-2xl p-2'>{usersItem.bio.username}</div>
      </div>
    </div>
  );
};

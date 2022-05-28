// import { useDispatch, useSelector } from 'react-redux';

import React, { useEffect, useState } from 'react';
import { fetchUsers } from './userSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

export default function UserView() {
  const [lock, setLock] = useState(true);
  const user = useAppSelector((state) => state.user);
  const users = useAppSelector((state) => state.user.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  console.log(users);

  const sortDataUsers = users.map((item) => {
    return (
      <ul key={item.id}>
        <li key={item.id}>
          {item.id} - {item.name} - {item.username}{' '}
        </li>
      </ul>
    );
  });

  return (
    <section className='border-2 border-black rounded-lg p-4'>
      <hr className='p-2 mt-2' />
      {user.loading && <div className='text-3xl font-bold p-4'>Loading...</div>}
      {user.error && (
        <div className='font-bold text-3xl bg-red-600 p-4 rounded-lg m-4'>
          Error 404
        </div>
      )}
      {!user.loading && (
        <div>
          {lock ? (
            <button
              onClick={() => {
                setLock(false);
                dispatch(fetchUsers());
              }}
              className='mr-1 p-4 bg-green-700 rounded-lg border-2 border-black hover:bg-green-600'
            >
              Fetch users
            </button>
          ) : (
            <div>
              <h2>List of users -{sortDataUsers}</h2>
              <hr className='p-2 mt-2' />
              <button
                onClick={() => setLock(true)}
                className='mr-1 p-4 bg-red-700 rounded-lg border-2 border-black hover:bg-red-600'
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

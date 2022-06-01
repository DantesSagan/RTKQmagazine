// import React from 'react';
// import {
//   useFetchAllMessagesQuery,
//   useFetchMessageQuery,
// } from '../../components/app/store/messanger/Messages';
// import { MessageContext } from '../../components/context/Message';
// // import { useFetchAllUsersQuery } from '../../../components/app/store/messanger/Users';
// import { MessangerItemBox } from '../../components/features/messanger/MessangerItemBox';
// import { IMessages } from '../../components/models/IMessages';

// const MessageID = ({ message }) => {
//   return (
//     <MessageContext.Provider value={{ message }}>
//       <MessangerItemBox />
//     </MessageContext.Provider>
//   );
// };

// export default MessageID;

// export async function getStaticProps(context) {
//   const { params } = context;
//   const id = params.id;
//   const Fetch = () => {
//     const { data: message } = useFetchMessageQuery(id);
//     return { message };
//   };
//   const { message } = Fetch();
//   return {
//     props: {
//       message,
//     },
//     revalidate: 10,
//   };
// }

// export async function getStaticPaths() {
//   const Fetch = () => {
//     const { data: messages } = useFetchAllMessagesQuery(5);
//     return { messages };
//   };
//   const { messages } = Fetch();
//   const paths = messages.map((item: IMessages) => {
//     return {
//       params: {
//         id: item.id,
//       },
//     };
//   });

//   return {
//     paths,
//     fallback: true,
//   };
// }

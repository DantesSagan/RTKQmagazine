// import React from 'react';
// import { CakesApi } from '../services/CakesService';
// import { CakesItem } from './CakesItem';

// export const CakesContainer2 = () => {
//   const { data: cakes, error, isLoading } = CakesApi.useFetchAllCakesQuery(5);

//   return (
//     <div>
//       {isLoading && <h1>Loading...</h1>}
//       {error && <h1>Error</h1>}
//       <div>
//         {cakes && cakes.map((cakes) => <CakesItem key={cakes.id} cakes={cakes} />)}
//       </div>
//     </div>
//   );
// };

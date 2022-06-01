export interface IUsers {
  id: number;
  authorId: number;
  bio: {
    first_name: string;
    second_name: string;
    username: string;
  };
}

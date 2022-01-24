import React from "react";
import { User } from "../interfaces/app";
export interface IUsersProps {
  users: User[];
}
export const Users: React.FC<IUsersProps> = ({ users }) => {
  return (
    <div>
      <div>
        <b>List of all users</b>
      </div>
      {users.map((item: User) => {
        return <div key={item._id}>{item.name}</div>;
      })}
    </div>
  );
};

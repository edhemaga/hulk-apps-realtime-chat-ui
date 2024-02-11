import { FC, useEffect, useState } from "react";

import { JwtPayload, jwtDecode } from "jwt-decode";
import axiosInstance from "../../shared/network/axios";

//Components
import { LeftDrawer } from "./Drawer/Drawer";

import { IUser } from "../../shared/models/User/IUser";
import { IGroup } from "../../shared/models/Group/IGroup";

interface JwtPayloadUserClaims extends JwtPayload {
  id: string;
  email: string;
}

//TODO Add type for current user

const Home: FC = () => {
  const [persons, setPersons] = useState<IUser[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);

  const [currentUser, setCurrentUser] = useState<string>();
  const [selectedGroup, setSelectedGroup] = useState<IGroup>();

  useEffect(() => {
    const fetchData = async () => {
      let claims: JwtPayloadUserClaims = jwtDecode(
        localStorage.getItem("access_token") ?? ""
      );
      setCurrentUser(claims.id);

      const response = await axiosInstance.get("user/info");

      const { persons, groups } = response.data;
      const remappedPersons = persons
        .filter((arg: IUser) => arg.id !== claims.id)
        .map((person: IUser) => {
          return {
            id: person.id,
            name: `${person.name} ${person.surname}`,
          };
        });

      setPersons(remappedPersons);
      setGroups(groups);
    };

    fetchData();

    return () => {
      setGroups([]);
      setPersons([]);
    };
  }, []);

  const openChat = async (id: string, type: string) => {
    const response = await axiosInstance.get<IGroup>(
      `/group/${currentUser}/${id}`
    );

    setSelectedGroup(response.data as IGroup);
  };

  return (
    <>
      <LeftDrawer
        persons={persons}
        groups={groups}
        openChat={openChat}
      ></LeftDrawer>
      {selectedGroup?.messages.map((message) => {
        <div key={message.id}>{message.value}</div>;
      })}
    </>
  );
};

export default Home;

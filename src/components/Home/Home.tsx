import { FC, useEffect, useState } from "react";

import { JwtPayload, jwtDecode } from "jwt-decode";
import axiosInstance from "../../shared/network/axios";

//Components
import { LeftDrawer } from "./Drawer/Drawer";

import { IUser } from "../../shared/models/User/IUser";

interface JwtPayloadUserClaims extends JwtPayload {
  id: string;
  email: string;
}

const Home: FC = () => {
  const [persons, setPersons] = useState<IUser[]>([]);
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("user/info");

      const { persons, groups } = response.data;
      let claims: JwtPayloadUserClaims = jwtDecode(
        localStorage.getItem("access_token") ?? ""
      );
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
  return (
    <>
      <LeftDrawer persons={persons} groups={groups}></LeftDrawer>
    </>
  );
};

export default Home;

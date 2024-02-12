import { FC, useEffect, useLayoutEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../shared/network/axios";

//Components
import { LeftDrawer } from "./Drawer/Drawer";

import { IUser } from "../../shared/models/User/IUser";
import { IGroup } from "../../shared/models/Group/IGroup";
import { Messaging } from "./Messaging/Messaging";
import { getTokenClaimUserId } from "../../shared/util/helpers/helper";

//TODO Add type for current user

const Home: FC = () => {
  const [persons, setPersons] = useState<IUser[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);

  const [currentUser, setCurrentUser] = useState<string | undefined>(
    getTokenClaimUserId()
  );
  const [selectedGroup, setSelectedGroup] = useState<IGroup | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`user/info/${currentUser}`);

      const { persons, groups } = response.data;

      const remappedPersons = persons.map((person: IUser) => {
        return {
          id: person.id,
          name: `${person.name} ${person.surname}`,
        };
      });

      setPersons(remappedPersons);
      setGroups(groups);
    };

    if (currentUser) fetchData();

    return () => {
      setGroups([]);
      setPersons([]);
    };
  }, [currentUser]);

  const openChat = (id: string, type: string) => {
    try {
      const fetchData = async (path: string) => {
        const response = await axiosInstance.get<IGroup>(path);
        setSelectedGroup(response.data);
      };
      if (type === "single") {
        fetchData(`/group/${currentUser}/${id}`);
      } else if (type === "room") {
        fetchData(`/group/room/${id}`);
      } else {
        throw new Error("Type not specified!");
      }
    } catch (err) {
      //TODO Add toaster with error message
      throw new Error(err as string);
    }
  };

  return (
    <div className="flex">
      {currentUser && (
        <>
          <LeftDrawer
            userId={currentUser}
            persons={persons}
            groups={groups}
            openChat={openChat}
          />
          {selectedGroup && (
            <Messaging userId={currentUser} group={selectedGroup}></Messaging>
          )}
        </>
      )}
    </div>
  );
};

export default Home;

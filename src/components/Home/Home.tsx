import { FC, useEffect, useState } from "react";

import axiosInstance from "../../shared/network/axios";

//Components
import { LeftDrawer } from "./Drawer/Drawer";

//Models
import { IUser } from "../../shared/models/User/IUser";
import { IGroup, IGroupWithUserInfo } from "../../shared/models/Group/IGroup";
import { Messaging } from "./Messaging/Messaging";

//Helpers
import { getTokenClaimUserId } from "../../shared/util/helpers/helper";
import { CircularProgress } from "@mui/material";

//TODO Add type for current user

const Home: FC = () => {
  const [persons, setPersons] = useState<IUser[]>([]);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [currentUser, setCurrentUser] = useState<string | undefined>(
    getTokenClaimUserId()
  );
  const [selectedGroup, setSelectedGroup] = useState<
    IGroupWithUserInfo | undefined
  >(undefined);

  const getUserInfo = async () => {
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

  useEffect(() => {
    if (currentUser) getUserInfo();

    return () => {
      setGroups([]);
      setPersons([]);
    };
  }, [currentUser]);

  const openChat = (id: string, type: string) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const fetchData = async (path: string) => {
        const response = await axiosInstance.get<IGroupWithUserInfo>(path);
        setSelectedGroup(response.data);
      };
      if (type === "single") {
        fetchData(`/group/${currentUser}/${id}`);
      } else if (type === "room") {
        fetchData(`/group/room/${id}`);
      } else {
        throw new Error("Type not specified!");
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      //TODO Add toaster with error message
      throw new Error(err as string);
    }
  };

  const refresh = () => {
    getUserInfo();
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
            refresh={refresh}
          />
          {isLoading ? (
            <CircularProgress size={40} />
          ) : (
            selectedGroup && (
              <Messaging userId={currentUser} data={selectedGroup}></Messaging>
            )
          )}
          {}
        </>
      )}
    </div>
  );
};

export default Home;

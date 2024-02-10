import { FC, useEffect, useState } from "react";

//Components
import { LeftDrawer } from "./Drawer/Drawer";

import axiosInstance from "../../shared/network/axios";

const Home: FC = () => {

    const [persons, setPersons] = useState<any[]>([]);
    const [groups, setGroups] = useState<any[]>([]);

    useEffect(() => {

        const fetchData = async () => {
            const response = await axiosInstance.get('user/info');
            const { persons, groups } = response.data;
            setPersons(persons);
            setGroups(groups);
        }

        fetchData();

        return () => {
            setGroups([]);
            setPersons([]);
        }
    }, [])
    return <>
        <LeftDrawer persons={persons} groups={groups}></LeftDrawer>
    </>
}

export default Home;
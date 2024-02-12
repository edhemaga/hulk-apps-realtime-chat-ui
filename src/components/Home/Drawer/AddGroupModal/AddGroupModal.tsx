import "./AddGroupModal.css";

import { FC, useState } from 'react';

//Material 
import {
    TextField,
    Button,
    Chip,
    Autocomplete,
    Stack
} from '@mui/material';
// import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { styled } from '@mui/system';

import { DrawerItem } from "../Drawer";

interface ChatGroupFormProps {
    persons: DrawerItem[];
    onSave: (group: { name: string; members: string[] }) => void;
}

const StyledForm = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    margin: 'auto',
});

const StyledTextField = styled(TextField)({
    marginBottom: '16px',
});

const AddGroupModal: FC<ChatGroupFormProps> = ({ persons, onSave }) => {

    const [groupName, setGroupName] = useState('');
    const [members, setMembers] = useState('');

    const [selectedMembers, setSelectedMembers] = useState<DrawerItem[]>([]);

    const handleAutocompleteChange = (
        event: React.SyntheticEvent,
        values: DrawerItem[]
    ) => {
        setSelectedMembers(values);
    };

    const handleSave = () => {
        const membersArray = members.split(',').map((member) => member.trim());
        // onSave({ name: groupName, members: membersArray });
        // Reset the form after saving
        setGroupName('');
        setMembers('');
        setSelectedMembers([]);
    };

    return (
        <StyledForm className='form-wrapper'>
            <div className="text-2xl font-bold mb-4">Add new group (room)</div>
            <StyledTextField
                label="Group/Room Name"
                variant="outlined"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
            />

            <Stack className="mb-4" spacing={3}>
                <Autocomplete
                    id="select-members"
                    multiple
                    filterSelectedOptions
                    options={[...persons]}
                    getOptionLabel={(option) => option.name}
                    defaultValue={[]}
                    onChange={handleAutocompleteChange}
                    value={selectedMembers}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Persons"
                            placeholder="Add person to group chat"
                        />
                    )}
                />
            </Stack>
            <Button
                variant="contained"
                color="primary"
                // startIcon={<GroupAddIcon />}
                onClick={handleSave}
            >
                Save
            </Button>
        </StyledForm>
    );
};

export default AddGroupModal;

import { FC, useState } from "react";

export const Modal: FC = (props) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
    };
    return <>{}</>
}
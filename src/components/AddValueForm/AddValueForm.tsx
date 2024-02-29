import { IconButton, Stack, TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"
import AddIcon from '@mui/icons-material/Add';

type AddValueFormProps = {
    addNewItem: (value: string) => void
}

function AddValueForm({ addNewItem }: AddValueFormProps) {
    let [newTaskValue, setNewTaskValue] = useState<string>('')
    let [errorInput, setErrorInput] = useState<boolean>(false)
    function editTaskValue(e: ChangeEvent<HTMLInputElement>) {
        setNewTaskValue(e.currentTarget.value)
    }

    function getValue() {
        if (newTaskValue.trim() === "") {
            setErrorInput(true)
            return
        }
        addNewItem(newTaskValue.trim())
        setNewTaskValue('')
    }
    return (
        <Stack justifyContent={'center'} alignItems={'center'} direction={'row'}>
            <TextField sx={{ maxWidth: "70%" }} variant="standard" error={errorInput} helperText={errorInput ? "error input" : ""} value={newTaskValue} onChange={editTaskValue} onKeyDown={() => setErrorInput(false)} />
            <IconButton onClick={getValue}>
                <AddIcon />
            </IconButton>
            {errorInput && <div>{errorInput}</div>}
        </Stack>
    )
}

export default AddValueForm
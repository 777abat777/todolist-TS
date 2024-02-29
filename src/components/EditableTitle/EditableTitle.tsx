import { TextField } from "@mui/material"
import { useState } from "react"

type EditableSpanPropsTypes = {
    title: string
    changeTitle: (title: string) => void
}
function EditableTitle(props: EditableSpanPropsTypes) {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState('')

    function editTitle() {
        setEditMode(true)
        setTitle(props.title)
    }
    function changeValue(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setTitle(e.currentTarget.value)
    }
    function changeTitle() {
        setEditMode(false)
        if (title.length > 0) {
            props.changeTitle(title)
        }
    }
    return (
        <>
            {
                editMode ?
                    <TextField size="small" sx={{ maxWidth: "50%" }} value={title} type="text" autoFocus onBlur={changeTitle} onChange={(e) => changeValue(e)} /> :
                    <h3 style={{ wordBreak: "break-word", textAlign: "center" }} onClick={editTitle}>{props.title}</h3>
            }
        </>
    )
}

export default EditableTitle
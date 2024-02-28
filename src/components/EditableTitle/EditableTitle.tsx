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
    function changeValue(e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }
    function changeTitle() {
        setEditMode(false)
        props.changeTitle(title)
    }
    return (
        <>
            {
                editMode ?
                    <input value={title} type="text" autoFocus onBlur={changeTitle} onChange={(e) => changeValue(e)} /> :
                    <span onClick={editTitle}>{props.title}</span>
            }
        </>
    )
}

export default EditableTitle
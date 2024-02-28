import { ChangeEvent, useState } from "react"

type AddValueFormProps = {
    addNewItem: (value: string) => void
}

function AddValueForm({ addNewItem }: AddValueFormProps) {
    let [newTaskValue, setNewTaskValue] = useState<string>('')
    let [errorInput, setErrorInput] = useState<null | string>(null)
    function editTaskValue(e: ChangeEvent<HTMLInputElement>) {
        setNewTaskValue(e.currentTarget.value)
    }

    function getValue() {
        if (newTaskValue.trim() === "") {
            setErrorInput("error input")
            return
        }
        addNewItem(newTaskValue.trim())
        setNewTaskValue('')
    }
    return (
        <div>
            <input type="text" value={newTaskValue} onChange={editTaskValue} onKeyDown={() => setErrorInput(null)} />
            <button onClick={getValue}>+</button>
            {errorInput && <div>{errorInput}</div>}
        </div>
    )
}

export default AddValueForm
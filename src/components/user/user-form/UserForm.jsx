import Button from "../../layout/button/Button";
import { useState, useEffect } from "react";
import Input from "../../layout/input/Input";

const UserForm = ({saveUser, selectUser}) => {
    // console.log(selectUser)
    const [input, setInput] = useState({name: "", phone: "", city: "", id:""});
    useEffect(() => {
        if(selectUser) {
            setInput((prev) => ({...prev, ...selectUser}))
        } else {
            setInput((prev) => ({...prev}))
        }
    }, [selectUser])
    const formHandler = (e) => {
        e.preventDefault();
        saveUser(input);
        setInput({name: "", phone: "", city: ""});
    }

    const changeHandler = (e) => {
    const inputName = e.target.name;
    const inputVal = e.target.value;
    setInput({...input,  [inputName]: [inputVal]})
    }
    return (
        <form onSubmit={formHandler}>
                <Input name="name" placeholder="name" value={input.name} onChange={changeHandler}/>
                <br/>
                <Input name="phone" placeholder="phone" value={input.phone} onChange={changeHandler}/>
                <br/>
                <Input name="city" placeholder="city" value={input.city} onChange={changeHandler}/>
                <br/>
                <Button>Save</Button>
            </form>
    )
}

export default UserForm
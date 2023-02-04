import UserList from "./components/user/UserList";
import Container from "./components/layout/container/Container";
import { useState, useRef, useEffect } from "react";
import UserForm from "./components/user/user-form/UserForm";
import LightBox from "./components/layout/lightbox/LightBox";
import Button from "./components/layout/button/Button";
import Input from "./components/layout/input/Input"

// const persons = [
//     {id: 1, name: "remon", phone: "01226210", city: "cairo"},
//     {id: 2, name: "minass", phone: "0121168", city: "duabi"}
// ]

const App = () => {
    const [search, setSearch] = useState("");
    const [persons, setPersons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const res = await fetch("http://localhost:5000/users");
    //             const data = res.json()
    //             console.log(data)
    //         }
    //         catch (error) {

    //         }
    //     }
    //     fetchUsers();
    // }, [])
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch ("http://localhost:5000/users");
                const data = await res.json();
                console.log(data);
                setPersons([...data]);
                setIsLoading(false);
            }
            catch (error) {
                setIsLoading(false);
                alert("error from application");
            }
        }
        fetchUsers();
    }, [])
   const deleteUser = async (id) => {
    // console.log(item.id)
    setIsLoading(true);
    try {
        await fetch(`http://localhost:5000/users/${id}`, {
            method: "DELETE"
        });
        setPersons((prev) => prev.filter(el => el.id !== id));
        setIsLoading(false);
    }
    catch(error) {
        setIsLoading(false);
        alert("can't delete", error.message);
    }
    
   }
   const saveUser = async (data) => {
        // console.log(data);
        const userExist = persons.find(el => el.id === data.id);
        // edit user
        if (userExist) {
            setIsLoading(true);
            try{
                await fetch(`http://localhost:5000/users/${data.id}`, {
                    method: "PATCH",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                setPersons(persons.map(el => {
                    if (el.id === data.id) {
                        return {...data};
                    } else {
                        return el;
                    }
                }))
                setIsLoading(false);
            }
            catch(error) {
                setIsLoading(false);
                alert("can't inser user", error.message);
            }
            
            // insert user
        } else {
            setIsLoading(true);
            try {
               const res = await fetch ("http://localhost:5000/users", {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                const resData = await res.json();
                console.log(resData);
                setPersons((prev) => [...prev, resData])
                setIsLoading(false)
            }
            catch(error) {
                setIsLoading(false);
                alert("can't inser user", error.message);
            }
            
        }
        // console.log(persons);
        lightBoxHandler(false)
   }
   const [toggleLightBox, setToggleLightBox] = useState(false);

   const selectedUser = useRef();
   const personsFilter = 
    search.length > 0 ?
        persons.filter(el => el.name.includes(search) || el.city.includes(search)) : persons;
   
   const getUserDataHandler = (data) => {
    selectedUser.current = data;
    setToggleLightBox(true);
    // console.log(data);
    }
    const lightBoxHandler = (toggle) => {
        setToggleLightBox(toggle);
        
        if (!toggle) selectedUser.current = "";

    }
    return (
        <Container>
            <Input name="filter" placeholder="Search" value={search.name} onChange = {(e) => setSearch(e.target.value)} />
            <Button click={() => lightBoxHandler(true)}>Insert User</Button>
            {toggleLightBox ? <LightBox closeHandle={() => lightBoxHandler(false)}>
                <UserForm saveUser={saveUser} selectUser = {selectedUser.current}/>
            </LightBox> : null}
            {isLoading ? <div><p>Loading, please wait!</p></div> : <UserList persons={personsFilter} deleteUser={deleteUser} getUserDataHandler={getUserDataHandler}/>}
            
        </Container>
    )
}

export default App;
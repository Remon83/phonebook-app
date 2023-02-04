import UserCard from "../user/UserCard";

const UserList = ({persons, deleteUser, getUserDataHandler}) => {
    const personsHandler = persons.map(el => <UserCard key={el.id} item={el} deleteUser={deleteUser} getUserDataHandler = {getUserDataHandler}/>);
    return (<>{personsHandler}</>)
}

export default UserList;
import Button from "../layout/button/Button";

const UserCard = ({item, deleteUser, getUserDataHandler}) => {
    // console.log(item)
    return (
        <div className="userCard">
            <ul>
                <li style={{color: "blue"}}>{item.name}</li>
                <li>{item.phone}</li>
                <li>{item.city}</li>
            </ul>
            <div className="btnGrp">
                <Button click = {() => getUserDataHandler(item)}>Edit</Button>
                <Button click={() => deleteUser(item.id)} color="danger">Delete</Button>
            </div>
        </div>
        
    )
}

export default UserCard;
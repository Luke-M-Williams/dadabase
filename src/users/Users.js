import "./Users.css"

export const User = ({ users }) => {
 
    return (
        <div className="user">
            <div>
                <div className="user-info">Name</div>
                <div>{users.name}</div>
            </div>
            <div>
                <div className="user-info">Email</div>
                <div>{users.email}</div>
            </div>
        </div>

    )
}
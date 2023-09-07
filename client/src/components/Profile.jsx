import React, { useEffect, useState } from "react";
import EventList from "./EventList";
function Profile(props) {

    const [profile, setProfile] = useState(null);
    const [messeng, setMesseng] = useState("");

    useEffect(() => {
        let username = localStorage.getItem("username");
        if (props.username) {
            username = props.username;
        }
        fetch(`/api/users?username=${username}`)
            .then(user => user.json())
            .then(user => user[0])
            .then(user => setProfile(user))

    }, [props.username])

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        //console.log(Object.fromEntries(formData.entries()));

        const password = formData.get("password") === "" ? profile.password : formData.get("password");
        const fullName = formData.get("fullname") === "" ? profile.fullName : formData.get("fullname");
        const age = formData.get("age") === "" ? profile.age : formData.get("age");
        const picture = formData.get("picture") === "" ? profile.picture : formData.get("picture");

        fetch(`api/users/${profile._id}`,{
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "password": password,
                "fullName": fullName,
                "age": age,
                "picture": picture
            }), 
          })
          setMesseng("Profile has been changed");
    }

    return (
        profile && <>
            {props.isSetting ?
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            New Password: <input type="password" name="password" id="passwordField" />
                        </label>
                        <br />
                        <label>
                            Change Full Name: <input type="text" name="fullname" id="nameField" />
                        </label>

                        <br />
                        <label>
                            Change Age: <input type="number" name="age" id="ageField" />
                        </label>

                        <br />
                        <label>
                            Upload Profile Picture link: <input type="text" name="picture" id="pictureField" />
                        </label>
                        <br />
                        <button type="submit">Save</button>
                        <p>{messeng}</p>
                    </form>
                </div>
                :
                <>
                    <div className="profile">
                        <img src={profile.picture} />
                        <div>
                            <h1>Name: {profile.name}</h1>
                            <h3>Age: {profile.age}</h3>
                        </div>
                    </div>
                    <div className="profile-events">
                        <EventList eventId={profile.attending}></EventList>
                    </div>
                </>
            }
        </>

    )
}

export default Profile;
import React, { useEffect, useState } from "react";

function LoginPage(prop) {

    //true = register, false = login
    const [isRegister, setIsRegister] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        // formData's name is the key it can simply send the whole formData in body
        if (isRegister) {
            //console.log(formData.get("username"));
            const img = formData.get("picture") === "" ? "https://preserveyourestate.net/wp-content/uploads/2018/08/Non-profile.jpg" : formData.get("picture");
            //console.log(Object.fromEntries(formData.entries()));
            fetch('/api/register', {
                method: "post",
                body: JSON.stringify({
                    username: formData.get("username"),
                    password: formData.get("password"),
                    name: formData.get("fullname"),
                    age: formData.get("age"),
                    picture: img
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(respond => respond.json())
                .then(data => {
                    if(data){
                        setErrorMsg("Username taken.");
                    }
                    else{
                        setErrorMsg("Registration Success")
                    }
                })
        }
        else {
            fetch(`/api/login?password=${formData.get('password')}&username=${formData.get('username')}`)
                .then(result => result.json())
                .then(user => {
                    if (user.length > 0) {
                        localStorage.setItem("userId", user[0]._id);
                        localStorage.setItem("username", user[0].username);
                        localStorage.setItem("name", user[0].name.split(' ')[0]);
                        prop.handler();
                    }
                    else {
                        setErrorMsg("Username or Password is incorrect.");
                    }
                })
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <p>* is required</p>
                <label>
                    *Username: <input type="text" name="username" id="usernameField" required />
                </label>

                <br />
                <label>
                    *Password: <input type="password" name="password" id="passwordField" required />
                </label>

                {isRegister ?// On registation
                    <>
                        <br />
                        <label>
                            *Full Name: <input type="text" name="fullname" id="nameField" required />
                        </label>

                        <br />
                        <label>
                            Age: <input type="number" name="age" id="ageField" />
                        </label>

                        <br />
                        <label>
                            Profile Picture link: <input type="text" name="picture" id="pictureField" />
                        </label>
                        <br />
                        <button type="submit">Register</button>
                        <button onClick={() => setIsRegister(!isRegister)}>Go back</button>
                    </>
                    ://On login
                    <>
                        <br />
                        <button type="submit">Login</button>
                        <button onClick={() => setIsRegister(!isRegister)}>Dont have account? Click here!</button>
                    </>
                }
                <p>{errorMsg}</p>
            </form>
        </>
    )
}

export default LoginPage;
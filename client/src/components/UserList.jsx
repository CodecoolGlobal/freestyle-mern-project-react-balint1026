import { useEffect, useState } from "react";

let allUsers = [];

function UserList(props) {
  const [displayUsers, setDisplayUsers] = useState(allUsers);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('/api/users');
      const users = await response.json();
      allUsers = users;
      setDisplayUsers(users)
    }
    fetchUsers();
  }, []);

  function search(term, users) {
    const matches = [];

    for (const user of users) {
      const matchPercent = compareStrings(term, user.name) + compareStrings(term, user.username);
      if (matchPercent) {
        matches.push({
          match: matchPercent,
          user: user,
        });
      }
    }
    setDisplayUsers(sortCountry(matches));
  }

  function compareStrings(term, compareTo) {
    term = convertToTrigram(term);
    compareTo = convertToTrigram(compareTo);

    let matchesWithCompareTo = 0;
    term.forEach((termTrigram) => {
      if (compareTo.includes(termTrigram)) {
        matchesWithCompareTo++;
      }
    });
    return matchesWithCompareTo / term.length;
  }

  function convertToTrigram(str) {
    str = str.toLowerCase().split('');
    const trigram = [];
    for (let i = 0; i < str.length - 2; i++) {
      trigram.push(`${str[i]}${str[i + 1]}${str[i + 2]}`);
    }
    return trigram;
  }

  function sortCountry(params) {
    params.sort((a, b) => b.match - a.match);
    const result = [];

    for (let i = 0; i < params.length; i++) {
      result.push(params[i].user);
    }
    return result;
  }

  function handleUserSelection(username) {
    console.log(username);
  }

  function handleSearch(e) {
    if (e.target.value.length >= 3) {
      search(e.target.value, allUsers);
    } else {
      setDisplayUsers(allUsers);
    }
  }

  return (
    <div className="UserList">
      <input placeholder="Search" onInput={handleSearch} />
      <div>
        {displayUsers && displayUsers.map((user) => (
          <div key={user._id} onClick={() => { props.handler(user.username) }}>
            <img src={user.picture} />
            <span>{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}



export default UserList;

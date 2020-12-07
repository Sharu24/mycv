# Welcome to myCV

This is the backend API configuration - 

| Method | url                 |  request  | token      | description                                          |
| ------ | :------------------ | :-------: | ---------- | :--------------------------------------------------- |
| POST   | /user               |  {user}   | --         | Create a new user and send an email for verification |
| POST   | /user/login         |  {user}   | --         | User Login - validate and generate a token           |
| GET    | /user/:userName     |           | user-token | Get Basic User Data back                             |
| PUT    | /user               |  {user}   | user-token | To update the password for the user - signed route   |
| PUT    | /user/deactivate    |  {user}   | user-token | should validate with token , deactivate              |
| GET    | /user/verify/:token |           | --         | Update isVerified, active to true                    |
| POST   | /profile            | {profile} | user-token | To create a basic profile for the user               |
| GET    | /profile/:userName  |           | user-token | Fetch the user Profile                               |
| PUT    | /profile/:userName  | {profile} | user-token | Update User Profile                                  |


```javascript
// Create User
{
    "userName": "me",
    "email": "me@email.com",
    "password": "1234567",
    "termsAndConditions": true
}
// Login
{
    "userName": "me",
    "email": "me@email.com",
    "password": "1234567"
}
// Update Password
{
    "userName": "me",
    "password": "1234568"
}
// Inactivate User
{
    "userName": "me",
    "email": "me@email.com",
    "password": "1234567"
}
// Create Profile
{
    "userName": "me",
    "firstName": "I",
    "bio": "I am",
    "company": "mine",
    "availForHire": false
}
// Update a Profile 
{
    "techStack": ["codejs"],
    "social": [{"name":"facebook", "handle":"me"}, {"name":"linkedin","handle":"mine"}],
    "projects": [{"description":"Hello World", "role":"CEO", "durationInMonths": 2}],
    "blogs": ["www.me.in"],
    "achievements": ["I"],
    "userName": "me",
    "firstName": "I",
    "bio": "I am",
    "company": "mine"
}
```
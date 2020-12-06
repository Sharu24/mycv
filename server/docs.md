POST /user {user} , should create a token
POST /user/login {userName, email, password} , should create a token
GET /user/:userName
PUT /user/:userName {password} | should validate with token
PUT /user/deactivate {userName, email, password} | should validate with token , deactivate

GET /user/verify/:token {email link}
POST /user/verify/:token {isVerified, active}

POST /profile {profile}
GET /profile/:userName
PUT /profile/:userName {profile}

GET /users
DELETE /user [{userName}]

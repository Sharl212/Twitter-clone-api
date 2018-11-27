# Twitter Clone

This API is a simple representation of Twitter operations. built from scratch using Node.js, MongoDB.

## Installation

Use the package manager NPM to install the required node modules:

```bash
npm install
```
Then start the server :
```bash
node server.js
```
## Usage
**Register a new user**

send a **POST** request to :
```bash
http://localhost:4000/auth/register
```
Providing **username**, **email** , **password** :
```
 {
	"username":"sharl sherif",
	"email": "dev.sharl.sherif@gmail.com",
	"password": "123123"
 }
```

**Login**

send a **POST** request to :
```bash
http://localhost:4000/auth/login
```
Providing an **email** , **password** :
```
 {
	"email": "dev.sharl.sherif@gmail.com",
	"password": "123123"
 }
```

**Create/Delete a Tweet**

send a **POST** request to :
```bash
http://localhost:4000/api/tweet
```
Providing the tweet **content** :
```
{
	"content": "Hello World"
}
```

**DELETE** request to :

*Note : `id` being the `tweet id`*

```bash
 http://localhost:4000/api/tweet/:id
```

**Follow/unfollow other users**

send a **POST** request to :

Providing `id` as the `id` of the `user` you want to follow.

If the `user` is already being `followed` by you, the same request would `unfollow` them.

```bash
http://localhost:4000/api/tweet/:id
```
#### Example
```bash
http://localhost:4000/api/tweet/5bfaaad1ec658a2e984ccd4d
```
**Response**
```
[
    { /* the user you followed */
        "followers": [
          "5bfd6014d6df3b1174fd5643" /* your id is added to his followers list */
        ],
        "following": [],
        "_id": "5bfaaad1ec658a2e984ccd4d",
        "username": "user11",
        "email": "user11@gmail.com",
        "__v": 0
    },
    {
        "followers": [],
        "following": [
           "5bfaaad1ec658a2e984ccd4d" /* their id is added to your following list */
        ],
        "_id": "5bfd6014d6df3b1174fd5643",
        "username": "sharl sherif",
        "email": "dev.sharl.sherif@gmail.com",
        "__v": 0
    }
]
```
**User Timeline**

send a **GET** request to :
```bash
http://localhost:4000/api/timeline
```
The `Timeline` contains a mix of `user` , `followed users` Tweets.

### Response 
```
[
    {
        "_id": "5bfaaadcec658a2e984ccd4e", /* one of the followed users*/
        "owner": "5bfaaad1ec658a2e984ccd4d",
        "username": "Mike",
        "content": "Hello, I'm Mike and this is my awesome Tweet !",
        "createdAt": "November 25th 2018, 3:59 pm",
        "likes": [],
        "replies": [],
        "__v": 0
    },
    {
        "_id": "5bfaaadetv658a35984ccd4e",
        "owner": "5bfaauyt1ec6565ut4ccd4d",
        "username": "Mike",
        "content": "Hello World",
        "createdAt": "November 25th 2018, 3:59 pm",
        "likes": [],
        "replies": [],
        "__v": 0
    },
    {
        "_id": "5bf94b2eb655c8043c0ff74b", /* a personal Tweet made by the authenticated user */
        "owner": "5bf8727d74ce3a2b2877f0e0",
        "username": "sharl sherif",
        "content": "My first Tweet ever !!",
        "createdAt": "November 24th 2018, 2:59",
        "likes": [],
        "replies": [],
        "__v": 0
    },
    {
        "_id": "5bf94b456555383218bb0fe4",
        "owner": "5bf8727d74ce3a2b2877f0e0",
        "username": "sharl sherif",
        "content": "My second Tweet ever !!",
        "createdAt": "November 24th 2018, 2:59 pm",
        "likes": [],
        "replies": [],
        "__v": 0
    }
]
```

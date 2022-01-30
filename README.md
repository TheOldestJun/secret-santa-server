DAO - credits to Adam McQuistan Shuffle algorythm - credits to quag Everything else done by myself.
Sorry about React implementation - due to my current job, didn't manage to finish.
DOCUMENTATION
PLEASE READ THIS FIRST!
In order to work we have to delete this file /db/santa.db to leave this directory clean. I couldn't make gitignore to ignore the file, its deleting the whole dir. Because of that had to make new repo, with no commits((.

API:
/ - root router to check server is runnnig in visual HTML

/users/add: POST method to add players. Two params in request body in JSON {firstName, lastName}. Validation checks for only characters in names and length is not less than 3.

/users/:id DELETE methon for deleting user by his id in the url string.

/users/get/:id GET method for returning a candy receiver from database by santa ID

/users/:id GET user from DB by his id

/wishes/add: POST method to add players wush. Two params in request body in JSON {wish, userId}. Validation checks for the wish string be in between 3 and 100. Also checking that no more wishes were added after 10th wish.

/wishes/get/:id GET receiver wishes of from DB by senta ID

/wishes/:id/:userId DELETE wish from appropriate table with user ID.

/shuffle POST method to shuffle players - everyone gets his santa.

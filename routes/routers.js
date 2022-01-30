const { Router } = require("express");
const AppDAO = require("../sql/dao");
const { prepareIndexes, returnIndexes } = require("../helpers");
const validator = require('validator');

const dao = new AppDAO(process.env.SQLITE_URL);
const router = Router();

let Users = require("../sql/users");
let users = new Users(dao);

let Wishes = require("../sql/wishes");
let wishes = new Wishes(dao);

let Santas = require("../sql/santas");
let santas = new Santas(dao);

const start = async () => {
  await users.createTable();
};


start();

// check route
router.route("/").get((req, res) => {
  res.send("Welcome to the santas application!");
});
//users routes
router.route("/users/add").post(async (req, res) => {
  const { firstName, lastName } = req.body;
  if(!validator.isAlpha(firstName) || !validator.isLength(firstName, {min: 3})){
    return res.status(400).json('Name must contain only letters and be at least 3 characters long')
  }
  if(!validator.isAlpha(lastName) || !validator.isLength(lastName, {min: 3})){
    return res.status(400).json('Surname must contain only letters and be at least 3 characters long')
  }
  const data = await users.createUser(firstName, lastName);
  await wishes.createTable(data.id);
  return res.json("User and table of wishes created!");
});

router.route("/users/:id").delete(async (req, res) => {
  users.deleteUser(req.params.id);
});

//wishes routes
router.route("/wishes/add").post(async (req, res) => {
  const { wish, userId } = req.body;
  if(!validator.isLength(wish, {min: 3, max: 100})){
    return res.status(400).json('Your wish must be in between 3 and 100 characters')
  }
  const data = await wishes.createWish(wish, userId);
  if (data.id <= 10) {
    return res.json("Wish added");
  } else {
    await wishes.deleteWish(data.id, userId);
    return res.json(
      "Sorry you can not have more than 10 wishes. Have some conscience!"
    );
  }
});

router.route('users/:id').get(async (req, res)=>{
  let id = req.params.id;
  return res.json(await users.getById(id))
})

router.route("/users/get/:id").get(async (req, res) => {
  const userId = req.params.id;
  const receiverIdObj = await santas.returnReveicer(userId);
  const receiverId = receiverIdObj.receiver_id;
  res.json(await users.getById(receiverId));
});

router.route("/wishes/get/:id").get(async (req, res) => {
  const userId = req.params.id;
  const receiverIdObj = await santas.returnReveicer(userId);
  const receiverId = receiverIdObj.receiver_id;
  res.json(await wishes.getWishesByUserId(receiverId));
});

router.route("/wishes/:id/:userId").delete(async (req, res) => {
  await wishes.deleteWish(req.params.id, req.params.userId);
  return res.json("Wish deleted");
});
//shuffle route as is in assignment
router.route("/shuffle").post(async (req, res) => {
  const usersCountObject = await users.count();
  const usersCount = usersCountObject["COUNT (*)"];

  if (usersCount < 3) {
    return res.json(
      "Can't shuffle users. Try again, when player will be 3 or more"
    );
  } else {
    await santas.createTable();
    console.log("Table santas created.");
    //let's do some magic
    let clauses = prepareIndexes(usersCount);
    let happies = clauses.slice();
    const playersIds = returnIndexes(clauses, happies);
    for (let id of playersIds) {
      await santas.createChains(id[0] + 1, id[1] + 1); // add 1 'cos used array and array starts from 0
    }
  }
  for (let i = 1; i <= usersCount; i++) {
    let reciverObject = await santas.returnReveicer(i);
    let happyOne = reciverObject.receiver_id;
    console.log(happyOne);
    await users.addSantaForId(i, happyOne);
  }
  return res.json("Shuffeling finished.");
});

// for development purposes only!!!
router.route("/tables/:id").delete(async (req, res) => {
  await wishes.dropTable(req.params.id);
  return res.json(`Table for user${req.params.id} wishes deleted`);
});

module.exports = router;

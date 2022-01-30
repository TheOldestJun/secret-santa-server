const prepareIndexes = (count) => {
  let givers = [];

  for (let i = 0; i < count; i++) {
    givers.push(i);
  }
  return givers;
};

const selectPlayers = (givers = [], receivers = []) => {
  let id = givers[0];
  let idIndex = receivers.indexOf(id);
  if (idIndex >= 0) receivers.splice(idIndex, 1);
  let recepient = Math.floor(Math.random() * receivers.length);
  let recepientId = receivers[recepient];
  receivers.splice(recepient, 1);
  givers.splice(0, 1);
  if (idIndex >= 0) receivers.push(id);
  return [id, recepientId];
};

const returnIndexes = (givers = [], receivers = []) => {
  let ids = [];
  while (givers.length != 0) {
    ids.push(selectPlayers(givers, receivers));
  }
  return ids;
};

module.exports = { prepareIndexes, returnIndexes };

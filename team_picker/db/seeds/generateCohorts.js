const faker = require("faker");
let index = 0;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const createListOfNames = () => {
  const nameList = [];
  const MAX_SIZE = randomIntFromInterval(5, 20);
  for (let i = 0; i < MAX_SIZE; i++) {
    nameList.push(faker.name.firstName());
  }
  return nameList;
};

exports.seed = function (knex) {
  const ARRAY_LENGTH = 12;
  return (
    knex("cohorts")
      .del()
      .then(function () {
        const cohorts = Array.from({ length: ARRAY_LENGTH }).map(() => {
          index += 1;
          listOfNames = createListOfNames();
          return {
            name: faker.company.catchPhrase(),
            members: listOfNames.join(", "),
            logo_url: faker.image.imageUrl(),
          };
        });        
        return knex("cohorts").insert(cohorts);
      })
  );
};

function buildTeamsForTeamCount(arr, numOfTeam) {
  const totalMembers = arr.length;
  const memberPerTeam = Math.floor(totalMembers / numOfTeam);
  let teams = [];
  teams = buildArrayOfNames(arr, numOfTeam, memberPerTeam);
  return teams;
}

function buildTeamsForMemberPerTeam(arr, memberPerTeam) {
  let teams = [];
  let numOfTeam = Math.floor(arr.length / memberPerTeam);
  teams = buildArrayOfNames(arr, numOfTeam, memberPerTeam);
  return teams;
}

function buildArrayOfNames(arr, numOfTeam, memberPerTeam) {
  let isItOdd = arr.length % memberPerTeam;  
  let teams = [];
  for (let i = 1; i <= numOfTeam; i++) {
    let end = i * memberPerTeam;
    let start = end - memberPerTeam;
    let aLineOfNames = "";
    for (let index = start; index < end; index++) {
      console.log(`start ${start} end ${end}`)   
      if (index !== end - 1) {
        aLineOfNames += arr[index] + ", ";
      } else {
        aLineOfNames += arr[index];
      }
    }
    if (isItOdd && i === numOfTeam) {
        aLineOfNames += ", " + arr[arr.length -1];
    }
   
    teams.push(aLineOfNames);
  }
  return teams;
}

module.exports = {
  buildTeamsForTeamCount,
  buildTeamsForMemberPerTeam,
};

// let arr = [
//   "jim",
//   "tim",
//   "jen",
//   "ming",
//   "linh",
//   "abby",
//   "linda",
//   "tara",
//   "sussie",
//   "liz",
//   "mark",
//   "greg",
//   "mary"
// ];
// let numOfTeam = 3;
// let memberPerTeam = 4;
//console.log(buildTeamsForTeamCount(arr, numOfTeam));
//console.log(buildTeamsForMemberPerTeam(arr, memberPerTeam));
//console.log(buildArrayOfNames(arr, numOfTeam, memberPerTeam));

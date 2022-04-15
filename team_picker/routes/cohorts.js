const cohortsUtility = require("../cohortsUtility");
const express = require("express");
const knex = require("../db/client");
const reshapeCohortMember = require("../cohortsUtility");
const router = express.Router();

router.get("/", function (req, res) {
  knex("cohorts").then((cohorts) => {
    //let reshapedCohort = reshapeCohortMember(cohorts); // re-shaping data to a better format for the UI
    res.render("cohorts/index", { cohorts: cohorts });
  });
});

// render new cohort form
router.get("/new", function (req, res) {
  const message = req.flash("message");
  res.render("./cohorts/new", { message });
});

//-----------Create a new cohort--------------------------------->
router.post("/", (req, res) => {
  knex("cohorts")
    .insert({
      name: req.body.name,
      logo_url: req.body.logo_url,
      members: req.body.members,
    })
    .returning("*")
    .then((cohorts) => {
      //knex usually returns an array of objects
      //so we use posts[0] to make sure we grab the object we want
      const cohort = cohorts[0];
      req.flash("message", "Record created");
      res.redirect(`/cohorts/${cohort.id}`);
    });
});

router.get("/:id", (req, res) => {
  //localhost:3000/cohorts/:id
  knex("cohorts")
    .where("id", req.params.id)
    .first() //this will grab the first instance that matches the requirements
    .then((cohort) => {
      if (!cohort) {
        res.send("No cohort found");
      } else {
        res.render("cohorts/show", { cohort: cohort });
      }
    });
});

router.get("/:id/assign", (req, res) => {
  const { methodChoice, quantity } = req.query;
  console.log(`choice ${methodChoice} qty ${quantity}`);
  knex("cohorts")
    .where("id", req.params.id)
    .first()
    .then((cohort) => {
      if (!cohort) {
        res.send("No cohort found");
      } else {
        if (methodChoice === "Team Count") {
          teams = cohortsUtility.buildTeamsForTeamCount(
            cohort.members.split(","),
            quantity
          );
          console.log(teams);
        }

        if (methodChoice === "Number Per Team") {
          teams = cohortsUtility.buildTeamsForMemberPerTeam(
            cohort.members.split(","),
            quantity
          );
          console.log(teams);
        }

        res.render("cohorts/assign", {
          cohort: cohort,
          teams: teams,
        });
      }
    });
});

router.get("/:id/edit", (req, res) => {
  knex("cohorts")
    .where("id", req.params.id)
    .first()
    .then((cohort) => {
      if (!cohort) {
        res.send("No cohort found");
      } else {
        res.render("cohorts/edit", { cohort: cohort });
      }
    });
});

router.patch("/:id", (req, res) => {
  console.log("request body ", req.body);
  console.log("request params ", req.params.id);
  knex("cohorts")
    .where("id", req.params.id)
    .update({
      name: req.body.name,
      logo_url: req.body.logo_url,
      members: req.body.members,
    })
    .returning("*")
    .then((record) => {
      console.log(record);
      res.redirect(`/cohorts/${req.params.id}`);
    });
});

router.delete("/:id", (req, res) => {
  knex("cohorts")
    .where("id", req.params.id)
    .del()
    .then(() => {
      res.redirect("/cohorts");
    });
});

module.exports = router;

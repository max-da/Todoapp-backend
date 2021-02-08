const express = require("express");
const router = express.Router();
const Todo = require("../models/todoSchema");

router.get("/", async (req, res) => {
  const page = +req.query.page || 1;
  const sorted = +req.query.sorted || 1;

  try {
    const totaldata = await Todo.find().countDocuments();

    const dataPerPage = 2;
    const dataToShow = page + page;
    const data = await Todo.find().limit(dataToShow).sort({ date: sorted });

    res.render("index.ejs", {
      totaldata,
      dataPerPage,
      page,
      removeLink: "",
      dataToShow,
      data,
      todoEdit: "",
      error: "",
    });
  } catch (err) {
    console.log(err);
  }
});


router.get("/addData", async (req, res) => {
  res.render("add.ejs", { removeLink: 1 });
});



router.post("/addData", async (req, res) => {
  console.log(req.headers.referer + "adasds");
  const page = +req.query.page || 1;
  const sorted = +req.query.sorted || 1;
  console.log(req.body.name);
  try {
    await new Todo({
      name: req.body.name,
    }).save();
  } catch (err) {
    console.log(err);
    const error = "Your todo is too short or too long";

    const totaldata = await Todo.find().countDocuments();

    const dataPerPage = 2;
    const dataToShow = page + page;
    const data = await Todo.find().limit(dataToShow).sort({ name: sorted });

    res.render("index.ejs", {
      data: data,
      error: error,
      todoEdit: "",
      totaldata: totaldata,
      dataPerPage: dataPerPage,
      removeLink: 1,
      page: "",
      dataToShow: dataToShow,
    });
  }
  res.redirect("/");
});

router.get("/delete/:id", async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id });
  res.redirect(req.headers.referer);
});

router.get("/edit/:id", async (req, res) => {
  try {
    const todoEdit = await Todo.findOne({ _id: req.params.id });
    let error = "";
    const editReferer = req.headers.referer;
    console.log(editReferer + " " + "/edit:id");
    const data = await Todo.find();

    res.render("index.ejs", {
      todoEdit: todoEdit,
      error: error,
      data: data,
      totaldata: "",
      dataPerPage: "",
      editReferer: editReferer,
      removeLink: 1,
      totalDataPart: "",
      dataToShow: "",
    });
  } catch (err) {
    console.log(err);
    const error = "Please enter a todo before submitting";
    const data = await Todo.find();
    res.render("index.ejs", {
      data: data,
      error: error,
      totaldata: "",
      dataPerPage: "",
      totalDataPart: "",
      dataToShow: "",
    });
  }
});

router.post("/edit", async (req, res) => {
  console.log(req.body.editRef);

  try {
    await Todo.updateOne(
      { _id: req.body.id },
      {
        name: req.body.name,
      },
      { runValidators: true }
    );
  } catch (err) {
    console.log(err);

    const error = "Please finish editing todo before submitting";
    const data = await Todo.find();
    const todoEdit = "";
    res.render("index.ejs", {
      data: data,
      error: error,
      todoEdit: todoEdit,
      totaldata: "",
      dataPerPage: "",
      totalDataPart: "",
      dataToShow: "",
      data: "",
    });
  }

  res.redirect(req.body.editRef);
});

module.exports = router;

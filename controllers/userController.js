const fs = require("fs");
const users = JSON.parse(fs.readFileSync("./dev-data/data/users.json"));

exports.getAllUser = (req, res) => {
  try {
    res.status(200).json({
      status: "sucess",
      results: users.length,
      users: {
        users,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getUser = (req, res) => {
  try {
    const id = req.params.id;
    const user = users.find((user) => user._id === id);
    res.status(200).json({
      status: "success",
      user: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.createUser = (req, res) => {
  try {
    const id = users[users.length - 1]._id + 1;
    const newUser = Object.assign({ _id: id }, req.body);
    users.push(newUser);
    fs.writeFile("./dev-data/data/users.json", JSON.stringify(users), (err) => {
      res.status(201).json({
        status: "success",
        results: newUser.length,
        user: {
          user: newUser,
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateUser = (req, res) => {
  try {
    const userIndex = users.findIndex((user) => user._id == req.params.id);

    if (userIndex != -1) {
      users[userIndex].name = req.body.name;
      users[userIndex].email = req.body.email;
      users[userIndex].role = req.body.role;
      users[userIndex].active = req.body.active;
    }

    fs.writeFile("./dev-data/data/users.json", JSON.stringify(users), (err) => {
      res.status(200).json({
        status: "success",
        user: {
          user: users[userIndex],
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteUser = (req, res) => {
  try {
    const deleteUserIndex = users.findIndex(
      (user) => user._id === req.params.id
    );
    users.splice(deleteUserIndex, 1);
    fs.writeFile("./dev-data/data/users.json", JSON.stringify(users), (err) => {
      res.status(200).json({
        message: "delete User successfully",
      });
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

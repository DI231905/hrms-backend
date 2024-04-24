const db = require("../models/index");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");
const User = db.user;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const moment = require("moment");
const e = require("cors");
const fs = require("fs");
const path = require("path");

exports.addUser = async (req, res) => {
  console.log(req.body, "req", req.files);
  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ name: req.body.userName }, { Email: req.body.email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        errMessage: "Name or Email or cardId is already in use.",
        status: false,
      });
    }

    const newUser = await User.create({
      name: req.body.userName,
      Email: req.body.email,
      cardId: req.body.cardId,
      BirthDate: req.body.birthDate,
      JoinDate: req.body.joinDate,
      ReLievingDate: req.body.ReLievingDate,
      mobileno: req.body.mobileNo,
      altmobileno: req.body.altMobileNo,
      parentmobileno: req.body.parentMobileNo,
      reportingOfficer: req.body.reportingOfficer,
      leaveApprovalRights: req.body.leaveApprovalRights ? 1 : 0,
      designationId: parseInt(req.body.designationId),
      pms_admin: req.body.pmsAdmin ? 1 : 0,
      dontSendTimeMail: req.body.dontSendTimeMail ? 1 : 0,
      archive: req.body.archive ? 1 : 0,
      Password: bcrypt.hashSync(req.body.password, 8),
      Role: "user",
      Status: "active",
    });

    const userId = newUser.id;
   
    console.log(req.files)

    if (req.files) {
      if (!fs.existsSync(`./uploads/profile/${userId}`)) {
        fs.mkdirSync(`./uploads/profile/${userId}`, { recursive: true });
      }

      await fs.readdir(`./uploads/profile/${userId}`, (err, files) => {
        if (err) {
          return res.status(500).send(err);
        }
        if (files[0]) {
          fs.unlink(`./uploads/profile/${userId}/${files[0]}`, (data, err) => {
            if (err) {
              return res.status(500).send(err);
            }
          });
        }
        req.files.filename.mv(
          `./uploads/profile/${userId}/${req.files.filename.name}`,
          (data, err) => {
            if (err) {
              return res.status(500).send(err);
            }
          }
        );
      });
    }else{

    }

    // Update the user record with the profile picture path
    await newUser.update({ profilePicture: req.files.filename.name });

    res.json({ response: "successfully added!", status: true });
  } catch (error) {
    console.error("Error occurred while adding user:", error);
    res
      .status(500)
      .json({ errMessage: "Internal Server Error", status: false });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        Email: req.body.Email,
      },
      raw: true,
      nest: true,
    });

    if (!user) {
      return res.status(404).send({ error: "User not found." });
    }

    const isValidPassword = bcrypt.compareSync(
      req.body.Password,
      user.Password
    );

    if (!isValidPassword) {
      return res.status(401).send({ error: "Invalid password!" });
    }

    const token = jwt.sign(
      {
        Email: req.body.Email,
        name: user.name,
        Role: user.Role,
        id: user.id,
        PMS_Admin: user.pms_admin,
        profile_image: user.profile_image,
      },
      authConfig.secret,
      { expiresIn: 86400 }
    );

    let userData = {
      ...user,
      profile_image: user.profile_image,
    };

    res.status(200).send({
      token,
      user: userData,
      message: "Successfully logged in",
    });
  } catch (error) {
    console.error("Error occurred while verifying user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getChildren = async (parentId, childData) => {
  try {
    let users = await User.findAll({
      where: {
        reportingOfficer: parentId,
      },
      raw: true,
      nest: true,
    });

    if (users && users.length > 0) {
      for (const user of users) {
        childData.push(user);
        await getChildren(user.id, childData);
      }
    }
    return childData;
  } catch (error) {
    console.error("Error occurred while fetching children:", error);
    return childData;
  }
};

exports.getUser = async (req, res) => {
  try {
    let users = await User.findAll({
      where: {
        Role: "user",
      },
      raw: true,
      nest: true,
    });
    console.log(users);
    if (users) {
      res.status(200).send({
        user: users,
      });
    } else {
      res.status(200).send({
        user: [],
        message: "No user Found",
      });
    }
    //   User.findAll({
    //     where: {
    //         Role: "user",
    //         name: { [Op.like]: `%${req.query.searchByName}%` },
    //         Email: { [Op.like]: `%${req.query.searchByEmail}%` },
    //     },
    //     order:
    //         req.query.orderBy === "ACC"
    //             ? [req.query.sortBy]
    //             : [[req.query.sortBy, "desc"]],
    //     raw: true,
    //     nest: true,
    // })
    //     .then((user) => {
    //         res.send(user);
    //     })
    //     .catch((e) => console.log(e));
  } catch (error) {
    console.log(error, "error");
  }
};

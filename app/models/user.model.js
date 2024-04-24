module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
    },
    Email: {
      type: Sequelize.STRING,
    },
    Password: {
      type: Sequelize.STRING,
    },
    BirthDate: {
      type: Sequelize.DATEONLY,
    },
    JoinDate: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    ReLievingDate: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    mobileno: {
      type: Sequelize.STRING,
    },
    altmobileno: {
      type: Sequelize.STRING,
    },
    parentmobileno: {
      type: Sequelize.STRING,
    },
    reportingOfficer: {
      type: Sequelize.INTEGER,
    },
    leaveApprovalRights: {
      type: Sequelize.BOOLEAN,
    },
    Role: {
      type: Sequelize.STRING,
    },
    Status: {
      type: Sequelize.STRING,
    },
    designationId: {
      type: Sequelize.INTEGER,
    },
    pms_admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
    },
    dontSendTimeMail: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
    },
    security_code: {
      type: Sequelize.STRING,
    },
    profile_image: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    archive: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
    },
  });

  return User;
};

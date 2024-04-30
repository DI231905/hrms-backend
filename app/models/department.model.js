module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define("department", {
    DepartmentName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    CreatedBy: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    UpdateddBy: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Department;
};

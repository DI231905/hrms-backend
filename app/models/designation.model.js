module.exports = (sequelize, Sequelize) => {
  const Designation = sequelize.define("designation", {
    DesignationTypeName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    DepartmentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
  return Designation;
};

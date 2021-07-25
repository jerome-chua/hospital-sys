export default function initAppointmentModel(sequelize, DataTypes) {
  return sequelize.define('appointment', {
     id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      patientId: {
        references: {
          model: 'patients',
          key: 'id',
        },
        type: DataTypes.INTEGER,
      },
      doctorId: {
        references: {
          model: 'doctors',
          key: 'id',
        },
        type: DataTypes.INTEGER,
      },
      startDatetime: {
        type: DataTypes.DATE,
      },
      endDatetime: {
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
  }, { underscored: true});
}
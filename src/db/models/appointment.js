import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Split extends Model {
    /**
     *
     */
    static associate() {}
  }

  Split.init(
    {
      patient_id: {
        type: DataTypes.INTEGER,
      },
      doctor_id: {
        type: DataTypes.INTEGER,
      },
      appointment_date: {
        type: DataTypes.DATE,
      },
      appointment_duration: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Appointment',
      tableName: 'appointment',
      underscored: true,
      timestamps: true,
    },
  );
  return Split;
};

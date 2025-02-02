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
      user_id: {
        type: DataTypes.INTEGER,
      },
      medical_history: {
        type: DataTypes.TEXT('medium'),
      },
    },
    {
      sequelize,
      modelName: 'Patient',
      tableName: 'patient',
      underscored: true,
      timestamps: true,
    },
  );
  return Split;
};

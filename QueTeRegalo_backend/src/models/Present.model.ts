// src/models/Present.model.ts
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./User.model";
import Category from "./Category.model";

export enum PresentOption {
  DESEABLE = "deseable",
  EVITABLE = "evitable",
}

@Table({
  tableName: "presents",
})
class Present extends Model {
  @ForeignKey(() => User)
  @Column
  declare userId: number;

  @ForeignKey(() => Category)
  @Column
  declare categoryId: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.ENUM(...Object.values(PresentOption)),
    allowNull: false,
  })
  declare option: PresentOption;

  @BelongsTo(() => Category)
  declare category?: Category;
}

export default Present;

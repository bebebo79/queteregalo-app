import {
  Table,
  Column,
  Model,
  DataType,
  HasMany
} from "sequelize-typescript";
import Present from "./Present.model";

@Table({
  tableName: "categories"
})
class Category extends Model {
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  declare name: string;

  @HasMany(() => Present)
  declare presents?: Present[];
}

export default Category;

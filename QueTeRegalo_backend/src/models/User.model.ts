import { AllowNull, Column, DataType, Default, ForeignKey, HasOne, Model,  PrimaryKey,  Table } from "sequelize-typescript";
import Token from "./Token.model";
import Profile from "./Profile.model";




@Table({
    tableName : "users"
})


class User extends Model {
    @PrimaryKey
     @Column({ type: DataType.INTEGER, autoIncrement: true })
     declare  id: number;
  
    @Column({type : DataType.STRING(100)})
    declare name : string

    @Column({type : DataType.STRING(30)})
    declare email : string

    @Column({type : DataType.STRING(100)})
    declare password : string

    @Column({type : DataType.BOOLEAN, allowNull: false, defaultValue: false})
    
    declare confirmed : boolean
    
    @HasOne(() => Profile)
    declare profile: Profile;

    @HasOne(()=> Token)
    declare tokens : Token[]

    

}


export default User
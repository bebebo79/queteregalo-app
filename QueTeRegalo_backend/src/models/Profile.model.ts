import { BelongsTo, Column, DataType, Default, ForeignKey, Model,  Table } from "sequelize-typescript";
import User from "./User.model";



@Table({
    tableName : "profiles"
})


class Profile extends Model {
    @ForeignKey(()=> User)
    
    @Column
    declare userId: number;

    @BelongsTo(() => User)
    declare user?: User;

    @Column({type : DataType.STRING(5)})
    declare shirtSize : string

    @Column({type: DataType.STRING(5)})
    declare pantSize : string

    @Column({type : DataType.STRING(5)})
    declare shoeSize : string

    

}


export default Profile
import { Column, DataType, Table, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Sequelize } from "sequelize";
import User from "./User.model";

@Table({
    tableName: "tokens",
    timestamps: true
})
class Token extends Model {

    @Column({
        type: DataType.STRING(250),
        allowNull: false,
    })
    declare token: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare userId: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(`NOW() + INTERVAL '10 minutes'`)
    })
    declare expiresAt: Date;

    @BelongsTo(() => User)
    declare user: User;
}

export default Token;

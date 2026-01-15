import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModel from "./customer.model.js";
import OrderItemModel from "./order-item.model.js";

@Table({ tableName: "orders", timestamps: false })
export default class OrderModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => CustomerModel)
    @Column({ allowNull: false })
    declare customer_id: string;

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    @HasMany(() => OrderItemModel, { foreignKey: "order_id", as: "items" })
    declare items: OrderItemModel[];

    @Column({ allowNull: false })
    declare total: number;
}
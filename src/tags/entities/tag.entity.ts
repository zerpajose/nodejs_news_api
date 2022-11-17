import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Tag extends Model {
  @Column(DataType.STRING)
  tag: string;

  @Column(DataType.INTEGER)
  post_id: number;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;
}

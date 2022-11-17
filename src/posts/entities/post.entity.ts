import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Post extends Model {
  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  url: string;

  @Column(DataType.STRING)
  author: string;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;
}

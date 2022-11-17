import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Post extends Model {
  @Column
  title: string;

  @Column
  url: string;

  @Column
  author: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}

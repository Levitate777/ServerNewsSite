import { Table, Column, Model, HasMany } from 'sequelize-typescript';

import { Post } from './post.model';

@Table({
  tableName: 'Users',
  timestamps: true,
  underscored: true,
})
export class User extends Model {
  @Column({
    allowNull: false,
    unique: true,
  })
  login: string;

  @Column({
    allowNull: false,
  })
  password: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    allowNull: true,
  })
  avatar: string;

  @HasMany(() => Post)
  posts: Post[];
}

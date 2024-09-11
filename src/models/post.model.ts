import {
  Table,
  Column,
  Model,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

import { Tag } from './tag.model';
import { TagPost } from './tag-post.model';
import { User } from './user.model';

@Table({
  tableName: 'Posts',
  timestamps: true,
  underscored: true,
})
export class Post extends Model {
  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  userId: number;

  @Column({
    allowNull: false,
  })
  header: string;

  @Column({
    allowNull: false,
  })
  description: string;

  @Column({
    allowNull: false,
  })
  image: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Tag, () => TagPost)
  tags: Tag[];
}

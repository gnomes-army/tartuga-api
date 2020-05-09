import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: false })
  familyName: string;

  @Column({ nullable: false })
  givenName: string;

  @Column({ nullable: false })
  provider: string;

  @Column()
  photo: string;
}

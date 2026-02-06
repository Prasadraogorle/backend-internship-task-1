import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  // For local authentication (nullable for Google users)
  @Column({ nullable: true })
  password: string;

  // Google OAuth ID
  @Column({ nullable: true })
  googleId: string;

  // User display name (from Google or manual)
  @Column({ nullable: true })
  name: string;

  // Role: PATIENT or DOCTOR
  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: true,
  })
  role: UserRole;
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { UsersModule } from './users/users.module'; // ✅ ADD THIS

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'hello_world_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    DoctorModule,
    PatientModule,
    UsersModule, // ✅ ADD THIS
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

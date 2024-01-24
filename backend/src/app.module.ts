import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CoHeaderModule } from './integrations/m3_integration/co_header/co_header.module';
import { SmvChangeModule } from './integrations/m3_integration/smv_change/smv_change.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      name: 'promis-legacy',
      type: 'mssql',
      host: process.env.MSSQL_HOST,
      port: parseInt(<string>process.env.MSSQL_PORT),
      username: process.env.MSSQL_USER,
      password: process.env.MSSQL_PASSWORD,
      database: process.env.MSSQL_DATABASE,
      connectionTimeout: 360000,
      requestTimeout: 360000,
      autoLoadEntities: true,
      synchronize: false,
      options: {
        cryptoCredentialsDetails: {
          minVersion: 'TLSv1',
        },
        encrypt: false,
      },
    }),

    TypeOrmModule.forRoot({
      name: 'promis-cdc',
      type: 'mssql',
      host: process.env.MSSQL_HOST2,
      port: parseInt(<string>process.env.MSSQL_PORT2),
      username: process.env.MSSQL_USER2,
      password: process.env.MSSQL_PASSWORD2,
      database: process.env.MSSQL_DATABASE2,
      connectionTimeout: 360000,
      requestTimeout: 360000,
      autoLoadEntities: true,
      synchronize: false,
      options: {
        cryptoCredentialsDetails: {
          minVersion: 'TLSv1',
        },
        encrypt: false,
      },
    }),
    CoHeaderModule,
    SmvChangeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

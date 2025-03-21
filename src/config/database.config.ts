import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const configDB: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'test',
  synchronize: true,
  autoLoadEntities: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [],
}
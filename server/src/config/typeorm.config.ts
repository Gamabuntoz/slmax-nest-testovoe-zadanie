import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (): TypeOrmModuleOptions => ({
  type: 'postgres',
  url: process.env.DB_URL,
  autoLoadEntities: true,
  synchronize: process.env.DB_SYNC === 'true',
});

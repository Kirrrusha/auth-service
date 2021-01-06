import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'auth_db',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'auth_db',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
};

import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

export const configModule = ConfigModule.forRoot({
    load: [configuration],
});

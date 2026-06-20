// config/logger/logger-config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule], // Make sure ConfigModule is imported here!
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get('NODE_ENV') === 'production';

        return {
          pinoHttp: {
            transport: isProduction
              ? {
                  // Production: Send logs to Loki (Great for Docker/Kubernetes)
                  target: 'pino-loki',
                  options: {
                    host: configService.getOrThrow<string>('LOKI_URL'),
                    labels: { app: 'my-clean-app', env: 'production' },
                    batching: true,
                    interval: 5,
                  },
                }
              : {
                  // Local Development: Pretty print in your terminal
                  target: 'pino-pretty',
                  options: { singleLine: true, colorize: true },
                },
          },
        };
      },
    }),
  ],
  exports: [LoggerModule], // Export it so the rest of the app can use it
})
export class LoggerConfigModule {}

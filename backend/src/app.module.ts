import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database.module";
import { ScenarioModule } from "./scenario/scenario.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ScenarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

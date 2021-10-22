import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobResource, JobSchema } from 'src/Schemas/jobresource.schema';
import { JobResourceController } from './jobresource.controller';
import { JobService } from './jobresource.service';

@Module({
    imports: [MongooseModule.forFeature([{name: JobResource.name, schema:JobSchema}])],
    controllers: [JobResourceController],
    providers: [JobService]
})
export class JobModule {}

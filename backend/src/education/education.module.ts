import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EducationResource, EducationSchema } from 'src/Schema/educationresource.schema';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';

@Module({
    imports: [MongooseModule.forFeature([{name:EducationResource.name, schema:EducationSchema}])],
    controllers: [EducationController],
    providers: [EducationService]
})
export class EducationModule {}

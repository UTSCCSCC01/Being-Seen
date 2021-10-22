import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Service } from "./service.schema";

export type JobResourceDocument = JobResource & Document
@Schema()
export class JobResource extends Service{
    @Prop({default:""})
    website:string
    @Prop({default:""})
    email:string
    @Prop({default:""})
    phoneNumber:string
    @Prop({default:""})
    address:string
    @Prop({default:""})
    postalCode:string
    @Prop({default:""})
    picture:string
}

export const JobSchema = SchemaFactory.createForClass(JobResource);
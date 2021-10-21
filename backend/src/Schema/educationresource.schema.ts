import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Service } from "./service.schema";

export type EducationResourceDocument = EducationResource & Document
@Schema()
export class EducationResource extends Service{
    @Prop({default:""})
    website:string
    @Prop({default:""})
    email:string
    @Prop({default:""})
    phoneNumber:string
}

export const EducationSchema = SchemaFactory.createForClass(EducationResource);
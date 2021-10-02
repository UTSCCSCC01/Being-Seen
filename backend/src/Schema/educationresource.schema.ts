import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type EducationResourceDocument = EducationResource & Document
@Schema()
export class EducationResource{
    @Prop({default:""})
    website:string
    @Prop({default:""})
    email:string
    @Prop({default:""})
    phoneNumber:string
}

export const EducationSchema = SchemaFactory.createForClass(EducationResource);
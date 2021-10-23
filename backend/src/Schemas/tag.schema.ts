import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"

export type TagDocument = Tag & Document
@Schema()
export class Tag{
    @Prop()
    id:string
    @Prop({required:true})
    tagName:string
}
export const TagSchema = SchemaFactory.createForClass(Tag);




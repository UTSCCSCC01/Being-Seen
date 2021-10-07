import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"

@Schema()
export class Tag extends mongoose.Document{
    @Prop()
    id:string
    @Prop({required:true})
    tagName:string
}

export const TagSchema = SchemaFactory.createForClass(Tag);




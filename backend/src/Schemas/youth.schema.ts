//Temporary schema for youths
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"

@Schema()
export class Youth extends mongoose.Document{
    @Prop()
    id:string
    @Prop()
    name:string
}

export const YouthSchema = SchemaFactory.createForClass(Youth);
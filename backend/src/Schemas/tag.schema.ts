import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"

@Schema()
export class Tag extends mongoose.Document{
    @Prop()
    tagId:mongoose.Schema.Types.ObjectId
}

export const TagSchema = SchemaFactory.createForClass(Tag);




import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"
import { Youth } from "src/objects/Youth";

@Schema()
export class Review extends mongoose.Document{
    @Prop()
    reviewer: mongoose.Schema.Types.ObjectId
    @Prop()
    content:string
    @Prop()
    rating:number
    @Prop()
    date:Date
    
}
export const ReviewSchema = SchemaFactory.createForClass(Review);
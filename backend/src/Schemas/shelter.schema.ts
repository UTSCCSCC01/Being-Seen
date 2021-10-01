import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"
import { Review } from "../Schemas/review.schema";
import {Tag, TagSchema} from "../Schemas/tag.schema"
/*
export const ShelterSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    postalCode: String,
    phoneNumber: String,
    email: String,
    desc: {type: String, required: true},
    hours: {type: String, required: true},
    rating: {type: Number, required: true},
    reviews: [{reviewer: mongoose.Types.ObjectId, review: String, rating: Number, date: Date}],
    tags: [{tagId: mongoose.Types.ObjectId, tagName: String}]
});
/*
export interface Shelter{
    id:string,
    name:string,
    address:string,
    postalCode:string,
    email:string,
    desc:string,
    hours:string,
    rating:number,
    //reviews: [{_id:mongoose.Types.ObjectId, review: string, rating: number, date: Date}],
    //tags:[{_id:mongoose.ObjectId, tagName: string}]
}*/

export type ShelterDocument = Shelter & Document

@Schema()
export class Shelter{
    @Prop()
    id:string;
    @Prop()
    name:string;
    @Prop()
    address:string;
    @Prop()
    postalCode:string;
    @Prop()
    phoneNumber:string;
    @Prop()
    email:string;
    @Prop()
    descrpition:string;
    @Prop()
    hours:string;
    @Prop()
    rating:number;
    @Prop()
    reviews: Review[]
    @Prop()
    tags: Tag[]
}
export const ShelterSchema = SchemaFactory.createForClass(Shelter); 
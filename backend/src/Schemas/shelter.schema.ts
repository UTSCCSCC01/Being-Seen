import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Review } from "../Schemas/review.schema";
import {Tag} from "../Schemas/tag.schema"
import { Service } from "./service.schema";

export type ShelterDocument = Shelter & Document

@Schema()
export class Shelter extends Service{
    @Prop({required:true})
    address:string;
    @Prop({default:""})
    postalCode:string;
    @Prop({required:true})
    phoneNumber:string;
    @Prop({default:""})
    email:string;
    @Prop({default:""})
    hours:string;
    @Prop({default:0})
    rating:number;
    @Prop({default :[]})
    reviews: Review[]
    @Prop({default: "https://reactnative.dev/img/tiny_logo.png"})
    picture:string;
}
export const ShelterSchema = SchemaFactory.createForClass(Shelter); 
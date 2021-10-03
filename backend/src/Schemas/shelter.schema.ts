import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Review } from "../Schemas/review.schema";
import {Tag} from "../Schemas/tag.schema"

export type ShelterDocument = Shelter & Document

@Schema()
export class Shelter{
    @Prop()
    id:string;
    @Prop({required:true})
    name:string;
    @Prop({required:true})
    address:string;
    @Prop({default:""})
    postalCode:string;
    @Prop({required:true})
    phoneNumber:string;
    @Prop({default:""})
    email:string;
    @Prop({required:true})
    description:string;
    @Prop({default:""})
    hours:string;
    @Prop({default:0})
    rating:number;
    @Prop({default :[]})
    reviews: Review[]
    @Prop({default: []})
    tags: Tag[]
    @Prop()
    picture:string;
}
export const ShelterSchema = SchemaFactory.createForClass(Shelter); 
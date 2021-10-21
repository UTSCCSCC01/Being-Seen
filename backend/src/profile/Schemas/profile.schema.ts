import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document

@Schema()
export class Profile{
    @Prop()
    id:string;
    @Prop({ required: true })
    name:string;
    @Prop({ default: '' })
    story: string;
    @Prop({ default: 0 })
    balance: number;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile); 
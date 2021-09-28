import { stringify } from "querystring";
import { Review } from "./Review"
import { Tag } from "./Tag"

export class Shelter {
    private _id : string;
    private _name : string;
    private _address : string;
    private _postalCode : string;
    private _phoneNumber : string;
    private _email : string;
    private _desc : string;
    private _hours : string;
    private _rating : number;
    private _reviews : Array<Review>;
    private _tags : Array<Tag>;


    public get id() : string {
        return this._id;
    }
    public set id(v : string) {
        this._id = v;
    }
    public get name() : string {
        return this._name;
    }
    public set name(v : string) {
        this._name = v;
    }
    public get address() : string {
        return this._address;
    }
    public set address(v : string) {
        this._address = v;
    }
    public get postalCode() : string {
        return this._postalCode;
    }
    public set postalCode(v : string) {
        this._postalCode = v;
    }     
    public get phoneNumber() : string {
        return this._phoneNumber;
    }
    public set phoneNumber(v : string) {
        this._phoneNumber = v;
    }    
    public get email() : string {
        return this._email;
    }
    public set email(v : string) {
        this._email = v;
    }
    public get desc() : string {
        return this._desc;
    }
    public set desc(v : string) {
        this._desc = v;
    }
    public get hours() : string {
        return this._hours;
    }
    public set hours(v : string) {
        this._hours = v;
    } 
    public get rating() : number {
        return this._rating;
    }
    public set rating(v : number) {
        this._rating = v;
    }
    public get reviews() : Array<Review> {
        return this._reviews;
    }
    public set reviews(v : Array<Review>) {
        this._reviews = v;
    }
    public get tags() : Array<Tag> {
        return this._tags;
    }
    public set tags(v : Array<Tag>) {
        this._tags = v;
    }
    
    public addReview(rev: Review){
        this.reviews.push(rev)
    }
    
    public toString(): string{
        var toReturn = "{name: " + this.name + ", address: " + this.address + ", postalCode: " + this.postalCode + ", phoneNumber: " + this.phoneNumber +
        ", email: " + this.email + ", desc: \"" + this.desc +"\", hours: " + this.hours + "rating: " + this.rating.toString() +"/5, reviews: " + this.reviews.toString() +
        "tags: " + this.tags.toString() +"}" ;

        return toReturn;
        
    }
    
}
import { Youth } from "./Youth";
export class Review {
    private _id: string;
    private _reviewer : Youth;
    private _review : string;
    private _rating : number;
    private _date : Date;

    public get id() : string {
        return this._id;
    }
    public set id(v : string) {
        this._id = v;
    }    
    public get reviewer() : Youth {
        return this._reviewer;
    }
    public set reviewer(v : Youth) {
        this._reviewer = v;
    }
    public get review() : string {
        return this._review;
    }
    public set review(v : string) {
        this._review = v;
    }  
    public get rating() : number {
        return this._rating;
    }
    public set rating(v : number) {
        if (0 <= v && v <= 5){
            this._rating = v;
        }
    }   
    public get date() : Date {
        return this._date;
    }
    public set date(v : Date) {
        this._date = v;
    }
    

    public toString(): string{
        return "\"" + this.review + "\" " + this.rating.toString() + "\5" + " Written on " + this.date.toString();
    }
    
    
    
}

import mongoose from 'mongoose';

export class User {
    
    public id: number;
    public name: string;
    public pass: string;
    public email: string;
    public lang: string;
    public curr: string;
    public watchlist: Array<string>;

    

    constructor(id: number) {
        if(id > 0) {
            this.id = id;
        }else{;
            this.id = Date.now();
        }
        this.name = "";
        this.pass = "123";
        this.email = "ggg@gmail.com";
        this.lang = "";
        this.curr = "";
        this.watchlist = [];
    }

    getDbModelVars() {
        const id: number = this.id;
        const name: string = this.name;
        const pass: string = this.pass;
        const email: string = this.email;
        const lang: string = this.lang;
        const curr: string = this.curr;
        const wList: Array<string> = this.watchlist;

        return {id, name, pass, email, lang, curr, wList};
    }

    readUserDB() {

    }

    findUserDB() {
        
    }

    nextId() {
        this.id = Date.now();
    }

    toJson ():Object {
        return {
            "id": this.id,
            "email": this.email,
            "pass": this.pass,
            "name": this.name,
            "lang": this.lang,
            "currency": this.curr
        };
    }
}

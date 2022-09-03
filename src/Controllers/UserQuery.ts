import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { User } from '../Models/User';

export class UserQuery {
    public userModel;
    

    constructor(dbURL: string) {
        // mongoose.connect(dbURL);
        this.userModel = this.getDbModelUser('user');
    }

    getUser(req: Request): Object {
        const cUser: User = new User(-1);
        this.userModel.findOneAndUpdate({ name: "Serj"}, {name: req.query.name}).then((doc) => {
            doc?.save();
        });

        console.log("get user "+req.query.name);
        let response = {
            user: cUser.toJson()
        };
        return response;
    }

    async updateUser(req: Request, res: Response): Promise<Object> {
        const cUser: User = new User(-1);
        let response = {
            user: cUser.toJson()
        };
        const findDoc = await this.userModel.findOne({ email: req.query.email }).exec();
        if(!findDoc?.$isEmpty) {
            console.log("put user not found!!! "+req.query.email);
            await res.status(400).json({"answer": "user not found"});
            return await response;
        } else {
            if(req.query.name && req.query.name !== "") {
                this.userModel.findOneAndUpdate({email: req.query.email}, {name: req.query.name}).then((doc) => {
                    doc?.save();
                });
            }
            if(req.query.lang && req.query.lang !== "") {
                this.userModel.findOneAndUpdate({email: req.query.email}, {lang: req.query.lang}).then((doc) => {
                    doc?.save();
                });
            }
            if(req.query.currency && req.query.currency !== "") {
                this.userModel.findOneAndUpdate({email: req.query.email}, {curr: req.query.currency}).then((doc) => {
                    doc?.save();
                });
            }
        };
        console.log("put user "+req.query.email);
        response = {
            user: cUser.toJson()
        };
        await res.json(response);
        return response;
    }

    async createUser(req: Request, res: Response): Promise<Object> {
        let newId: number = (req.body.id > 0)? req.body.id : -1;
            console.log("post user: neew id is "+newId);
        const cUser: User = new User(newId);
        cUser.email = req.body.email;
        cUser.pass = req.body.pass;
        if(req.body.name !== undefined && req.body.name !== "") {
            cUser.name = req.body.name;
        }
		if(req.body.lang !== undefined && req.body.lang !== "") {
			cUser.lang = req.body.lang;
		}
		if(req.body.currency !== undefined && req.body.currency !== "") {
			cUser.curr = req.body.currency;
		}

        let response = cUser.toJson();

        // const userModel = cUser.getDbModel();
        this.userModel.create(cUser.getDbModelVars());
        
        console.log("post user "+req.body.email);
        // Отправим ответ клиенту. Объект будет автоматически сериализован
        // в строку. Если явно не задано иного, HTTP-статус будет 200 OK.
        await res.json(response);
        return response;
    }

    getDbModelUser(mod: string) {
        return mongoose.connection.model(mod, this.newShemaUser());
    }

    newShemaUser(): mongoose.Schema {
        return new mongoose.Schema({
            id: {type: Number, required: true},
            name: {type: String, required: false},
            pass: {type: String, required: true},
            email: {type: String, unuque: true, required: true},
            lang: {type: String, required: false},
            curr: {type: String, required: false},
            watchlist: {type: Array<String>, required: false}
        });
    }	
}
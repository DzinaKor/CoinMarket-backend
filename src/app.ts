import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { User } from './models/user';

export class App {
	public expressApp: Application;
	constructor(){
		this.expressApp = express();

		this.attachRoutes();
	}
	attachRoutes () {
		//let app = this.expressApp;
		let jsonParser = bodyParser.json();
		this.expressApp.get('/user', this.rGetUser.bind(this));
	}

	rGetUser(req: Request, res: Response) {
		const cUser: User = new User(-1);
		if (!req.query.name) {
			console.log("Bad request");
			res.status(400).json({"answer": "bad request"});
		}else{
			console.log("get user "+req.query.name);
			let response = {
				user: cUser.toJson()
			};
			// Отправим ответ клиенту. Объект будет автоматически сериализован
			// в строку. Если явно не задано иного, HTTP-статус будет 200 OK.
			res.json(response);
		}
	}
}

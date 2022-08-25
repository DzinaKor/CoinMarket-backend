export class User {
	
	public id: number;
	public name: string;
	public pass: string;

	constructor(id: number) {
		this.id = id;
		this.name = "";
		this.pass = "";
	}

	readUserDB() {

	}

	findUserDB() {
		
	}

    toJson () {
        return {
            id: this.id,
            name: this.name,
			pass: this.pass
        };
    }
}

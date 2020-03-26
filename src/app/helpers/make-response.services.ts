export class MakeResponseService {

    arrayDefault: any;
    objectDefault;
    pushArray = [];
    returnObject;

    public getArray(response) {
        this.pushArray = [];
        this.arrayDefault = response;
        this.arrayDefault.map((el) => {
            this.pushArray.push(el);
        });
        return this.pushArray;
    };

    public getObject(response) {
        this.objectDefault = response;
        this.objectDefault.map((el) => {
            this.returnObject = el;
        });

        return this.returnObject;
    }
}
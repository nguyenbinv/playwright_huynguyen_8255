export default class Ults {
    stringGenerator(numberOfChar: number): string {
        var randomString = require("randomstring");
        const randomStringConst = randomString.generate(numberOfChar);

        return randomStringConst;
    }
}

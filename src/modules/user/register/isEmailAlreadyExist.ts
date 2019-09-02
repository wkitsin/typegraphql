import { registerDecorator, ValidationOptions } from "class-validator";
import { User } from "../../../entity/User";

export function isEmailAlreadyTaken(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: "isEmailAlreadyTaken",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(email: string) {
          return User.findOne({ where: { email } }).then(user => {
            return user ? false : true;
          });
        }
      }
    });
  };
}

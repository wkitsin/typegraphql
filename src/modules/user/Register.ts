import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

import bcrypt from "bcryptjs";

@Resolver(User)
export class RegisterResolver {
  @Query(() => String, { nullable: true })
  async helloWorld() {
    return "Hello WorLd!";
  }

  @Mutation(() => User)
  async register(@Arg("data") registerInput: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerInput.password, 12);

    const user = await User.create({
      ...registerInput,
      password: hashedPassword
    }).save();

    return user;
  }
}

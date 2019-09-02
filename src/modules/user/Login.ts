import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "src/types/MyContext";

import bcrypt from "bcryptjs";

@Resolver(User)
export class LoginResolver {
  @Query(() => User, { nullable: true })
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return null;

    ctx.req.session!.userId = user.id;

    return user;
  }
}

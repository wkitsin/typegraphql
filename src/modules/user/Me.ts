import { User } from "../../entity/User";
import { Resolver, Ctx, Query, Authorized } from "type-graphql";
import { MyContext } from "../../types/MyContext";

@Resolver(User)
export class MeResolver {
  @Authorized()
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) return undefined;

    return User.findOne(ctx.req.session!.userId);
  }
}

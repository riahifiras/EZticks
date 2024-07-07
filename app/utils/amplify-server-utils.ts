import { authConfig } from "../amplify-cognito-config";
import { NextServer, createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";

export const { runWithAmplifyServerContext } = createServerRunner({
    config: {
        Auth: authConfig,
    },
});

export async function authenticatedUser(context: NextServer.Context) {
    return await runWithAmplifyServerContext({
        nextServerContext: context,
        operation: async (contextSpecs) => {
            try {
                const session = await fetchAuthSession(contextSpecs);
                if(!session.tokens){
                    return;
                }
                const user = {
                    ...(await getCurrentUser(contextSpecs)),
                    isAdmin: false
                };
                const groups = session.tokens.accessToken.payload["cognito:groups"];
                // @ts-ignore
                user.isAdmin = Boolean(groups && groups.includes("Admins"));

                return user
            } catch (error) {
                console.log(error);
                
            }
        }
    })
}
import { useSession, signIn, signOut } from "next-auth/react";

const AuthButton = () => {
    const { data: session } = useSession();

    if (!session) {
        return <button onClick={() => signIn()}>Sign In</button>;
    }

    return <button onClick={() => signOut()}>Sign Out</button>;
};

export default AuthButton;

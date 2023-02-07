import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { client } from "../../api/api";
import { AuthResponse } from "../../api/types";
import LoadingOverlay from "../../components/LoadingOverlay";
import { useSignIn } from "react-auth-kit";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const GoogleRedirect = () => {
    const signIn = useSignIn();
    const toast = useToast();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.hash);
    const idToken = searchParams.get("id_token");

    const { mutateAsync: loginAsync } = useMutation(
        () =>
            client.post<AuthResponse>(
                "/users/auth/sign-in/google",
                {},
                {
                    params: {
                        idToken,
                    },
                }
            ),
        {
            onSuccess: (res) => {
                signIn({
                    token: res.data.authToken.token,
                    expiresIn: res.data.authToken.expiresIn,
                    tokenType: res.data.tokenType,
                    authState: res.data.authState,
                });
                navigate("/");
            },
            onError: (err: AxiosError) => {
                console.log(err);
                toast({
                    title: "Error signing in, try again later",
                    // @ts-ignore
                    description: err.message || err,
                    status: "error",
                    position: "top",
                    duration: 2000,
                });
            },
        }
    );

    useEffect(() => {
        loginAsync();
    }, []);

    return <LoadingOverlay />;
};

export default GoogleRedirect;

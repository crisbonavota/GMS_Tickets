import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack,
    chakra,
    useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useSignIn } from "react-auth-kit";
import { useMutation } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { AuthenticationResponse } from "../api/types";
import clienteAxios from "../services/axios";

const mensajeErrorFormulario = {
    EN: "Please check the form and try again",
    ES: "Por favor revisa el formulario e intenta de nuevo",
};

const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
};

const Signup = () => {
    const [searchParams] = useSearchParams();
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(
                searchParams.get("language") === "EN"
                    ? mensajeErrorFormulario.EN
                    : mensajeErrorFormulario.ES
            )
            .required(),
        password: Yup.string().min(5).required(),
        confirmPassword: Yup.string().oneOf([Yup.ref("password")]),
    });

    const formik = useFormik({
        initialValues,
        onSubmit: () => {
            signInApi();
        },
        validationSchema,
    });

    const navigate = useNavigate();
    const signin = useSignIn();
    const toast = useToast();

    const { mutate: signInApi } = useMutation(
        () =>
            clienteAxios.post<AuthenticationResponse>("/accounts/signIn", {
                email: formik.values.email,
                password: formik.values.password,
            }),
        {
            onSuccess: (r) => {
                signin({
                    token: r.data.token,
                    expiresIn: r.data.expiration,
                    tokenType: r.data.tokenType,
                    authState: r.data.authState,
                });
                toast({
                    title: "Welcome",
                    status: "success",
                });
                navigate("/tickets");
                console.log("Logged in", r);
            },
            onError: (e) => {
                console.log("Not logged in", e);
            },
        }
    );

    return (
        <chakra.form
            onSubmit={formik.handleSubmit}
            bgColor={"gray.800"}
            p={5}
            rounded="xl"
            color="white"
        >
            <VStack spacing={8}>
                <FormControl isInvalid={formik.errors.email !== undefined}>
                    <FormLabel htmlFor="email">Email: </FormLabel>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.errors.password !== undefined}>
                    <FormLabel htmlFor="password">Password: </FormLabel>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    <FormErrorMessage>
                        {formik.errors.password}
                    </FormErrorMessage>
                </FormControl>
                <FormControl
                    isInvalid={formik.errors.confirmPassword !== undefined}
                >
                    <FormLabel htmlFor="password">Confirm password: </FormLabel>
                    <Input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                    />
                    <FormErrorMessage>
                        {formik.errors.confirmPassword}
                    </FormErrorMessage>
                </FormControl>
                <Button w="full" colorScheme="orange" type="submit">
                    Sign Up
                </Button>
            </VStack>
        </chakra.form>
    );
};

export default Signup;

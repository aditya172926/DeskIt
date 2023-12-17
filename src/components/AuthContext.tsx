import { Button, Result } from "antd";
import React, {createContext, useContext, useEffect, useState} from "react";
import AuthModal from "./AuthModal";
import { useNavigate } from "react-router-dom";
import { Nullable } from "../types";

type AuthContextType = {
    token: Nullable<string>;
}

const AuthContext = createContext<AuthContextType>({token: null});

interface Props {
    children: React.ReactNode;
}

const AuthContextProvider = ({children}: Props) => {
    const [token, setToken] = useState<Nullable<string>>(null);
    const [shouldShowModal, setShouldShowModal] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (token) {
                setToken(null);
                setShouldShowModal(true)
            }
        }, 3600000);

        return () => clearTimeout(timer);
    }, [token]);
}
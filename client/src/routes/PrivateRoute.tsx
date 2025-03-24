/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';

const PrivateRoute = () => {
    const { accounts } = useMsal(); // Ottieni l'account (utente autenticato)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // stato iniziale null (non sappiamo ancora)
    console.log('Account:', accounts[0]?.name);

    useEffect(() => {
        if (accounts.length > 0 && accounts[0]?.name) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [accounts]);

    if (isAuthenticated === false) {
        console.log('Utente non autenticato');
        //return <Navigate to="/Login" replace />; // Redirigi alla pagina di login
        return null;
    } else {
        console.log('Utente autenticato');

        // Se l'utente è autenticato, mostra il contenuto della rotta protetta
        return <Outlet />;
    }
};

export default PrivateRoute;
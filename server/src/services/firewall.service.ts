import dotenv from 'dotenv';
import { Firewall } from '../interfaces/firewall';
import axios from 'axios';

dotenv.config();
const jsonString: any = process.env.FIREWALL_CONFIG;
const firewallConfig = JSON.parse(jsonString);

export const generateVoucher = async (firewall: Firewall): Promise<void> => {
    const selectedFirewall = firewallConfig.find((fw: { FIREWALL: string; }) => fw.FIREWALL === firewall.firewallName);

    try {
        const apiUrl = `${selectedFirewall.API_HOST}/v2/cmdb/user/group/Guests%20Portale/guest?vdom=root`;
        const body = {
            "user-id": firewall['user-id'],
            name: firewall.name,
            password: firewall.password,
            company: firewall.company,
            email: firewall.email,
            expiration: firewall.expiration,
            comment: firewall.comment,
            'mobile-phone': firewall['mobile-phone'],
            multiple: firewall.multiple,
            sponsor: firewall.sponsor,
        };

        const response = await axios.post(apiUrl, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${selectedFirewall.API_TOKEN}`,
            }
        });
    } catch (error) {
        console.error('Errore durante la generazione del voucher: ', error);
        throw new Error('Errore durante la generazione del voucher');
    }
}
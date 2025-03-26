import { Request, Response } from 'express';
import { Firewall } from '../interfaces/firewall';
import { generateVoucher } from '../services/firewall.service';

export const generateVoucherController = async (req: Request, res: Response): Promise<void> => {
    try {
        const firewall: Firewall = req.body;
        // Validazione dei parametri
        if (!firewall) {
            res.status(400).json({ error: 'Tutti i campi sono obbligatori' });
            return;
        }
        
        await generateVoucher(firewall);

        res.status(200).json({ message: 'Voucher generato con successo!' });




    } catch (error) {
        res.status(500).json({ error: 'Errore durante la generazione del voucher' });
    }
}
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from "react"

import { useState } from "react"

import { Clock, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addTime, generatePassword, generateUserId } from "@/utils/function"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { PhoneInput } from "../ui/phone-input"

import { useMsal } from '@azure/msal-react';
import { useAuthToken } from '@/hooks/useAuthToken'; // Importa il hook creato prima
import { RootState } from "@/store/store"
import { useSelector } from "react-redux"

const VoucherForm = () => {

    const { accounts } = useMsal();
    const { getAccessToken } = useAuthToken();



    console.log("Account: " + accounts[0]?.name);


    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        notes: "",
        duration: "",
        mobilePhone: "",
    });

    const [generatedVoucher, setGeneratedVoucher] = useState<{
        username?: string;
        password?: string;
    } | null>(null);


    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const selectedFirewall = useSelector((state: RootState) => state.firewall.selectedFirewall);


    const API_URL = import.meta.env.VITE_API_URL;
    const API_BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL;
    const API_TOKEN = import.meta.env.VITE_API_TOKEN;
    const WIFI_SSID = import.meta.env.VITE_WIFI_SSID; // Nome della rete WiFi
    const PREFIX = import.meta.env.VITE_API_PREFIX; // Prefisso per lo username

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handlePhoneChange = (value: string) => {
        setFormData((prev) => ({ ...prev, mobilePhone: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, duration: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);
        setGeneratedVoucher(null);
        setIsSubmitting(true);

        const token = await getAccessToken();

        const userId = generateUserId(PREFIX);
        const password = generatePassword();

        // Ottieni il nome dell'utente loggato (display name)
        const sponsor = accounts[0]?.name;

        try {
            console.log("Generazione voucher in corso...");
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    firewallName: selectedFirewall?.FIREWALL,
                    "user-id": userId,
                    name: formData.name,
                    password: password,
                    company: formData.company,
                    email: formData.email,
                    expiration: addTime(new Date(), Number(formData.duration)), // Convertiamo in numero
                    comment: formData.notes,
                    "mobile-phone": formData.mobilePhone,
                    multiple: 1,
                    sponsor: sponsor,  // Aggiungi lo sponsor al corpo della richiesta
                }),
            });

            if (response.ok) {
                console.log("Voucher generato con successo!");
                console.log(token);
                const responseMail = await fetch(API_BACKEND_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        to: formData.email,
                        subject: "WiFi Voucher - " + import.meta.env.VITE_WIFI_SSID,
                        text: "Ciao, questa è una mail di test mandata da react!\n\rWIFISSID:" + selectedFirewall?.WIFI_SSID + "\n\rUser: " + userId + "\n\rPassword: " + password,
                    }),
                });
                const responseText = await responseMail.text(); // Leggi la risposta come testo
                console.log("Risposta del server:", responseText);
                if (responseMail.ok) {
                    console.log("Email inviata con successo!");
                    setMessage("✅ Voucher generato con successo!");
                    setGeneratedVoucher({
                        username: userId,
                        password: password,
                    });
                    setFormData({
                        name: "",
                        company: "",
                        email: "",
                        notes: "",
                        duration: "",
                        mobilePhone: "",
                    });
                } else {
                    const errorDetails = await responseMail.json();
                    console.error("Errore nell'invio dell'email:", errorDetails);
                    console.error("❌ Errore nell'invio dell'email");
                }
            } else {
                setMessage("❌ Errore nella generazione del voucher");


            }
        } catch (error) {
            console.error("Errore API:", error);
            setMessage("❌ Errore nella richiesta API");
        } finally {
            setIsLoading(false);
            setIsModalOpen(true);
        }
    }


    return (
        <Card>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Guest full name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="company">Company</Label>
                            <Input
                                id="company"
                                name="company"
                                placeholder="Guest company"
                                value={formData.company}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="guest@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="mobilePhone">Mobile Phone</Label>
                            <PhoneInput
                                id="mobile-phone"
                                name="mobilePhone"
                                placeholder="+39 123 456 7890"
                                value={formData.mobilePhone}
                                onChange={handlePhoneChange}
                                defaultCountry={import.meta.env.VITE_PHONE_COUNTRY}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="duration">Voucher Duration</Label>
                        <Select value={formData.duration} onValueChange={handleSelectChange} required>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1 hour</SelectItem>
                                <SelectItem value="2">2 hours</SelectItem>
                                <SelectItem value="4">4 hours</SelectItem>
                                <SelectItem value="6">6 hours</SelectItem>
                                <SelectItem value="8">8 hours</SelectItem>
                                <SelectItem value="10">10 hours</SelectItem>
                                <SelectItem value="24">1 day</SelectItem>
                                <SelectItem value="168">1 week</SelectItem>
                                <SelectItem value="744">1 month</SelectItem>
                                <SelectItem value="8928">1 year</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                            id="notes"
                            name="notes"
                            placeholder="Additional information about the guest"
                            value={formData.notes}
                            onChange={handleChange}
                            rows={4}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" className="gap-2">
                            <Send className="h-4 w-4" />
                            Generate Voucher
                        </Button>
                    </div>
                </form>
            </CardContent>

            {/* MODALE PER ERRORE O VOUCHER */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{message?.includes("❌") ? "Errore" : "Voucher Generato"}</DialogTitle>
                    </DialogHeader>

                    {generatedVoucher && (
                        <div className="p-4 border rounded-md bg-gray-100">
                            <p className="font-semibold">Dettagli del Voucher:</p>
                            <p><strong>Username:</strong> {generatedVoucher.username}</p>
                            <p><strong>Password:</strong> {generatedVoucher.password}</p>
                            <p><strong>WiFi:</strong> {WIFI_SSID}</p>
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={() => setIsModalOpen(false)}>Chiudi</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


        </Card >
    );
};

export default VoucherForm;
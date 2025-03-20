import type React from "react"

import { useState } from "react"

import { Clock, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const VoucherForm = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        notes: "",
        duration: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, duration: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
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
                                placeholder="Guest name"
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
                        <Label htmlFor="duration">Voucher Duration</Label>
                        <Select value={formData.duration} onValueChange={handleSelectChange} required>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1h">1 hour</SelectItem>
                                <SelectItem value="2h">2 hours</SelectItem>
                                <SelectItem value="4h">4 hours</SelectItem>
                                <SelectItem value="6h">6 hours</SelectItem>
                                <SelectItem value="8h">8 hours</SelectItem>
                                <SelectItem value="10h">10 hours</SelectItem>
                                <SelectItem value="1d">1 day</SelectItem>
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
                        <Button type="submit" disabled={isSubmitting} className="gap-2">
                            {isSubmitting ? <Clock className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                            Generate Voucher
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default VoucherForm;
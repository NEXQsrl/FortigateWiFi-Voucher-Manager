import VoucherForm from "@/components/VoucherGenerator/VoucherForm";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const VoucherGenerator = () => {

  const selectedFirewall = useSelector((state: RootState) => state.firewall.selectedFirewall);


  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Generate Voucher for {selectedFirewall?.FIREWALL}</h1>
        <p className="text-muted-foreground">Create a new WiFi voucher for a guest</p>
      </div>
      <VoucherForm />
    </div>
  );
};

export default VoucherGenerator;

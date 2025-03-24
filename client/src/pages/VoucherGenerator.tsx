import VoucherForm from "@/components/VoucherGenerator/VoucherForm";

const VoucherGenerator = () => {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Generate Voucher</h1>
          <p className="text-muted-foreground">Create a new WiFi voucher for a guest</p>
        </div>
        <VoucherForm />
      </div>
    );
  };
  
  export default VoucherGenerator;
  
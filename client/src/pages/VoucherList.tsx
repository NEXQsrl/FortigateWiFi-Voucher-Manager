import VoucherListArea from "@/components/VoucherList/VoucherListArea";


const VoucherList = () => {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Voucher List</h1>
          <p className="text-muted-foreground">View and manage all guest WiFi vouchers</p>
        </div>
        <VoucherListArea />
      </div>
    );
  };
  
  export default VoucherList;
  
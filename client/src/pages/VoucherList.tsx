import VoucherListArea from "@/components/VoucherList/VoucherListArea";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";




const VoucherList = () => {

  //const selectedFirewall = useSelector((state: RootState) => state.firewall.selectedFirewall);
  
    return (
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Voucher List {/*selectedFirewall?.FIREWALL && `for ${selectedFirewall?.FIREWALL}`*/}</h1>
          <p className="text-muted-foreground">View and manage all guest WiFi vouchers</p>
        </div>
        <VoucherListArea />
      </div>
    );
  };
  
  export default VoucherList;
  
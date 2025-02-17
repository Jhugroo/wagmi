import ReceiptOptionList from "@/components/taxonomy/receipt/list";
import { AdminDashboardLink } from "../..";

export default function ReceiptOptionIndexPage() {
    return <>
        <ReceiptOptionList />
        <AdminDashboardLink link="/admin/taxonomy" />
    </>

}
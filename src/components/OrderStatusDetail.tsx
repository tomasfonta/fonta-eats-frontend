import { Order } from "@/types";
import { Separator } from "./ui/separator";

type Props = {
    order: Order;
}

const OrderStatusDetail = ({ order }: Props) => {

    return (
        <div className="space-y-5">


            <div className="flex flex-col gap-5">

                <span className="font-bold"> Devlivering to:</span>
                <span> {order.deliveryDetails.addressLine1}</span>
                <span> {order.deliveryDetails.city}</span>
                <span> {order.deliveryDetails.name}</span>

                <Separator />
                <span className="font-bold">Your Order</span>

                {order.cartItems.map((item) => {
                    return <span> {item.name} x {item.quantity} </span>
                })}
                <Separator />
                <span className="font-bold"> Total</span>
                <span> ${order.totalAmount}</span>
            </div>
        </div>
    );
}

export default OrderStatusDetail;
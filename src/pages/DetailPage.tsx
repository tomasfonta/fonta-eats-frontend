import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestaurant } from "@/api/RestaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItemComponent from "@/components/MenuItemComponent";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItem } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { useParams } from "react-router-dom";


export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
};

type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string,
        name: string;
        quantity: string;
    }[];
    deliveryDetails: {
        email: string,
        name: string,
        addressLine: string,
        city: string,
        country: string
    };
    restaurantId: string;
};

const DetailPage = () => {

    const { restaurantId } = useParams();
    const { restaurant, isLoading } = useGetRestaurant(restaurantId);
    const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession();
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    const addToCart = (menuItem: MenuItem) => {

        setCartItems((prevState) => {
            const exitingCartItem = prevState.find((cartItem) => cartItem._id === menuItem._id);

            let updatedCartItems: CartItem[];

            if (exitingCartItem) {
                updatedCartItems = prevState.map((cartItem) =>
                    cartItem._id === menuItem._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem);
            } else {
                updatedCartItems = [
                    ...prevState,
                    {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1
                    }
                ]
            }

            sessionStorage.setItem(
                `cartItems-${restaurantId}`,
                JSON.stringify(updatedCartItems));

            return updatedCartItems;
        });
    };

    const removeFromCart = (menuItem: MenuItem) => {
        setCartItems((prevState) => {
            const updatedCartItems = prevState.filter((cartItem) => cartItem._id !== menuItem._id);
            sessionStorage.setItem(
                `cartItems-${restaurantId}`,
                JSON.stringify(updatedCartItems));
            return updatedCartItems;
        });
    };

    const onCheckout = async (userFormData: UserFormData) => {
        if (!restaurant) {
            return;
        }

        const checkoutData: CheckoutSessionRequest = {
            cartItems: cartItems.map((cartItem) => ({
                menuItemId: cartItem._id,
                name: cartItem.name,
                quantity: cartItem.quantity.toString()
            })),
            restaurantId: restaurant._id,
            deliveryDetails: {
                name: userFormData.name,
                addressLine: userFormData.address,
                city: userFormData.city,
                country: userFormData.country,
                email: userFormData.email as string
            }
        };


        const data = await createCheckoutSession(checkoutData);
        window.location.href = data.url;


    }

    if (isLoading || !restaurant) {
        return "Loading...";
    }

    return (
        <div className="flex flex-col gap-10">

            <AspectRatio ratio={16 / 4}>
                <img
                    className="rounded-md object-cover h-full w-full"
                    src={restaurant.imageUrl}
                />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((item) => (
                        <MenuItemComponent
                            menuItem={item}
                            addToCart={() => addToCart(item)}
                        />
                    ))}
                </div>
                <div>
                    <Card>
                        <OrderSummary
                            restaurant={restaurant}
                            cartItems={cartItems}
                            removeFromCart={removeFromCart}
                        />
                        <CardFooter>
                            <CheckoutButton
                                disabled={cartItems.length === 0}
                                onCheckout={onCheckout}
                                isLoading={isCheckoutLoading}
                            />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;
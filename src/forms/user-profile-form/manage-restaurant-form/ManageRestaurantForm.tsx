import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";



const formSchema = z.object({
    restaurantName: z.string().min(1, "Name is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    estimatedDeliveryPrice: z.coerce.number({
        required_error: "Estimated delivery price is required",
        invalid_type_error: "Must be a valid Number"
    }),
    cousines: z.array(z.string().nonempty({
        message: "please select at least one item",
    })),
    menuItems: z.array(z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price ir required"),
    })
    ),
    imageFile: z.instanceof(File, { message: "image is required" }),
});

type restaurantFormData = z.infer<typeof formSchema>

type Props = {
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {

    const form = useForm<restaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cousines: [],
            menuItems: [{ name: "", price: 0 }],
        },
    });

    const onSubmit = (formDataJson: restaurantFormData) => {

        // TODO convert formDataJson to a new FormData object


    }

    return (
        <Form {...form}>

            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 bg-gray-50 p-10 rounded-lg"
            >
                <DetailsSection />
            </form>

        </Form>
    );
};


export default ManageRestaurantForm;
import ManageRestaurantForm from "@/forms/user-profile-form/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
    return <ManageRestaurantForm onSave={function (restaurantFormData: FormData): void {
        throw new Error("Function not implemented.");
    }} isLoading={false} />;
}

export default ManageRestaurantPage;
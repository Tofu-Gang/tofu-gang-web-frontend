import Hero from "~/components/Hero";
import MainLayout from "~/routes/layouts/main";

function HomeLayout() {
    return (
        <>
            <Hero />
            <MainLayout />
        </>
    );
}

export default HomeLayout;

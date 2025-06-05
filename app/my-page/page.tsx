import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";



export default async function MyPage() {
    const session = await getAuthSession();

    if (!session?.user) {
        redirect("/login");
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">My Page</h1>
            <p>Welcome, {session.user.name}.</p>
            <p>Your phone number is {session.user.phone}.</p>
            <p>Your user ID is {session.user.id}.</p>
            <p>Your email is {session.user.email}.</p>
        </div>
    );
}
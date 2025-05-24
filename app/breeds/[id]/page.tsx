import Link from "next/link";
import axios from "axios";
import {DogBreed} from "@/types/DogBreed";

interface BreedDetailProps {
    params: {
        id: string;
    };
}

async function getBreedData(id: string): Promise<DogBreed | null> {
    const res = await axios.get(`https://nwabcijafvtjioyuexji.supabase.co/functions/v1/get-dog-breeds-by-id?id=${id}`);
    return res.data;
}

export default async function BreedDetailPage({ params }: BreedDetailProps) {
    const { id } = await params;
    const breed = await getBreedData(id);
    // const breed = await getBreedById(params.id); // ✅ 일반적으로 이렇게 많이 씀
    if (!breed) return <p>The breed does not exist.</p>;
    return (
        <main className={`w-full flex justify-center`}>
            <div className="mt-4 max-w-[500px] bg-blue-200 p-6 rounded-xl">

            <Link href={`/`} className={`box-border p-2 rounded-xl hover:bg-blue-300 cursor-pointer`}>
                ← Home
            </Link>
                <div className={`mt-4 border-white border-2 p-4 rounded-2xl flex gap-2 flex-wrap`}>
                    <h1 className="text-2xl font-bold">{breed.name}</h1>
                    <p>{breed.description}</p>
                    <p>🐾 Lifespan: {breed.life.min} - {breed.life.max}</p>
                </div>
            </div>
        </main>
    );
}

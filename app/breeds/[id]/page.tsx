'use client';
import Link from "next/link";
import axios from "axios";
import {DogBreedsById} from "@/types/DogBreed";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";

export default function BreedDetailPage() {
    // const { id } = await params;
    // const breed = await getBreedData(id);
    // const breed = await getBreedById(params.id); // ✅ 일반적으로 이렇게 많이 씀

    const params = useParams(); // 곧 공식화 할 params 사용법
    const id = params?.id as string;

    const [breed, setBreed] = useState<DogBreedsById | null>(null);
    const [loading, setLoading] = useState(true); // CSR로 바꾸면서 Loading도 보여주기

    useEffect(() => {
        async function fetchBreed() {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dog-breeds/${id}`);
                if (res.data.memo) {
                }
                setBreed(res.data);
            } catch (error) {
                console.error('❌ 데이터 요청 실패:', error);
            } finally {
                setLoading(false);  // CSR로 바꾸면서 Loading도 보여주기
            }
        }

        void fetchBreed();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!breed) return <p>The breed does not exist.</p>;

    return (
        <main className={`w-full flex justify-center`}>
            <div className="mt-4 max-w-[500px] bg-blue-200 p-6 rounded-xl">
                <Link href={`/`} className={`box-border p-2 rounded-xl hover:bg-blue-300 cursor-pointer`}>
                    ← Home
                </Link>
                {/*<div onClick={() => router.back()} className={`box-border p-2 rounded-xl hover:bg-blue-300 cursor-pointer`}>*/}
                {/*    ← Back*/}
                {/*</div>*/}
                <div className={`mt-4 border-white border-2 p-4 rounded-2xl flex gap-2 flex-wrap`}>
                    <h1 className="text-2xl font-bold">{breed.attributes.name}</h1>
                    <p>{breed.attributes.description}</p>
                    <p>🐾 Lifespan: {breed.attributes.life.min} - {breed.attributes.life.max}</p>
                </div>
            </div>
        </main>
    );
}

import { prisma } from '@/lib/prismaClient';
import { supabase } from '@/lib/supabaseClient';
import * as DogBreedsService from '@/services/dogBreedsService';

export async function getAllFavoriteBreeds() {
    const { data, error } = await supabase
    .from('favorite_breeds')
    .select('*')
    .order('created_at', { ascending: true });

    if (error) {
        throw new Error(`Error getting all favorite breeds: ${error.message}`);
    }

    const favoriteBreedsIds = data.map((f) => f.breeds_id)

    const allBreeds = await DogBreedsService.fetchAllDogBreeds();

    return allBreeds.filter((breed) => favoriteBreedsIds.includes(breed.id));
}

export async function addFavoriteBreed(breeds_id: string, memo: string) {
    // const { data, error } = await supabase
    // .from('favorite_breeds')
    // .insert([{ breeds_id, memo }])
    // .single();

    // if (error) {
    //     throw new Error(`Error adding favorite breed: ${error.message}`);
    // }

    // return data;

    return prisma.favorite_breeds.create({data: { breeds_id, memo }})
}
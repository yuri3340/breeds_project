import { NextRequest, NextResponse } from "next/server";
import * as FavoriteBreedsService from "@/services/favoriteBreedService";

export async function GET() {
    try {
        const favorites = await FavoriteBreedsService.getAllFavoriteBreeds();
        return NextResponse.json(favorites, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const {breeds_id, memo} = await req.json();
        if (!breeds_id || !memo) {
            return NextResponse.json({
                message: 'breeds_id and memo are required',
                status: 400
            });
        }
        const newFavorite = await FavoriteBreedsService.addFavoriteBreed(breeds_id, memo);
        return NextResponse.json(newFavorite, {status: 201});
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
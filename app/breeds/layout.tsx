import axios from 'axios';
import React from 'react'
import { BreedsProvider } from './BreedsContext';

async function getBreeds() {

  const res = await axios.get("https://nwabcijafvtjioyuexji.supabase.co/functions/v1/get-dog-breeds");
  return res.data;
}

const BreedsLayout = async ({children}: {children: React.ReactNode}) => {
    const breeds = await getBreeds();

  return (
    <BreedsProvider breeds={breeds}>
        <div>
            {children}
        </div>
    </BreedsProvider>
  )
}

export default BreedsLayout
// 유저 기능과 관련된 모든 쿼리를 모아두는 곳

import client from "~/supa-client";
import { productListSelect } from "~/features/products/queries";

export const getUserProfile = async (username: string) => {
    const {data, error} = await client
        .from('profiles')
        .select(`
        profile_id, 
        name,
        username,
        avatar,
        role,
        headline,
        bio
        `)
        .eq('username', username)
        .single(); // 1개의 데이터만 받아오기 위함

    if (error) { throw error; }
    return data;
};

export const getUserProducts = async (username: string) => {
    const {data, error} = await client
        .from('products')
        .select(`
            ${productListSelect},
            profiles!products_to_profiles!inner (
              profile_id
            )
        `)
        .eq('profiles.username', username);

    if (error) { throw error; }
    return data;
}

export const getUserPosts = async (username: string) => {
    const {data, error} = await client
        .from('community_post_list_view')
        .select('*')
        .eq('author_username', username);

    if (error) { throw error; }
    return data;
}

export const getUserIdByUsername = async (username: string) => {
    const { data, error } = await client
        .from('profiles')
        .select('profile_id')
        .eq('username', username)
        .single();

    // 존재하지 않는 유저는 기록하지 않음
    if (!data) {
        return null;
    }

    if (error) { throw error; }
    return data;
};
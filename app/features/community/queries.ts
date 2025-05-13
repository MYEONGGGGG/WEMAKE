import { eq, count, asc } from "drizzle-orm";
import db from "~/db";
import { topics, posts, postUpvotes } from "~/features/community/schema";
import { profiles } from "../users/schema";

/** Drizzle ORM */

export const getTopics = async () => {
    const allTopics = await db
        .select({
            name: topics.name,
            slug: topics.slug,
        })
        .from(topics);

    return allTopics;
};

export const getPosts = async () => {
    const allPosts = await db.select({
        id: posts.post_id,
        title: posts.title,
        createdAt: posts.created_at,
        topic: topics.name,
        author: profiles.name,
        authorAvatarUrl: profiles.avatar,
        username: profiles.username,
        upvotes: count(postUpvotes.post_id).as("upvotes"),
        })
        .from(posts)
        .innerJoin(topics, eq(posts.topic_id, topics.topic_id))
        .innerJoin(profiles, eq(posts.profile_id, profiles.profile_id))
        .leftJoin(postUpvotes, eq(posts.post_id, postUpvotes.post_id))
        .groupBy(posts.post_id, profiles.name, profiles.avatar, profiles.username, topics.name)
        .orderBy(asc(posts.post_id));

    return allPosts;
};
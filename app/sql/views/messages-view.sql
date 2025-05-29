-- CREATE OR REPLACE VIEW messages_view AS
-- SELECT
--     m1.message_room_id,
--     profiles.name,
--     (
--         SELECT content
--         FROM messages
--         WHERE message_room_id = m1.message_room_id
--         ORDER BY message_id DESC
--         LIMIT 1
--     ) AS last_message,
--     m1.profile_id AS profile_id,
--     m2.profile_id AS other_profile_id,
--     profiles.avatar
-- FROM message_room_members m1
--          INNER JOIN message_room_members m2 ON m1.message_room_id = m2.message_room_id
--          INNER JOIN profiles ON profiles.profile_id = m2.profile_id;

CREATE OR REPLACE VIEW messages_view AS
SELECT
    m1.message_room_id,
    you.name,
    (
        SELECT content
        FROM messages
        WHERE message_room_id = m1.message_room_id
        ORDER BY message_id DESC
        LIMIT 1
    ) AS last_message,
    m1.profile_id AS profile_id,
    m2.profile_id AS other_profile_id,
    you.avatar
FROM message_room_members m1
         INNER JOIN message_room_members m2
                    ON m1.message_room_id = m2.message_room_id
                        AND m1.profile_id <> m2.profile_id  -- 자기 자신 제외
         INNER JOIN profiles you
                    ON you.profile_id = m2.profile_id;
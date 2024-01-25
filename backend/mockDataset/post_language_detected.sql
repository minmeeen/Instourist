CREATE TABLE post_language_detected (
    id serial primary key ,
    cleaned_caption text,
    post_created_at timestamp,
    post_taken_at timestamp,
    language varchar,
    iso_code varchar,
    location_id serial REFERENCES location(location_id),
    created_at	timestamp,
    created_by varchar,
    updated_at	timestamp,
    updated_by varchar
);
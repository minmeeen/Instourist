CREATE TABLE location (
    location_id serial primary key ,
    location_name varchar,
    ig_location text[]
);

Insert into location(location_name, ig_location)
VALUES ('Chiang Mai Grand Canyon' ,Array ['632463043626278', '1028305381']),
('Doi Inthanon', Array['236812658', '352088355491037']),
('Mae Taeng Elephant Park', Array['291752084203684', '1527799243987966']),
('Wat Phra Singh' , Array['112222267011408', '349345216', '248305621']),
('Wat Gate Garam' , Array['904134436338401', '419245734893599']),
('Wat Umong' , Array['223846157', '1030948912', '487995489']),
('Three Kings Monument' , Array['305046242995484', '893971733980858', '113055166899502']),
('Wat Chiang Man' , Array['662626057506904', '100502908417645']),
('Tha Phae Gate' , Array['100492914914971']),
('MAYA' , Array['213590035']),
('Chiang Mai Night Bazaar' , Array['1764651450309580']),
('Chiang Mai Night Safari' , Array['195304697182096']);
-- Seed Teams:

INSERT INTO teams (name) VALUES ('CSK');
INSERT INTO teams (name) VALUES ('RCB');
INSERT INTO teams (name) VALUES ('MI');
INSERT INTO teams (name) VALUES ('KKR');

-- Seed Players:

INSERT INTO players (name, team_id, role) VALUES ('Moeen Ali', 1, 'AR');
INSERT INTO players (name, team_id, role) VALUES ('MS Dhoni', 1, 'WK');
INSERT INTO players (name, team_id, role) VALUES ('Dawid Malan', 1, 'BT');
INSERT INTO players (name, team_id, role) VALUES ('Adil Rashid', 1, 'BW');
INSERT INTO players (name, team_id, role) VALUES ('Virat Kohli', 2, 'BT');
INSERT INTO players (name, team_id, role) VALUES ('KL Rahul', 2, 'WK');
INSERT INTO players (name, team_id, role) VALUES ('Jasprit Bumrah', 2, 'BW');
INSERT INTO players (name, team_id, role) VALUES ('Ravindra Jadeja', 2, 'AR');
INSERT INTO players (name, team_id, role) VALUES ('Aaron Finch', 3, 'BT');
INSERT INTO players (name, team_id, role) VALUES ('Steve Smith', 3, 'BT');
INSERT INTO players (name, team_id, role) VALUES ('Marcus Stoinis', 3, 'AR');
INSERT INTO players (name, team_id, role) VALUES ('Pat Cummings', 3, 'BW');
INSERT INTO players (name, team_id, role) VALUES ('Glenn Maxwell', 3, 'AR');
INSERT INTO players (name, team_id, role) VALUES ('Josh Inglis', 3, 'WK');
INSERT INTO players (name, team_id, role) VALUES ('Kane Williamson', 4, 'BT');
INSERT INTO players (name, team_id, role) VALUES ('Kyle Jamieson', 4, 'BW');
INSERT INTO players (name, team_id, role) VALUES ('Devon Conway', 4, 'BT');
INSERT INTO players (name, team_id, role) VALUES ('Lockie Ferguson', 4, 'BW');
INSERT INTO players (name, team_id, role) VALUES ('Tim Siefert', 4, 'WK');
INSERT INTO players (name, team_id, role) VALUES ('Jimmy Neesham', 4, 'AR');

-- Seed fixtures:

INSERT INTO fixtures (home_team_id, away_team_id, date) VALUES (1, 2, '2020-11-29T20:37:30+0000');
INSERT INTO fixtures (home_team_id, away_team_id, date) VALUES (3, 4, '2021-10-16T15:00:00+0000');
INSERT INTO fixtures (home_team_id, away_team_id, date) VALUES (1, 4, '2022-11-29T20:37:30+0000');
INSERT INTO fixtures (home_team_id, away_team_id, date) VALUES (2, 5, '2023-10-16T15:00:00+0000');
INSERT INTO fixtures (home_team_id, away_team_id, date) VALUES (1, 3, '2024-11-29T20:37:30+0000');
INSERT INTO fixtures (home_team_id, away_team_id, date) VALUES (4, 2, '2025-10-16T15:00:00+0000');

-- Seed managers:

INSERT INTO managers (name, team_name, admin_level) VALUES ('Gerard Egan', 'Gerard fc', 4);
INSERT INTO managers (name, team_name, admin_level) VALUES ('Katie Egan', 'Katie fc', 4);
INSERT INTO managers (name, team_name, admin_level) VALUES ('Charlotte Egan', 'Charlotte fc', 4);
INSERT INTO managers (name, team_name, admin_level) VALUES ('Moira Egan', 'Moira fc', 4);


-- Seed scores: 

-- INSERT INTO scores (fixture_id, player_id, started, minutes_played, goals, assists, conceded, yellow_cards, red_cards, penalties_missed, penalties_conceded, penalties_saved) VALUES (1, 1, true, 80, 2, 1, 2, 1, 0, 0, 0, 0);

-- Seed leagues:

INSERT INTO leagues (name, admin_manager_id, manager_ids) VALUES ('Test League', 1, ARRAY[1, 2, 3, 4]);

-- Seed vidiprinter:

INSERT INTO vidiprinter (league_id, manager_id, player_id) VALUES (1, 1, 1);
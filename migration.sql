CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE
);

CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  team_id SMALLINT NOT NULL REFERENCES teams,
  role VARCHAR(2)
);

CREATE TABLE fixtures (
  id SERIAL PRIMARY KEY,
  home_team_id SMALLINT NOT NULL REFERENCES teams,
  away_team_id SMALLINT NOT NULL REFERENCES teams,
  date TEXT NOT NULL
);

CREATE TABLE scores (
  id SERIAL PRIMARY KEY,
  fixture_id SMALLINT NOT NULL REFERENCES fixtures,
  player_id SMALLINT NOT NULL REFERENCES players,
  runs SMALLINT DEFAULT 0,
  balls SMALLINT DEFAULT 0,
  fours SMALLINT DEFAULT 0,
  sixes SMALLINT DEFAULT 0,
  catches SMALLINT DEFAULT 0,
  part_run_outs SMALLINT DEFAULT 0,
  full_run_outs SMALLINT DEFAULT 0,
  stumpings SMALLINT DEFAULT 0,
  overs SMALLINT DEFAULT 0,
  runs_conceded SMALLINT DEFAULT 0,
  wickets SMALLINT DEFAULT 0,
  maidens SMALLINT DEFAULT 0,
  dot_balls SMALLINT DEFAULT 0,
  out BOOLEAN DEFAULT true
);

CREATE TABLE managers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  team_name VARCHAR(100) NOT NULL UNIQUE,
  user_id text UNIQUE,
  admin_level SMALLINT NOT NULL DEFAULT 1,
  pick_number SMALLINT DEFAULT 0,
  stage_1_squad SMALLINT[] DEFAULT '{}',
  stage_2_squad SMALLINT[] DEFAULT '{}',
  stage_3_squad SMALLINT[] DEFAULT '{}',
  shortlist SMALLINT[] DEFAULT '{}',
  stage_2_shortlist SMALLINT[] DEFAULT '{}',
  stage_3_shortlist SMALLINT[] DEFAULT '{}',
  auto_pick BOOLEAN NOT NULL DEFAULT false,
  min_req_first BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE vidiprinter (
  id SERIAL PRIMARY KEY,
  league_id SMALLINT NOT NULL,
  manager_id SMALLINT NOT NULL,
  player_id SMALLINT NOT NULL, 
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE leagues (
  id SERIAL PRIMARY KEY,
  admin_manager_id SMALLINT NOT NULL REFERENCES managers,
  manager_ids SMALLINT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE leagues (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  admin_manager_id SMALLINT NOT NULL,
  manager_ids SMALLINT[] DEFAULT '{}',
  draft_1_live BOOLEAN NOT NULL DEFAULT false,
  round SMALLINT NOT NULL DEFAULT 1,
  pick_number SMALLINT NOT NULL DEFAULT 1,
  up BOOLEAN NOT NULL DEFAULT true,
  last_pick BOOLEAN NOT NULL DEFAULT false,
  stage_2_date TEXT,
  stage_2_managers SMALLINT[][2] DEFAULT '{}',
  stage_2_teams SMALLINT[] DEFAULT '{}',
  stage_3_managers SMALLINT[][2] DEFAULT '{}',
  stage_3_teams SMALLINT[] DEFAULT '{}'
);
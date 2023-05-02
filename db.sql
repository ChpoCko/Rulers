DROP DATABASE IF EXISTS rulers;
CREATE DATABASE rulers;
USE rulers;


CREATE TABLE card (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  rarity VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  price SMALLINT NOT NULL,
  img_front VARCHAR(255) NOT NULL,
  img_back VARCHAR(255) NOT NULL,
  info_link VARCHAR(255) NOT NULL
);

DROP TABLE card;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  gems SMALLINT NOT NULL DEFAULT 0
);

DROP TABLE users;

CREATE TABLE card_owner (
  user_id INTEGER NOT NULL REFERENCES users(id),
  card_id INTEGER NOT NULL REFERENCES card(id)
);

DROP TABLE card_owner;


insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(1, 'diana', 'epic', 'burst dealer', 200, 'https://rulers-sh.com/Images/Epic-cards/FRONT/DIANA.webp', 'https://rulers-sh.com/Images/Epic-cards/BACK/DIANA-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/diana/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(25, 'yuumi', 'legendary', 'support', 400, 'https://rulers-sh.com/Images/Legendary-cards/FRONT/YUUMI.webp', 'https://rulers-sh.com/Images/Legendary-cards/BACK/YUUMI-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/yuumi/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(11, 'annie', 'rare', 'burst dealer', 100, 'https://rulers-sh.com/Images/Rare-cards/FRONT/ANNIE.webp', 'https://rulers-sh.com/Images/Rare-cards/BACK/ANNIE-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/annie/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(8, 'azir', 'legendary', 'burst dealer', 400, 'https://rulers-sh.com/Images/Legendary-cards/FRONT/AZIR.webp', 'https://rulers-sh.com/Images/Legendary-cards/BACK/AZIR-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/azir/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(2, 'ezreal', 'epic', 'burst dealer', 200, 'https://rulers-sh.com/Images/Epic-cards/FRONT/EZREAL.webp', 'https://rulers-sh.com/Images/Epic-cards/BACK/EZREAL-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/ezreal/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(20, 'vlad', 'rare', 'tank', 100, 'https://rulers-sh.com/Images/Rare-cards/FRONT/VLADIMIR.webp', 'https://rulers-sh.com/Images/Rare-cards/BACK/VLADIMIR-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/vladimir/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(4, 'ryze', 'epic', 'burst dealer', 200, 'https://rulers-sh.com/Images/Epic-cards/FRONT/RYZE.webp', 'https://rulers-sh.com/Images/Epic-cards/BACK/RYZE-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/ryze/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(12, 'darius', 'rare', 'tank', 100, 'https://rulers-sh.com/Images/Rare-cards/FRONT/DARIUS.webp', 'https://rulers-sh.com/Images/Rare-cards/BACK/DARIUS-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/darius/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(6, 'shyvana', 'epic', 'tank', 200, 'https://rulers-sh.com/Images/Epic-cards/FRONT/SHYVANA.webp', 'https://rulers-sh.com/Images/Epic-cards/BACK/SHYVANA-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/shyvana/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(13, 'garen', 'rare', 'tank', 100, 'https://rulers-sh.com/Images/Rare-cards/FRONT/GAREN.webp', 'https://rulers-sh.com/Images/Rare-cards/BACK/GAREN-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/garen/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(7, 'zyra', 'epic', 'burst dealer', 200, 'https://rulers-sh.com/Images/Epic-cards/FRONT/ZYRA.webp', 'https://rulers-sh.com/Images/Epic-cards/BACK/ZYRA-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/zyra/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(10, 'trynda', 'legendary', 'burst dealer', 400, 'https://rulers-sh.com/Images/Legendary-cards/FRONT/TRYNDAMERE.webp', 'https://rulers-sh.com/Images/Legendary-cards/BACK/TRYNDAMERE-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/tryndamere/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(15, 'shaco', 'rare', 'burst dealer', 100, 'https://rulers-sh.com/Images/Rare-cards/FRONT/SHACO.webp', 'https://rulers-sh.com/Images/Rare-cards/BACK/SHACO-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/shaco/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(18, 'yasuo', 'rare', 'burst dealer', 100, 'https://rulers-sh.com/Images/Rare-cards/FRONT/YASUO.webp', 'https://rulers-sh.com/Images/Rare-cards/BACK/YASUO-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/yasuo/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(14, 'nocturne', 'rare', 'burst dealer', 100, 'https://rulers-sh.com/Images/Rare-cards/FRONT/NOCTURNE.webp', 'https://rulers-sh.com/Images/Rare-cards/BACK/NOCTURNE-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/nocturne/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(5, 'shen', 'epic', 'tank', 200, 'https://rulers-sh.com/Images/Epic-cards/FRONT/SHEN.webp', 'https://rulers-sh.com/Images/Epic-cards/BACK/SHEN-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/shen/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(16, 'sion', 'rare', 'tank', 100, 'https://rulers-sh.com/Images/Rare-cards/FRONT/SION.webp', 'https://rulers-sh.com/Images/Rare-cards/BACK/SION-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/sion/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(9, 'master-yi', 'legendary', 'burst dealer', 400, 'https://rulers-sh.com/Images/Legendary-cards/FRONT/MASTER-YI.webp', 'https://rulers-sh.com/Images/Legendary-cards/BACK/MASTER-YI-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/master-yi/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(17, 'vi', 'rare', 'burst dealer', 100, 'https://rulers-sh.com/Images/Rare-cards/FRONT/VI.webp', 'https://rulers-sh.com/Images/Rare-cards/BACK/VI-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/vi/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(3, 'ori', 'epic', 'burst dealer', 200, 'https://rulers-sh.com/Images/Epic-cards/FRONT/ORI.webp', 'https://rulers-sh.com/Images/Epic-cards/BACK/ORI-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/orianna/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(19, 'zed', 'rare', 'burst dealer', 100, 'https://rulers-sh.com/Images/Rare-cards/FRONT/ZED.webp', 'https://rulers-sh.com/Images/Rare-cards/BACK/ZED-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/zed/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(30, 'katarina', 'rare', 'burst dealer', 100, 'https://rulers-sh.com/Images/Rare-cards/FRONT/KATARINA.webp', 'https://rulers-sh.com/Images/Rare-cards/BACK/KATARINA-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/katarina/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(22, 'tresh', 'epic', 'support', 200, 'https://rulers-sh.com/Images/Epic-cards/FRONT/TRESH.webp', 'https://rulers-sh.com/Images/Epic-cards/BACK/TRESH-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/thresh/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(29, 'zac', 'rare', 'tank', 100, 'https://rulers-sh.com/Images/Rare-cards/FRONT/ZAC.webp', 'https://rulers-sh.com/Images/Rare-cards/BACK/ZAC-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/zac/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(28, 'vex', 'rare', 'burst dealer', 100, 'https://rulers-sh.com/Images/Rare-cards/FRONT/VEX.webp', 'https://rulers-sh.com/Images/Rare-cards/BACK/VEX-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/vex/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(24, 'lee sin', 'legendary', 'tank', 400, 'https://rulers-sh.com/Images/Legendary-cards/FRONT/LEE-SIN.webp', 'https://rulers-sh.com/Images/Legendary-cards/BACK/LEE-SIN-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/lee-sin/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(21, 'alistar', 'epic', 'support', 200, 'https://rulers-sh.com/Images/Epic-cards/FRONT/ALISTAR.webp', 'https://rulers-sh.com/Images/Epic-cards/BACK/ALISTAR-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/alistar/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(27, 'singed', 'rare', 'tank', 100, 'https://rulers-sh.com/Images/Rare-cards/FRONT/SINGED.webp', 'https://rulers-sh.com/Images/Rare-cards/BACK/SINGED-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/singed/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(26, 'leona', 'rare', 'support', 100, 'https://rulers-sh.com/Images/Rare-cards/FRONT/LEONA.webp', 'https://rulers-sh.com/Images/Rare-cards/BACK/LEONA-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/leona/');
insert into card(id, name, rarity, role, price, img_front, img_back, info_link) values(23, 'poppy', 'epic', 'support', 200, 'https://rulers-sh.com/Images/Epic-cards/FRONT/POPPY.webp', 'https://rulers-sh.com/Images/Epic-cards/BACK/POPPY-BACK.webp', 'https://www.leagueoflegends.com/en-us/champions/poppy/');

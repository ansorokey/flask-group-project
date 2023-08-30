from app.models import db, Avatar, environment, SCHEMA
from sqlalchemy.sql import text


def seed_base_avatars():
    bulb = Avatar(is_starter=True, url='https://res.cloudinary.com/dzntryr5a/image/upload/v1693264304/level_up_avatars/001_Bulbasaur_htvvhs.jpg')
    ivy = Avatar(url='https://res.cloudinary.com/dzntryr5a/image/upload/v1693264304/level_up_avatars/002_Ivysaur_gu1ypl.jpg')
    venus = Avatar(url='https://res.cloudinary.com/dzntryr5a/image/upload/v1693264304/level_up_avatars/003_Venesaur_xtwyqu.jpg')

    char = Avatar(is_starter=True, url='https://res.cloudinary.com/dzntryr5a/image/upload/v1693264304/level_up_avatars/004_Charmander_ezp5zr.jpg')
    charm = Avatar(url='https://res.cloudinary.com/dzntryr5a/image/upload/v1693264304/level_up_avatars/005_Charmeleon_urnrvm.jpg')
    charz = Avatar(url='https://res.cloudinary.com/dzntryr5a/image/upload/v1693264304/level_up_avatars/006_Charizard_bxpzjg.jpg')

    squirt = Avatar(is_starter=True, url='https://res.cloudinary.com/dzntryr5a/image/upload/v1693264304/level_up_avatars/007_Squirtle_kkzcrv.jpg')
    wart = Avatar(url='https://res.cloudinary.com/dzntryr5a/image/upload/v1693264304/level_up_avatars/008_Wartortle_cpf55x.jpg')
    blast = Avatar(url='https://res.cloudinary.com/dzntryr5a/image/upload/v1693264304/level_up_avatars/009_Blastoise_klcwy6.jpg')

    poke = [bulb, ivy, venus, char, charm, charz, squirt, wart, blast]
    for p in poke:
        db.session.add(p);

    db.session.commit()

def undo_base_avatars():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.habits RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM avatars"))

    db.session.commit()

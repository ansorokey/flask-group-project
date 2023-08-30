from .db import db, environment, SCHEMA

class Avatar(db.Model):
    __tablename__ = 'avatars'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    is_starter = db.Column(db.Boolean, default=False)
    url = db.Column(db.String(255))

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url
        }

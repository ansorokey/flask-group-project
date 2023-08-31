from .db import db, add_prefix_for_prod
from datetime import datetime


class ToDo(db.Model):
    __tablename__ = "todos"  # we can change this if we need to

        # If production, use render schema
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    due_date = db.Column(db.Date, nullable=True)
    completed = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    user_id = db.Column(db.Integer)

    # This can be uncommented if the relationship is established and needed
    # user = db.relationship("User", back_populates="todos")

    def to_dict(self):
        """ Convert the model instance to a dictionary format. Useful for JSON responses """
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "due_date": self.due_date,
            "completed": self.completed,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

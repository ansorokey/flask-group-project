from .db import db, add_prefix_for_prod

class ToDo(db.Model):
    __tablename__ = "todos"  # we can change this if we need to 

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    due_date = db.Column(db.Date, nullable=True)
    completed = db.Column(db.Boolean, default=False, nullable=False)

    # going to assume the User model's table is named 'users'
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    # gotta doublecheck to make sure the associations check out
    
    user = db.relationship("User", back_populates="todos")
   # this is here in case we will need it in JSON format for the front end
    def to_dict(self):
        """ Optional: Convert the model instance to a dictionary format. Useful for JSON responses """
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "due_date": self.due_date,
            "completed": self.completed,
            "user_id": self.user_id
        }

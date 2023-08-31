from app.models import db, ToDo, User, environment, SCHEMA
from datetime import datetime, timedelta
from sqlalchemy.sql import text

# Sample todos for each user
todos_samples = {
    'Demo': [
        {
            "title": "Finish project",
            "description": "Complete final project and deploy it",
            "due_date": datetime.now() + timedelta(days=3),
            "completed": False
        },
        {
            "title": "Read book",
            "description": "Read 'The Great Gatsby'",
            "due_date": datetime.now() + timedelta(days=10),
            "completed": False
        }
    ],
    'marnie': [
        {
            "title": "Go for a run",
            "description": "Complete 5km morning run",
            "due_date": datetime.now() + timedelta(days=1),
            "completed": False
        }
    ],
    'bobbie': [
        {
            "title": "Visit dentist",
            "description": "Regular check-up",
            "due_date": datetime.now() + timedelta(days=7),
            "completed": False
        }
    ]
}

def seed_todos():
    for username, todos in todos_samples.items():
        user = User.query.filter_by(username=username).first()
        if user:  # Ensure the user exists before adding todos
            for todo_data in todos:
                todo = ToDo(
                    user_id=user.id,
                    **todo_data  # Unpack todo_data into the ToDo constructor
                )
                db.session.add(todo)
    db.session.commit()

def undo_todos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.todos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM todos"))

    db.session.commit()

# Modified the original below to include the schema for production
# def undo_todos():
#     db.session.execute("DELETE FROM todos")
#     db.session.commit()


# if __name__ == "__main__":
#     seed_todos()

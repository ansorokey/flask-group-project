"""create habits table

Revision ID: 7bc612a21204
Revises: 4672152826f8
Create Date: 2023-08-28 20:57:46.499388

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import functions
from datetime import datetime, date, timedelta

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '7bc612a21204'
down_revision = '4672152826f8'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('habits',
    sa.Column('id', sa.Integer, primary_key=True),
    sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id'), nullable=False),
    sa.Column('title', sa.String(255), nullable=False),
    sa.Column('notes', sa.String(255), default=''),
    sa.Column('difficulty', sa.Integer(), default=2),
    sa.Column('frequency', sa.Enum('daily', 'weekly', 'monthly'), default='daily'),
    sa.Column('date_to_reset', sa.String, default=date.today()+timedelta(days=1)),
    sa.Column('strength', sa.Integer, default=0),
    sa.Column('pos', sa.Boolean, default=True),
    sa.Column('neg', sa.Boolean, default=True),
    sa.Column('pos_count', sa.Integer, default=0),
    sa.Column('neg_count', sa.Integer, default=0),
    sa.Column('created_at', sa.DateTime, default=functions.now()),
    sa.Column('updated_at', sa.DateTime, default=functions.now())
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('habits')

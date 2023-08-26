"""add habit model

Revision ID: e169266d82e4
Revises: ffdc0a98111c
Create Date: 2023-08-18 06:36:53.260548

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import functions
from datetime import datetime, date, timedelta

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'e169266d82e4'
down_revision = 'ffdc0a98111c'
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
    sa.Column('strength', sa.Enum('Neutral', 'Weak', 'Strong'), default='Neutral'),
    sa.Column('pos', sa.Boolean, default=True),
    sa.Column('neg', sa.Boolean, default=True),
    sa.Column('pos_count', sa.Integer, default=0),
    sa.Column('neg_count', sa.Integer, default=0),
    sa.Column('created_at', sa.DateTime, default=functions.now()),
    sa.Column('updated_at', sa.DateTime, default=functions.now())
    )


def downgrade():
    op.drop_table('habits')

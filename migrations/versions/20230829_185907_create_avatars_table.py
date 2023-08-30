"""create avatars table

Revision ID: 930145f17936
Revises: 27d7b093c012
Create Date: 2023-08-29 18:59:07.426094

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '930145f17936'
down_revision = '27d7b093c012'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('avatars',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('is_starter', sa.Boolean, default=False),
        sa.Column('url', sa.String(length=255))
    )

    if environment == "production":
        op.execute(f"ALTER TABLE avatars SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('avatars');

"""empty message

Revision ID: f9cb7f76d08b
Revises: f177dab3093c
Create Date: 2021-11-17 18:48:26.300015

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f9cb7f76d08b'
down_revision = 'f177dab3093c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('down_vote_question',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('question_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['question_id'], ['questions.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('up_vote_question',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('question_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['question_id'], ['questions.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('down_vote_answer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('answer_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['answer_id'], ['answers.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('up_vote_answer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('answer_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['answer_id'], ['answers.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('upVote_answer')
    op.drop_table('upVote_question')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('upVote_question',
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('question_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('upVote', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['question_id'], ['questions.id'], name='upVote_question_question_id_fkey'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='upVote_question_user_id_fkey'),
    sa.PrimaryKeyConstraint('user_id', 'question_id', name='upVote_question_pkey')
    )
    op.create_table('upVote_answer',
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('answer_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('upVote', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['answer_id'], ['answers.id'], name='upVote_answer_answer_id_fkey'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='upVote_answer_user_id_fkey'),
    sa.PrimaryKeyConstraint('user_id', 'answer_id', name='upVote_answer_pkey')
    )
    op.drop_table('up_vote_answer')
    op.drop_table('down_vote_answer')
    op.drop_table('up_vote_question')
    op.drop_table('down_vote_question')
    # ### end Alembic commands ###
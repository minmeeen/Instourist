from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from typing import List
from pydantic import BaseModel

Base  = declarative_base()

class Post(Base):
    __tablename__ = 'initail_data'
    initial_id  = Column(Integer, primary_key=True)
    user_id = Column(String)
    username = Column(String)
    full_name = Column(String)
    caption = Column(String)
    create_at = Column(DateTime(timezone=True), server_default=func.now())
    taken_at = Column(DateTime(timezone=True), onupdate=func.now())
    location_id = Column(Integer, ForeignKey('location.location_id'))

    author = relationship('Author')


class Location(Base):
    __tablename__ = 'location'
    location_id = Column(Integer, primary_key=True)
    location_name = Column(String)
    # ig_location = Column(Integer[])
    # created_at = Column(DateTime(timezone=True), server_default=func.now())
    # updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class LangugesResponse(BaseModel):
    languageName : str
    total : int


class LanguageDetectedResponse(BaseModel):
    NumberOfPosts : int
    Languges : List[LangugesResponse] = []
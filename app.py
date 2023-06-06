import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pandas as pd

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///nobel_prize_winners.db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)
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

# Save reference to the table
Winners = Base.classes.nobel_winners

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return(
        f"Available routes: <br/>"
        f"/api/v1.0/Year<br/>"
        f"/api/v1.0/Firstname<br/>"
        f"/api/v1.0/Lastname<br/>"
        f"/api/v1.0/Category<br/>"
        f"/api/v1.0/Gender<br/>"
        f"/api/v1.0/Motivation<br/>"
        f"/api/v1.0/Birth_Date<br/>"
        f"/api/v1.0/Birth_Country<br/>"
        f"/api/v1.0/Death_Date<br/>"
    )

@app.route("/api/v1.0/Year<br/>")
def Year():
    #Create our session (link) from Python to the DB
    session = Session(engine)

    #Query all years
    results = session.query(Winners.Year).all()

    session.close()

    return jsonify(results)





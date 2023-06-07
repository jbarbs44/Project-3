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
        f"/api/v1.0/Name<br/>"
        f"/api/v1.0/Gender<br/>"
        f"/api/v1.0/Winners"
    )

@app.route("/api/v1.0/Year")
def Year():
    #Create our session (link) from Python to the DB
    session = Session(engine)

    #Query all years
    results = session.query(Winners.Year).all()

    session.close()

    return jsonify(results)

@app.route("/api/v1.0/Name")
def Name():
    #Create our session (link) from Python to the DB
    session = Session(engine)

    #Query all names
    results = session.query(Winners.Name).all()

    session.close()

    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)

@app.route("/api/v1.0/Gender")
def Gender():
    #Create our session (link) from Python to the DB
    session = Session(engine)

    #Query gender for all 
    results = session.query(Winners.Gender).all()

    session.close()

    return jsonify(results)

@app.route("/api/v1.0/Winners<br/>")
def Winners():
    #Create our session (link) from Python to the DB
    session = Session(engine)

    #Query all Winners with information for markers
    results = session.query(Winners.Name, Winners.Year, Winners.Category, 
                            Winners.Gender, Winners.Motivation, Winners.Birth_Date,
                            Winners.Birth_Country, Winners.Death_Date).all()
    
    session.close()

    # Create a dictionary from the row data and append to a list of all_winners
    all_winners = []
    for Name, Year, Category, Gender, Motivation, Birth_Date, Birth_Country, Death_Date in results:
        winner_dict = {}
        winner_dict["Name"] = Name
        winner_dict["Year"] = Year
        winner_dict["Category"] = Category
        winner_dict["Gender"] = Gender
        winner_dict["Motivation"] = Motivation
        winner_dict["Birth_Date"] = Birth_Date
        winner_dict["Birth_Country"] = Birth_Country
        winner_dict["Death_Date"] = Death_Date
        all_winners.append(winner_dict)
    
    return jsonify(all_winners)


    








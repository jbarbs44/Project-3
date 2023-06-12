import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
import pandas as pd
from datetime import datetime
from flask import Flask, jsonify, render_template
import folium
import requests


map = folium.Map(location=[0, 0], zoom_start=2)
#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///data/nobel_prize.db")

inspector = inspect(engine)
print(inspector.get_table_names())
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine, reflect = True)

# Save reference to the table
Winners = Base.classes.recipients

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
    return render_template('index.html')


@app.route("/api/v1.0/year")
def NobelYear():
    #Create our session (link) from Python to the DB
    session = Session(engine)

    #Query all years
    results = session.query(Winners.Year).all()

    # Close the session
    session.close()

    # Convert list of tuples into normal list and assign year as integer
    years = [int(year) for year in np.ravel(results)]

    return jsonify(years)

@app.route("/api/v1.0/name")
def NobelName():
    #Create our session (link) from Python to the DB
    session = Session(engine)

    #Query all names
    results = session.query(Winners.Name).all()

    # Close the session
    session.close()

    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)

@app.route("/api/v1.0/gender")
def NobelGender():
    #Create our session (link) from Python to the DB
    session = Session(engine)

    #Query gender for all 
    results = session.query(Winners.Gender).all()

    # Close the session
    session.close()

    # Convert list of tuples into normal list
    genders = list(np.ravel(results))

    return jsonify(genders)

@app.route("/api/v1.0/winners")
def NobelWinners():
    #Create our session (link) from Python to the DB
    session = Session(engine)

    #Query all Winners with information for markers
    results = session.query(Winners.Name, Winners.Year, Winners.Category, 
                            Winners.Gender, Winners.Motivation, Winners.Birth_Date,
                            Winners.Birth_Country, Winners.Death_Date).all()
    
    # Close the session
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
        # Retrieve Wikipedia data


        all_winners.append(winner_dict)

    return jsonify(all_winners)
    


if __name__ == '__main__':
    app.run(debug=True)








from flask import Flask,render_template, request, jsonify, send_file
from flask import session
from flask_session import Session
from flask_mysqldb import MySQL
from flask_cors import CORS
from datetime import timedelta
import os

from basic_pitch.inference import predict
from basic_pitch import ICASSP_2022_MODEL_PATH

import json
import pretty_midi
import numpy as np
# For plotting
import mir_eval.display
import librosa.display
import matplotlib.pyplot as plt

# For putting audio in the notebook
import IPython.display
from music21 import *
import music21

# -------------------- AUDIO RECOGNITION SETTINGS --------------------
us = environment.UserSettings()
us['lilypondPath'] = 'D:/lilypond-2.24.3/bin/lilypond.exe'
us['directoryScratch'] = str(os.getcwd())+'/Output'
print(us['directoryScratch'])
directoryScratch = us['directoryScratch']
# us['lilypondPath'] = '/Processing'
# us['directoryScratch'] = '/tmp'

# --------------------



app = Flask(__name__)
app.secret_key = "nanananananan"

# Configuring Session
app.config['PERMANENT_SESSION_LIFETIME'] = 60 * 5  # Session Lifetime
app.config['SESSION_TYPE'] = "filesystem"  # Session Storage Type


# Path to Storing Session
app.config['SESSION_FILE_DIR'] = "session_data"

# Initializing the Session Extension
Session(app)
CORS(app)

 
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'note_harbor'
 
mysql = MySQL(app)

# Setting Lifetime of Sessions
app.permanent_session_lifetime = timedelta(minutes=5)


@app.after_request
def set_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    return response


@app.route('/createAcc', methods=['POST'])
def createAcc():
    name = request.json['username']
    password = request.json['password']
    print(request.json)
    print(name)
    print(password)
    cursor = mysql.connection.cursor()

    cursor.execute(''' SELECT * FROM USERS WHERE NAME = %s''',[name])
    data = cursor.fetchall()

    # return jsonify(data)

    if len(data) != 0:
        mysql.connection.commit()
        cursor.close()
        return jsonify({"message": "Username already exists"})

    cursor.execute(''' INSERT INTO USERS (NAME, PASSWORD) VALUES(%s,%s)''',(name ,password))
    mysql.connection.commit()
    cursor.close()
    return jsonify({"message": "Done!!"})
        

@app.route('/login', methods=['POST'])
def login():
    name = request.json['username']
    password = request.json['password']
    # print(request.json)
    # print(name)
    # print(password)
    cursor = mysql.connection.cursor()

    cursor.execute(''' SELECT ID, NAME FROM USERS WHERE NAME = %s AND PASSWORD = %s''',(name ,password))
    data = cursor.fetchall()

    # return jsonify(data)


    if len(data) != 0:
        print(data)
        # print(session)


        mysql.connection.commit()
        cursor.close()
        # return "Logged in Succesfully"
        
        return jsonify(data)

    return "Wrong username or password"

@app.route('/getFiles', methods=['POST'])
def getFiles():
    user = request.json.get('user')

    print(user)

    # return jsonify("hello")
    cursor = mysql.connection.cursor()

    cursor.execute(''' SELECT PATH FROM ATTACHMENTS WHERE ID_USER = %s''',(user,))
    data = cursor.fetchall()

    print(data)

    mysql.connection.commit()
    cursor.close()

    return jsonify(data)


@app.route('/upload', methods=['POST'])
def uploadFile():
    file = request.files['file']

    id = request.form.get('id')
    position = request.form.get('position')

    filename = id+position+'_'+file.filename

    print("--------------------")
    print(file)
    print(id)
    print(position)
    print(filename)
    
    print("--------------------")

    # Save file to device to 
    file.save(os.path.join("Processing", filename))


    processingPath = os.path.join("Processing", filename)
    print(processingPath)
    print("directoryScratch: " + str(directoryScratch))
    print("--------------------")

    model_output, midi_data, note_events = predict(processingPath)

    # print(model_output)

    midi_data.write('output.mid')
    midi_file = open('output.mid')

    parsed = music21.converter.parse('output.mid')
    # print(parsed)

    conv =  music21.converter.subConverters.ConverterLilypond()
    scorename = filename.split('.', 1)[0]
    filepath = str(os.getcwd())+'/Output/' + scorename
    conv.write(parsed, fmt = 'lilypond', fp=filepath, subformats = ['pdf'])

    #---------- add to table ----------
    cursor = mysql.connection.cursor()
    cursor.execute(''' INSERT INTO ATTACHMENTS (ID_USER, PATH) VALUES (%s, %s)''',(id,scorename))
    mysql.connection.commit()
    cursor.close()

    #---------- delete processed file ----------
    try:
        os.remove(processingPath)
    except Exception as e:
        return str(e)

    try:
        return scorename
    except Exception as e:
        return str(e)


@app.route('/download', methods=['POST', 'GET'])
def download():
    filename = request.args.get('filename')
    #print(filename)
    pdf = str(os.getcwd()) + '/Output/' + filename + '.pdf'
    
    try:
        return send_file(pdf)
    except Exception as e:
        return str(e)


@app.route('/deleteFile', methods=['POST'])
def deleteFiles():
    filename = request.form.get('filename')

    cursor = mysql.connection.cursor()
    cursor.execute(''' DELETE FROM ATTACHMENTS WHERE PATH = %s''',(filename,))
    mysql.connection.commit()
    cursor.close()
    pdf = str(os.getcwd()) + '/Output/' + filename + '.pdf'

    print(filename)

    try:
        os.remove(str(os.getcwd()) + '/Output/' + filename + '.pdf')
    except Exception as e:
        return str(e)
    
    try:
        os.remove(str(os.getcwd()) + '/Output/' + filename)
    except Exception as e:
        return str(e)

    return "File Deleted"


app.run(host='localhost', port=5000)
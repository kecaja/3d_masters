from flask import Flask, render_template
# from flask_sqlalchemy import SQLAlchemy
import csv, json

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://Jacek:password@localhost:5432/mrbd'
app.config['SECRET_KEY'] = '\xf6\xe8\x95\xe3\xbbq\x181q\xa1\x8e\x16\xba\xbb\xaa\x0ey\x18\xf9\xef\xcc\xf3\xa3\x82'

# db = SQLAlchemy(app)

# class Project(db.Model):
#     __tablename__ = 'projects'
#     project_id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(length=50))

filepath = r'bricks.csv'
def points_to_json(filepath):
    data = {}
    with open(filepath) as csvf:
        csvReader = csv.DictReader(csvf, delimiter=';')
        for rows in csvReader:
            data[rows['0']] = rows['1']
    return data
    

@app.route("/")
def show_projects():
    # db = get_db()
    # cur = db.execute('select * from bricks')
    # bricks = cur.fetchall()
    bricks = points_to_json(filepath)
    x_max = 10
    return render_template("index.html", bricks=bricks, x_max=x_max)

@app.route("/project/<project_id>")
def show_tasks(project_id):
    return render_template("project-tasks.html", project_id=project_id)

@app.route("/add/project", methods=['POST'])
def add_project():
    #add project
    return "Project added successfully"

@app.route("/add/task/<project_id>", methods = ["POST"])
def add_task(project_id):
    #add task
    return "Task added successfully"

app.run(debug=True, host='127.0.0.1',port=3000)
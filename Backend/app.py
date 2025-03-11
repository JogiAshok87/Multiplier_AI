from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager, create_access_token
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
# from pymongo import MongoClient
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai
from pydantic import BaseModel
from fastapi import HTTPException

# Loading environment variable from .env
load_dotenv()



# flask app Initialization
app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/Authentication"
mongo = PyMongo(app)

# # Configure JWT
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Initialization Bcrypt for password hashing
bcrypt = Bcrypt(app)

UPLOAD_FOLDER = 'uploads'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
    
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "pdf", "docx"}

# Function to check allowed files
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


#Reference to Generate-content collection
generate_content_collection = mongo.db.generateContentData

@app.route("/generateContent",methods=['POST'])
def generateContent():
    try:
        campaignName = request.form.get('campaignName')
        content = request.form.get('content')
        # selectedCohort = request.form.get('selectedCohort')
        selectedChannels = request.form.get('selectedChannels')
        selectedPlatforms = request.form.get('selectedPlatforms')
        file = request.files.get('file')
        
        file_path = None
        if file:
            filename = file.filename
            file_path = os.path.join(UPLOAD_FOLDER,filename)
            file.save(file_path)
            
        data = {
            'campaignName': campaignName,
            'content': content,
            # 'selectedCohort': selectedCohort,
            'selectedChannels': selectedChannels,
            'selectedPlatforms': selectedPlatforms,
            'file_path': file_path
            
        }
        result = generate_content_collection.insert_one(data)
        
        return jsonify({'message':'Content saved successfully!', 'id':str(result.inserted_id)}),201
        
    except Exception as e:
        return jsonify({'error': str(e)}),500

# Reference to campaigns collection
campaigns_collection = mongo.db.campaigns

# Route to handle campaign data submission
@app.route('/campaign', methods=['POST'])
def campaign():
    try:
        # Getting form data instead of JSON
        campaign_name = request.form.get("campaignName")
        campaign_content = request.form.get("campaignContent")

        # Handling multiple files
        files = request.files.getlist("campaignFiles")
        file_paths = []

        for file in files:
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
                file.save(file_path)
                file_paths.append(file_path)  # Store file path in DB

        # Inserting into MongoDB
        campaign_id = campaigns_collection.insert_one({
            "campaignName": campaign_name,
            "campaignContent": campaign_content,
            "campaignFiles": file_paths  # Store list of file paths
        }).inserted_id

        return jsonify({"message": "Campaign saved successfully!", "id": str(campaign_id)}), 201
    except Exception as e:
        return jsonify({"error":str(e)}),500
    
# Reference to doctors collection
doctorsList_collection = mongo.db.HCPData

@app.route("/HCPData", methods=['GET','POST'])
def HCPData():
    if request.method == "GET":
        try:
            doctors = list(doctorsList_collection.find({}, {"_id": 0}).limit(100)) #gets all documents from the collection
            return jsonify(doctors), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    

    
@app.route('/login',methods=['POST'])
def login():
     try:

        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        # Find user by full name
        user = mongo.db.users.find_one({'username':username})

        if not user:
        # If user does not exist, register them
            hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
            user = {
                'username': username,
                'password': hashed_password
            }
            mongo.db.users.insert_one(user)
        else:
            # If user exists, verify the password
            if not bcrypt.check_password_hash(user['password'], password):
                return jsonify({"message": "Invalid credentials"}), 400

         # Create JWT token
        access_token = create_access_token(identity={'id': str(user['_id'])}, expires_delta=False)
        return jsonify({"message": "Login Successfully", "token": access_token}), 200

     except Exception as err:
        return jsonify({"message": "Server Error", "error": str(err)}), 500

 
class PromptRequest(BaseModel):
    prompt: str
    
@app.route("/chat", methods=["POST"])
def chat():
    """Handles incoming prompt requests and returns OpenAI response."""
    try:
        data = request.get_json()  # Extract JSON data from the request
        prompt = data.get("prompt")  # Get the prompt text
        cohort_data = data.get("cohortData")  # Get the cohort data

        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400

        # Construct a message incorporating the cohort data
        system_message = "You are a helpful AI assistant."
        user_message = prompt

        if cohort_data:
            cohort_info = f"Use the following cohort information to refine your response: {cohort_data}"
            user_message = f"{cohort_info}\n\n{prompt}"

        # OpenAI API call
        client = openai.OpenAI(api_key=OPENAI_API_KEY)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message}
            ],
            max_tokens=200
        )

        return jsonify({"response": response.choices[0].message.content})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# @app.route("/chat")
# async def chat(request: PromptRequest):
#     """Handles incoming prompt requests from the frontend and returns OpenAI response."""
#     try:
#         data = request.get_json()  # Extract JSON data from the request
#         prompt = data.get("prompt")  # Get the prompt text
        
#         if not prompt:
#             return jsonify({"error": "Prompt is required"}), 400

#         # OpenAI API call
#         client = openai.OpenAI(api_key=OPENAI_API_KEY)
#         response = client.chat.completions.create(
#             model="gpt-3.5-turbo",
#             messages=[
#                 {"role": "system", "content": "You are a helpful AI assistant."},
#                 {"role": "user", "content": prompt}
#             ],
#             max_tokens=200
#         )

#         return jsonify({"response": response.choices[0].message.content})
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
   
   
@app.route('/')
def home():
    return "Flask backend is running!"




if __name__ == "__main__":
    app.run(debug=True)



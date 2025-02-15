from fastapi import Depends, FastAPI
from starlette.middleware.cors import CORSMiddleware

from backend.auth import User, create_access_token, get_current_admin_user, get_current_user
from backend.database import insert_employee, select_employees
from backend.openai_bot import create_smartsidur, extract_json_from_ai_response


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[   # Allows CORS from React app
        "http://localhost:3000",  # Local frontend
        "https://smart-sidur-frontend.onrender.com"  # Render frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/") 
def read_root() -> dict:
    return {"Hello": "World"}


@app.post("/generate")
def generate_sidur(prefs:dict) -> dict | None:
    return extract_json_from_ai_response(create_smartsidur(prefs))


@app.post("/employee")
def create_employee(data:dict) -> dict:
    return insert_employee(data)

@app.get("/employees")
def get_employees() -> list:
    return select_employees()

@app.post("/token")
def generate_access_token(first_name: str, password: str) -> dict:
    user_data = {"first_name": first_name, "password": password}
    access_token = create_access_token(data=user_data)
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/admin")
def verify_admin_auth(current_user: User = Depends(get_current_admin_user)):
    return {"message": f"Welcome, {current_user.first_name}"}

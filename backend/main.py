from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

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
def post_workshift_prefs(prefs:dict) -> dict | None:
    return extract_json_from_ai_response(create_smartsidur(prefs))


@app.post("/employee")
def create_employee(data:dict) -> dict:
    return insert_employee(data)

@app.get("/employees")
def get_employees() -> list:
    return select_employees()

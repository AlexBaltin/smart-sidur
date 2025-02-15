from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String
from .settings import DATABASE_URL

# Database connection
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


class Employee(Base):
    __tablename__ = "employee"

    id = Column(Integer, primary_key=True, index=True) 
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns if column.name != "password"}


Base.metadata.create_all(bind=engine)


def insert_employee(employee_data:dict) -> dict:
    db = SessionLocal()

    new_employee = Employee(
        first_name=employee_data["first_name"],
        last_name=employee_data["last_name"],
        email=employee_data["email"]
    )

    db.add(new_employee)
    db.commit()

    db.refresh(new_employee)
    print(f"Employee {new_employee.first_name} {new_employee.last_name} inserted successfully with ID {new_employee.id}")

    db.close()

    return new_employee.to_dict()


def select_employees() -> list:
    db = SessionLocal()

    employees = db.query(Employee).all()
    employees_dict = [employee.to_dict() for employee in employees]

    db.close()

    return employees_dict

from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

app = FastAPI()

class Model(BaseModel):
    name: str

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/")
async def post_root(body: Model):
     return {"message": body.name}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
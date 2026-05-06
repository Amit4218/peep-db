from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

# Register templates
templates = Jinja2Templates(directory="templates")

# Register static files
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/root")
def root() -> dict[str, str]:
    return {"status": "App running"}


@app.get("/", response_class=HTMLResponse)
def home(req: Request):
    return templates.TemplateResponse(request=req, name="pages/home.html")

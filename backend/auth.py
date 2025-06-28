from fastapi import Request, HTTPException
import firebase_admin
from firebase_admin import auth, credentials

# Only initialize once
cred = credentials.Certificate("firebase-service-account.json")
firebase_admin.initialize_app(cred)

def verify_token(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid auth header")

    token = auth_header.split(" ")[1]
    try:
        decoded = auth.verify_id_token(token)
        return decoded["uid"]
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid Firebase ID token")

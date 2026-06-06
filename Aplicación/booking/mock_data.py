from datetime import datetime, timedelta


CAMPAIGNS = [
    {"id": "influenza", "name": "Influenza"},
    {"id": "covid-19", "name": "COVID-19"},
    {"id": "sarampion", "name": "Sarampión"},
]

VACCINES_BY_CAMPAIGN = {
    "influenza": ["Influvac Tetra", "Vaxigrip Tetra"],
    "covid-19": ["Comirnaty", "Spikevax"],
    "sarampion": ["Triple Viral", "SRP"],
}

POINTS_BY_CAMPAIGN = {
    "influenza": ["CESFAM Central", "Hospital Norte"],
    "covid-19": ["Hospital Norte", "Centro Comunitario Sur"],
    "sarampion": ["CESFAM Central", "Punto Móvil Plaza"],
}


def get_campaigns():
    print("[DB] Consultando campañas activas...")
    return CAMPAIGNS


def get_vaccines(campaign_id):
    print(f"[DB] Consultando vacunas para la campaña {campaign_id}...")
    return VACCINES_BY_CAMPAIGN.get(campaign_id, [])


def get_points(campaign_id):
    print(f"[DB] Consultando puntos de vacunación para la campaña {campaign_id}...")
    return POINTS_BY_CAMPAIGN.get(campaign_id, [])


def get_slots(campaign_id, vaccine, point):
    print(f"[DB] Consultando horarios disponibles para campaña={campaign_id}, vacuna={vaccine}, punto={point}...")
    start = datetime.now().replace(minute=0, second=0, microsecond=0) + timedelta(days=1)
    return [(start + timedelta(hours=2 * index)).strftime("%Y-%m-%d %H:%M") for index in range(1, 6)]


def is_available(campaign_id, vaccine, point, slot):
    print(f"[DB] Validando disponibilidad para campaña={campaign_id}, vacuna={vaccine}, punto={point}, horario={slot}...")
    blocked_selection = ("covid-19", "Spikevax", "Centro Comunitario Sur")
    if (campaign_id, vaccine, point) == blocked_selection:
        return False
    return True


def create_reservation(user_name, campaign_id, vaccine, point, slot):
    print("[DB] Registrando reserva...")
    reservation_code = f"RES-{campaign_id[:3].upper()}-{abs(hash((user_name, campaign_id, vaccine, point, slot))) % 100000:05d}"
    return {
        "reservation_code": reservation_code,
        "user_name": user_name,
        "campaign_id": campaign_id,
        "campaign_name": next(item["name"] for item in CAMPAIGNS if item["id"] == campaign_id),
        "vaccine": vaccine,
        "point": point,
        "slot": slot,
    }

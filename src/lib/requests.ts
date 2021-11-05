
export const BROKER_URL = "http://localhost:8000"

export interface Sensor {
  id: number,
  sensor_id: string,
  nickname: string,
  dry_reading?: number,
  wet_reading?: number,
  current_reading?: number
}

export interface UpdateSensor {
  id: number,
  nickname?: string,
  dry_reading?: number,
  wet_reading?: number,
}

export const getSensors = async (): Promise<Sensor[]> => {
  let res = await fetch(BROKER_URL);
  if (res.ok) {
    return await res.json();
  } else {
    throw "Failed to contact broker";
  }
}

export const updateSensor = async (data: UpdateSensor): Promise<Sensor> => {
  let res = await fetch(`${BROKER_URL}/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    return await res.json();
  } else {
    throw res.body;
  }
}

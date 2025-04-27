import { useEffect, useState } from "react";

export const useDeviceId = () => {
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    let id = localStorage.getItem("device_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("device_id", id);
    }
    setDeviceId(id);
  }, []);

  return deviceId;
};

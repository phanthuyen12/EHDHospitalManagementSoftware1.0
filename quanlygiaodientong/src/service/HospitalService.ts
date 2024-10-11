import { Hospital } from './../model/HospitalModel';
const API_URL = 'http://42.96.2.80:3002'; // Cập nhật URL chính xác

export const createHospital = async (hospital: Hospital): Promise<Hospital> => {
  const response = await fetch(`${API_URL}/creater-org/`, {
    method: "POST",
    body: JSON.stringify(hospital),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to create hospital: ${response.statusText}`);
  }

  // Chuyển đổi phản hồi thành JSON và trả về đối tượng kiểu Hospital
  const data: any = await response.json();
  return data;  // Trả về đối tượng Hospital
};

import { useEffect, useState } from 'react';
import { Hospital } from '../model/HospitalModel';
import { createHospital } from '../service/HospitalService';

export const useHospital = () => {
  const [dataHospital, setDataHospital] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);

  const addHospital = async (hospital: Hospital) => {
    try {
      setLoading(true);  // Bắt đầu quá trình tải
      const newHospital = await createHospital(hospital);
      
      // Cập nhật danh sách bệnh viện khi tạo thành công
      setDataHospital([...dataHospital, newHospital]);

      // Thông báo thành công
      setSuccess('Hospital created successfully!');
      return newHospital;
    } catch (error) {
      console.error('Failed to create hospital', error);
      return error
    } finally {
      setLoading(false);  // Kết thúc quá trình tải
    }
  };

  return {
    dataHospital,
    loading,
    success,  // Trạng thái thành công
    addHospital,
  };
};

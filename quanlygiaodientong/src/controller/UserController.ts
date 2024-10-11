import {UserModel} from '../model/UserModel';
import {loginUser} from '../service/UserService';
import {useState} from 'react';
export const useloginUser = ()=>{
    const [dataUser, setdataUser] = useState<UserModel[]>([]);
    const LoginUser = async (user: UserModel) => {
        try {
          const newHospital = await loginUser(user);
    
          return newHospital;
        } catch (error) {
          console.error('Failed to create hospital', error);
          return error
        }
      };
}
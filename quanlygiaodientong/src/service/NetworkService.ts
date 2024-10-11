const API_URL = 'http://42.96.2.80:3002'; // Cập nhật URL chính xác
export const newNetworkNoSql = async (networkName: string): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/networkapi/create`, {
      method: "POST",
      body: JSON.stringify({
        "networkName": networkName,
        "status": "false",
        "chaincodeName": "Medical,Hospital",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: any = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create network');
    }

    const newNetworks = await newNetwork(networkName);
    
    // Return both the created network data and the updated network
    return { 
      data: data, 
      newNetwork: newNetworks
    };
    
  } catch (error) {
    console.error("Error creating network:", error);
    return { error: error };  // Return the error as part of the response
  }
};

export const startNetwork = async  (networkName:string):Promise<any>=>{
    const response = await fetch(`${API_URL}/network-up`, {
        method: "POST",
       
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: any = await response.json();
      const status = 'true';
      const chaincodeName= 'false'
      const networkUpdateResponse = await updateNetwork(networkName,status,chaincodeName);
      if (!response.ok) {
        return data
      }
    
      // Chuyển đổi phản hồi thành JSON và trả về đối tượng kiểu Hospital
  return { 
    deployData: data, 
    networkUpdateData: networkUpdateResponse 
  };
};

  export const newNetwork = async (network: string): Promise<any> => {
    try {
      const response = await fetch(`${API_URL}/update-network`, {
        method: "POST",
        body: JSON.stringify({
          "NameNetwork": network,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data: any = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update network');
      }
  
      // Return the updated network data
      return data;
      
    } catch (error) {
      console.error("Error updating network:", error);
      return { error: error };  // Return the error as part of the response
    }
  };
  
export const stopNetwork = async ():Promise<any>=>{
    const response = await fetch(`${API_URL}/network-stop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: any = await response.json();

      if (!response.ok) {
        return data
      }
    
      // Chuyển đổi phản hồi thành JSON và trả về đối tượng kiểu Hospital
      return data;  // Trả về đối tượng Hospital
}
export const deloyChainCode = async (networkName:String):Promise<any>=>{
    const response = await fetch(`${API_URL}/deloychaincode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: any = await response.json();
            const status = 'true';
      const chaincodeName= 'true'
      const networkUpdateResponse = await updateNetwork(networkName,status,chaincodeName);

      if (!response.ok) {
        return data
      }
    
      // Chuyển đổi phản hồi thành JSON và trả về đối tượng kiểu Hospital
      return { 
        data: data, 
        networkUpdateData: networkUpdateResponse 
      };}
export const getFullNetwork = async ():Promise<any>=>{
    const response = await fetch(`${API_URL}/networkapi/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: any = await response.json();

      if (!response.ok) {
        return data
      }
    
      // Chuyển đổi phản hồi thành JSON và trả về đối tượng kiểu Hospital
      return data;  // Trả về đối tượng Hospital
}
export const  updateNetwork = async (networkName:String,status:String,chaincodeName:String):Promise<any>=>{
    const response = await fetch(`${API_URL}/networkapi/update`, {
        method: "post",
        body: JSON.stringify({
          "networkName":networkName,
          "status":status,
          "chaincodeName":chaincodeName,
           
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: any = await response.json();

      if (!response.ok) {
        return data
      }
    
      // Chuyển đổi phản hồi thành JSON và trả về đối tượng kiểu Hospital
      return data;  // Trả về đối tượng Hospital
}
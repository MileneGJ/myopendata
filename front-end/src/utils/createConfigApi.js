export default function createConfig(token) {
    return {
      headers:{
        authorization: `Bearer ${token}`
      }
    }
  }
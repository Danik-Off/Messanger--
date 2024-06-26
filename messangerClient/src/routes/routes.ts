const host:string = "/api/";
export const token = () => {
    // Попытка получить токен из куки
    const cookieToken = getCookie('token');
    
    if (cookieToken) {
      return cookieToken;
    }  else {
      // Если токен в куки нет, возвращаем жестко закодированный токен (или null, если такое поведение допустимо)
      return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IntcImhlYWRlclwiOntcImFsZ1wiOlwiSFMyNTZcIixcInR5cFwiOlwiSldUXCJ9LFwiZGF0YVwiOntcImlkXCI6XCIzNDUzNTg0MzRcIixcImFjY291bnRfdHlwZVwiOlwic290cnVkbmlrXCIsXCJhdXRoX3RpbWVcIjpcIjIwMjMtMTAtMTMgMTktMjYtMDlcIixcImlwXCI6XCI1MS4xNTkuMjEyLjIxN1wiLFwic2FsdFwiOlwiNTFEN1I0VXBQeXM3ZTQ4SFFIaDY5NDNGN1wifX0i.LHBpLo1rcFx0e67gcixV28LsxBzrejcCe7x6XpItWiI";
    }
  }
  
  // Функция для получения значения куки по имени
  function getCookie(name:string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts?.pop()?.split(';').shift();
  }
// export const GetWSUrl =`ws://45.9.40.44:3000/${token}`

export const GetDialogsUrl = host + "dialogs.php?token="+token+"";

export const GetMsgsUrl =(peer_id:number) => host + "messages.php?peer_id="+peer_id+"&token="+token;

export const GetUSer = (id:number = 0)=>host + "user.get.php?id="+id+"&token="+token;


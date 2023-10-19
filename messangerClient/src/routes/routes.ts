const host:string = "/api/";
export const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IntcImhlYWRlclwiOntcImFsZ1wiOlwiSFMyNTZcIixcInR5cFwiOlwiSldUXCJ9LFwiZGF0YVwiOntcImlkXCI6XCIzNDUzNTg0MzRcIixcImFjY291bnRfdHlwZVwiOlwic290cnVkbmlrXCIsXCJhdXRoX3RpbWVcIjpcIjIwMjMtMTAtMTMgMTktMjYtMDlcIixcImlwXCI6XCI1MS4xNTkuMjEyLjIxN1wiLFwic2FsdFwiOlwiNTFEN1I0VXBQeXM3ZTQ4SFFIaDY5NDNGN1wifX0i.LHBpLo1rcFx0e67gcixV28LsxBzrejcCe7x6XpItWiI"

export const GetWSUrl =`ws://45.9.40.44:3000/${token}`

export const GetDialogsUrl = host + "dialogs.php?token="+token+"";

export const GetMsgsUrl =(peer_id:number) => host + "messages.php?peer_id="+peer_id+"&token="+token;



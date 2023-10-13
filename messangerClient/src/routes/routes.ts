const host:string = "/api/";
export const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IntcImhlYWRlclwiOntcImFsZ1wiOlwiSFMyNTZcIixcInR5cFwiOlwiSldUXCJ9LFwiZGF0YVwiOntcImlkXCI6XCIzNDUzNTg0MzRcIixcImFjY291bnRfdHlwZVwiOlwic290cnVkbmlrXCIsXCJhdXRoX3RpbWVcIjpcIjIwMjMtMTAtMTMgMTQtNDAtMjBcIixcImlwXCI6XCIxNzguMjM0LjQzLjE3MVwiLFwic2FsdFwiOlwiNkp1YzFPNTk1cTY2RmJYNDdjNzk4NWl5TVwifX0i.eB3HKRwEqt955D4A8XuBqfuWQoVupEMPMVjuFJr7fb4";

export const GetDialogsUrl = host + "dialogs.php?token="+token+"";

export const GetMsgsUrl = host + "messages.getMessage.php";
// 
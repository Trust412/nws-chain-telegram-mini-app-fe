"use client"
import axios from "axios";

export const saveTaps = async (clickNum: number, tgID: string) => {
  await axios.post(`https://b702-52-68-113-84.ngrok-free.app/api/get-user/${tgID}`)
  await axios
    .put(
      `https://b702-52-68-113-84.ngrok-free.app/api/update/tap2point/${tgID}`,
      {
            taps: clickNum
      }
    )
    .then((res) => {
      console.log("runing", res.data, clickNum);
    })
    .catch((err) => {console.log(err)});
};

export const saveEnergy = async (curEnergy: number, tgID: string) => {
  await axios
    .put(
      `https://b702-52-68-113-84.ngrok-free.app/api/update/current-values/${tgID}`,
      {
        curEnergy: curEnergy
      }
    )
    .then((res) => {
      console.log("runing seveEnergy", res.data, curEnergy);
    })
    .catch((err) => {console.log(err)});
};

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function useUserMain() {
  let [user, setUser] = useState(() => {
    let userData = sessionStorage.getItem("user");
    let initialValue = JSON.parse(userData);
    if (new Date().getTime() > initialValue?.expiryTime) return null;
    return initialValue || null;
  });
  return [user, setUser];
}

export function useUserSessionCategory({
  userCategory,
  userType,
  userDifficulty,
}) {
  let { userName, userToken, expiryTime } = JSON.parse(
    sessionStorage.getItem("user"),
  );
  sessionStorage.setItem(
    "user",
    JSON.stringify({
      userName: userName,
      userToken: userToken,
      expiryTime: expiryTime,
      triviaSetup: {
        category: userCategory,
        type: userType,
        difficulty: userDifficulty,
      },
    }),
  );
}

export function useUserSessionMain({userData, setUser}) {
  let navigate = useNavigate();
  useEffect(() => {
    if (!userData) return;
    let { name, data, expiryDate } = userData;
    setUser({
      userName: name,
      userToken: data.token,
      expireTime: expiryDate,
    });
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        userName: name,
        userToken: data.token,
        expiryTime: expiryDate,
      }),
    );

    setTimeout(() => {
      navigate("/play");
    }, 2000);
  }, [userData]);
}
